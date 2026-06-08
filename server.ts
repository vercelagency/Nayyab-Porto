import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Allow large payloads for base64 uploads
  app.use(express.json({ limit: "200mb" }));
  app.use(express.urlencoded({ limit: "200mb", extended: true }));

  // API endpoint to serve settings from disk
  app.get("/api/settings", (req, res) => {
    try {
      const settingsPath = path.join(process.cwd(), "src", "settings-data.json");
      if (fs.existsSync(settingsPath)) {
        const settingsData = fs.readFileSync(settingsPath, "utf-8");
        return res.json(JSON.parse(settingsData));
      }
      res.status(404).json({ error: "Settings file not found" });
    } catch (err: any) {
      console.error("Error reading settings:", err);
      res.status(500).json({ error: err.message || "Failed to read settings file" });
    }
  });

  // API endpoint to save settings and write uploaded images to local files
  app.post("/api/settings", (req, res) => {
    try {
      const { settings } = req.body;
      if (!settings) {
        return res.status(400).json({ error: "No settings provided" });
      }

      // Ensure public/uploads exists
      const publicDir = path.join(process.cwd(), "public");
      const uploadsDir = path.join(publicDir, "uploads");
      
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // Clean, deep clone the settings to mutate base64 fields to local file urls
      const updatedSettings = JSON.parse(JSON.stringify(settings));

      // Scan and extract base64 images recursively
      const processFields = (obj: any) => {
        for (const key in obj) {
          if (typeof obj[key] === "object" && obj[key] !== null) {
            processFields(obj[key]);
          } else if (typeof obj[key] === "string" && obj[key].startsWith("data:image/")) {
            const base64Str = obj[key];
            const base64Index = base64Str.indexOf(";base64,");
            if (base64Index !== -1) {
              const mimeType = base64Str.substring(5, base64Index);
              let ext = mimeType.split("/")[1] || "png";
              if (ext === "svg+xml") ext = "svg";
              
              // Remove metadata header
              const base64CleanData = base64Str.substring(base64Index + 8);
              const buffer = Buffer.from(base64CleanData, "base64");
              
              const filename = `img-${Date.now()}-${Math.floor(Math.random() * 10000)}.${ext}`;
              const filepath = path.join(uploadsDir, filename);
              
              fs.writeFileSync(filepath, buffer);
              
              // Replace with local path route
              obj[key] = `/uploads/${filename}`;
              console.log(`Successfully saved base64 image field to physical file: ${filepath}`);
            }
          }
        }
      };

      processFields(updatedSettings);

      const settingsPath = path.join(process.cwd(), "src", "settings-data.json");
      fs.writeFileSync(settingsPath, JSON.stringify(updatedSettings, null, 2), "utf-8");

      res.json({ success: true, settings: updatedSettings });
    } catch (err: any) {
      console.error("Error saving settings/images:", err);
      res.status(500).json({ error: err.message || "Failed to save settings and images" });
    }
  });

  // Ensure public/uploads exists
  const publicDir = path.join(process.cwd(), "public");
  const uploadsDir = path.join(publicDir, "uploads");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Always serve the public directory so dynamic uploads are available in both dev and prod
  app.use(express.static(publicDir));

  // Vite development middleware vs Static build serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Dev/Fullstack Server online and running on port ${PORT}`);
  });
}

startServer();

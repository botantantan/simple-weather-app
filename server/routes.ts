import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSearchHistorySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || process.env.VITE_OPENWEATHER_API_KEY;

  if (!OPENWEATHER_API_KEY) {
    console.warn("OpenWeatherMap API key not found. Weather functionality will be limited.");
  }

  // Get current weather by coordinates
  app.get("/api/weather/current/:lat/:lon", async (req, res) => {
    try {
      const { lat, lon } = req.params;
      
      if (!OPENWEATHER_API_KEY) {
        return res.status(500).json({ message: "Weather API key not configured" });
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`OpenWeatherMap API error: ${response.status}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error fetching current weather:", error);
      res.status(500).json({ message: "Failed to fetch weather data" });
    }
  });

  // Get current weather by city name
  app.get("/api/weather/current/city/:city", async (req, res) => {
    try {
      const { city } = req.params;
      
      if (!OPENWEATHER_API_KEY) {
        return res.status(500).json({ message: "Weather API key not configured" });
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );

      if (!response.ok) {
        if (response.status === 404) {
          return res.status(404).json({ message: "City not found" });
        }
        throw new Error(`OpenWeatherMap API error: ${response.status}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error fetching weather for city:", error);
      res.status(500).json({ message: "Failed to fetch weather data" });
    }
  });

  // Get 5-day forecast
  app.get("/api/weather/forecast/:lat/:lon", async (req, res) => {
    try {
      const { lat, lon } = req.params;
      
      if (!OPENWEATHER_API_KEY) {
        return res.status(500).json({ message: "Weather API key not configured" });
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`OpenWeatherMap API error: ${response.status}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error fetching forecast:", error);
      res.status(500).json({ message: "Failed to fetch forecast data" });
    }
  });

  // Search cities
  app.get("/api/weather/search/:query", async (req, res) => {
    try {
      const { query } = req.params;
      
      if (!OPENWEATHER_API_KEY) {
        return res.status(500).json({ message: "Weather API key not configured" });
      }

      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${OPENWEATHER_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`OpenWeatherMap API error: ${response.status}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error searching cities:", error);
      res.status(500).json({ message: "Failed to search cities" });
    }
  });

  // Get search history
  app.get("/api/search-history", async (req, res) => {
    try {
      const history = await storage.getSearchHistory();
      res.json(history);
    } catch (error) {
      console.error("Error fetching search history:", error);
      res.status(500).json({ message: "Failed to fetch search history" });
    }
  });

  // Add to search history
  app.post("/api/search-history", async (req, res) => {
    try {
      const validation = insertSearchHistorySchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid search history data" });
      }

      const historyItem = await storage.addToSearchHistory(validation.data);
      res.json(historyItem);
    } catch (error) {
      console.error("Error adding to search history:", error);
      res.status(500).json({ message: "Failed to add to search history" });
    }
  });

  // Clear search history
  app.delete("/api/search-history", async (req, res) => {
    try {
      await storage.clearSearchHistory();
      res.json({ message: "Search history cleared" });
    } catch (error) {
      console.error("Error clearing search history:", error);
      res.status(500).json({ message: "Failed to clear search history" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

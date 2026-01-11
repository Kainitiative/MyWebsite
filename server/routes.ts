import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Serve static HTML pages
  const staticPages = ['privacy.html', 'terms.html', 'thanks.html', 'demo-plumber.html', 'demo-therapist.html'];
  
  staticPages.forEach(page => {
    app.get(`/${page}`, async (req, res) => {
      const filePath = path.resolve(import.meta.dirname, '..', 'client', page);
      try {
        const content = await fs.promises.readFile(filePath, 'utf-8');
        res.status(200).set({ 'Content-Type': 'text/html' }).send(content);
      } catch (err) {
        res.status(404).send('Page not found');
      }
    });
  });

  return httpServer;
}

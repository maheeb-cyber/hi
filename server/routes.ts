import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema, insertEcaSchema, insertBlogPostSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/projects", async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.post("/api/projects", async (req, res) => {
    const parsed = insertProjectSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.message });
    }
    const project = await storage.createProject(parsed.data);
    res.status(201).json(project);
  });

  app.get("/api/eca", async (req, res) => {
    const items = await storage.getEcaItems();
    res.json(items);
  });

  app.post("/api/eca", async (req, res) => {
    const parsed = insertEcaSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.message });
    }
    const item = await storage.createEcaItem(parsed.data);
    res.status(201).json(item);
  });

  app.get("/api/blog", async (req, res) => {
    const posts = await storage.getBlogPosts();
    res.json(posts);
  });

  app.post("/api/blog", async (req, res) => {
    const parsed = insertBlogPostSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.message });
    }
    const post = await storage.createBlogPost(parsed.data);
    res.status(201).json(post);
  });

  return httpServer;
}

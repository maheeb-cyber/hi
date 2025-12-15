import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  tags: text("tags").array().notNull(),
  link: text("link"),
  linkText: text("link_text"),
});

export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export const ecaItems = pgTable("eca_items", {
  id: serial("id").primaryKey(),
  role: text("role").notNull(),
  org: text("org").notNull(),
  year: text("year").notNull(),
  description: text("description").notNull(),
});

export const insertEcaSchema = createInsertSchema(ecaItems).omit({ id: true });
export type InsertEca = z.infer<typeof insertEcaSchema>;
export type EcaItem = typeof ecaItems.$inferSelect;

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  excerpt: text("excerpt").notNull(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({ id: true });
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

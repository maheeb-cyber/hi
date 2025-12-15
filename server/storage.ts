import { 
  type User, type InsertUser,
  type Project, type InsertProject,
  type EcaItem, type InsertEca,
  type BlogPost, type InsertBlogPost,
  users, projects, ecaItems, blogPosts
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  getEcaItems(): Promise<EcaItem[]>;
  createEcaItem(eca: InsertEca): Promise<EcaItem>;
  
  getBlogPosts(): Promise<BlogPost[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getProjects(): Promise<Project[]> {
    return db.select().from(projects);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [created] = await db.insert(projects).values(project).returning();
    return created;
  }

  async getEcaItems(): Promise<EcaItem[]> {
    return db.select().from(ecaItems);
  }

  async createEcaItem(eca: InsertEca): Promise<EcaItem> {
    const [created] = await db.insert(ecaItems).values(eca).returning();
    return created;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts);
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [created] = await db.insert(blogPosts).values(post).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();

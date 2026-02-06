import { siteContent, type SiteContent, type InsertSiteContent } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getSiteContent(): Promise<SiteContent>;
  updateSiteContent(updates: Partial<InsertSiteContent>): Promise<SiteContent>;
}

export class DatabaseStorage implements IStorage {
  async getSiteContent(): Promise<SiteContent> {
    // Always fetch the first row, or create if missing (singleton pattern)
    const [existing] = await db.select().from(siteContent).limit(1);
    if (existing) return existing;

    // Default content
    const [created] = await db.insert(siteContent).values({
      section: 'main',
    }).returning();
    return created;
  }

  async updateSiteContent(updates: Partial<InsertSiteContent>): Promise<SiteContent> {
    const current = await this.getSiteContent();
    const [updated] = await db.update(siteContent)
      .set(updates)
      .where(eq(siteContent.id, current.id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();

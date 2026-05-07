import { pgTable, text, serial, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
export * from "./models/auth";
export const siteContent = pgTable("site_content", {
  id: serial("id").primaryKey(),
  section: text("section").notNull().unique(),
  headerVideoUrl: text("header_video_url").default(""),
  landscapeImgUrl: text("landscape_img_url").default("/attached_assets/stock_images/gravel_sand_rock_lan_fff2742e.jpg"),
  firewoodImgUrl: text("firewood_img_url").default("/attached_assets/stock_images/pile_of_split_hardwo_043374dc.jpg"),
  youtubeLinks: text("youtube_links").array().default([]),
  phone: text("phone").default("(512) 635-3857"),
  email: text("email").default("leonslandscapesupplies@gmail.com"),
  facebookUrl: text("facebook_url").default("https://www.facebook.com/p/Leons-Landscape-Supplies-61573570174762/"),
  address: text("address").default("657 county road 150, Georgetown, TX, United States, Texas"),
  projects: jsonb("projects").$type<{ name: string; image: string }[]>().default([]),
  woodStock: jsonb("wood_stock").$type<Record<string, boolean>>().default({
    "Oak": true,
    "Mesquite": true,
    "Pecan": true
  }),
  woodImages: jsonb("wood_images").$type<Record<string, string>>().default({}),
  materialImages: jsonb("material_images").$type<Record<string, string>>().default({}),
  suppliesStock: jsonb("supplies_stock").$type<Record<string, boolean>>().default({}),
  stoneImages: jsonb("stone_images").$type<Record<string, string>>().default({}),
  stoneStock: jsonb("stone_stock").$type<Record<string, boolean>>().default({}),
  stoneImgUrl: text("stone_img_url").default(""),
  contactShopPhoto: text("contact_shop_photo").default(""),
  heroVideoUrl: text("hero_video_url").default(""),
  privacyPolicyUrl: text("privacy_policy_url").default(""),
  termsOfServiceUrl: text("terms_of_service_url").default(""),
  reviews: jsonb("reviews").$type<{ customer: string; statement: string }[]>().default([
    {
      customer: "Sarah J.",
      statement: "The river rock we ordered for our garden was exactly what we were looking for. Prompt delivery and very professional service!"
    },
    {
      customer: "Michael R.",
      statement: "Leon's is our go-to for firewood every winter. The Mesquite wood burns beautifully and smells amazing. Highly recommend!"
    },
    {
      customer: "David L.",
      statement: "Great pricing on crushed limestone. The coverage calculator on their site made it easy to figure out exactly how much I needed."
    }
  ]),
});
export const insertSiteContentSchema = createInsertSchema(siteContent).omit({ id: true });
export type SiteContent = typeof siteContent.$inferSelect;
export type InsertSiteContent = z.infer<typeof insertSiteContentSchema>;

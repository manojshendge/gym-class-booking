import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Step 1: Define role enum schema using Zod
export const roleEnumSchema = z.enum(["admin", "moderator", "member", "guest"]);

// Optional: Export the enum as a TS type
export type Role = z.infer<typeof roleEnumSchema>;

// Step 2: Define tables

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("member"), // role is a string in DB
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  goal: text("goal").notNull(),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),       // Foreign key ref (manual for now)
  classId: text("class_id").notNull(),
  scheduleId: text("schedule_id").notNull(),
  date: text("date").notNull(),            // e.g., '2025-05-05'
  bookedAt: timestamp("booked_at").notNull().defaultNow(),
});

// Step 3: Create Zod schemas

export const insertUserSchema = createInsertSchema(users, {
  role: roleEnumSchema,
}).pick({
  username: true,
  password: true,
  role: true,
});

export const contactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  phone: true,
  goal: true,
});

export const insertBookingSchema = createInsertSchema(bookings).pick({
  userId: true,
  classId: true,
  scheduleId: true,
  date: true,
});

// Step 4: Types

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type ContactFormData = z.infer<typeof contactSchema>;
export type Contact = typeof contacts.$inferSelect;

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

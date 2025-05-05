import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().optional(),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  membershipType: z.enum(["Basic", "Premium", "Elite"]).optional(),
  role: z.enum(["admin", "member", "trainer"]).default("member"), // ← added role here
  createdAt: z.date().optional(),
});


export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registrationSchema = userSchema.omit({ id: true, createdAt: true });

export type User = z.infer<typeof userSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;
export type RegistrationData = z.infer<typeof registrationSchema>;
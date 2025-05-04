import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      // Validate the request body using the contact schema
      const contactData = contactSchema.parse(req.body);
      
      // Store the contact information
      const contact = await storage.createContact(contactData);
      
      // Return success response
      res.status(201).json({
        success: true,
        message: "Contact form submitted successfully",
        contact
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors
        });
      } else {
        // Handle other errors
        res.status(500).json({
          success: false,
          message: "Failed to submit contact form"
        });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

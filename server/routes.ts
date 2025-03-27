import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      const contactData = insertContactSchema.parse({
        ...req.body,
        created_at: new Date().toISOString()
      });
      
      const result = await storage.createContact(contactData);
      res.status(201).json({ success: true, message: "Contact message sent successfully", data: result });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ success: false, message: validationError.message });
      } else {
        res.status(500).json({ success: false, message: "Failed to send message" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

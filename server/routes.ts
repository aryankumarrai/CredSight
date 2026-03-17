import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const existingItems = await storage.getAssessments();
  if (existingItems.length === 0) {
    await storage.createAssessment({
      companyName: "Vivriti Capital Limited",
      status: "under_review",
      uploadedFiles: [
        { name: "ALM Report", type: "pdf", status: "Processed" },
        { name: "Shareholding Pattern", type: "pdf", status: "Processed" },
        { name: "Borrowing Profile", type: "pdf", status: "Processed" },
        { name: "Annual Report 2024-25", type: "pdf", status: "VLM Vision Parsing: Active" }
      ],
      autoRedactPii: true,
      discrepancyAlert: "",
      officerObservations: "Exceptional asset quality with gross NPAs maintained well below industry averages.",
      riskScore: 28,
      externalIntelligence: [
        { source: "News", headline: "Vivriti Capital expands co-lending partnerships", impact: "Positive" },
        { source: "Market Sentiment", headline: "Strong institutional confidence in mid-market NBFC segment", impact: "Low Risk" }
      ],
      recommendation: "APPROVED",
      loanLimit: 1000000000,
      interestRate: "9.25%",
      characterScore: "Excellent",
      capacityScore: "Strong",
      capitalScore: "Strong",
      collateralScore: "Strong",
      conditionsScore: "Good",
      explanationLogic: "Extraction from Vivriti Capital's Annual Report confirms exceptional asset quality with gross NPAs maintained well below industry averages. Their proprietary tech-enabled underwriting and diversified mid-market exposure provide strong downside protection. Capital adequacy remains robust. Full limit approved."
    });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Call seed function at startup
  seedDatabase().catch(console.error);

  app.get(api.assessments.list.path, async (req, res) => {
    const assessments = await storage.getAssessments();
    res.json(assessments);
  });

  app.get(api.assessments.get.path, async (req, res) => {
    const assessment = await storage.getAssessment(Number(req.params.id));
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    res.json(assessment);
  });

  app.post(api.assessments.create.path, async (req, res) => {
    try {
      const input = api.assessments.create.input.parse(req.body);
      const assessment = await storage.createAssessment(input);
      res.status(201).json(assessment);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.put(api.assessments.update.path, async (req, res) => {
    try {
      const input = api.assessments.update.input.parse(req.body);
      const assessment = await storage.updateAssessment(Number(req.params.id), input);
      if (!assessment) {
        return res.status(404).json({ message: 'Assessment not found' });
      }
      res.json(assessment);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}

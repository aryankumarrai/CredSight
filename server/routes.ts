import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "../shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const existingItems = await storage.getAssessments();
  if (existingItems.length === 0) {
    await storage.createAssessment({
      companyName: "Demo Company Pvt Ltd",
      status: "under_review",
      uploadedFiles: [
        { name: "GST Filings", type: "csv", status: "Processed" },
        { name: "ITR 2022-23", type: "pdf", status: "Processed" },
        { name: "Bank Statements", type: "pdf", status: "Processed" },
        { name: "Annual Report", type: "pdf", status: "VLM Vision Parsing: Active" }
      ],
      autoRedactPii: true,
      discrepancyAlert: "Alert: 15% discrepancy detected between GSTR-2A (Input Tax Credit) and GSTR-3B (Sales Liability)",
      officerObservations: "Factory found operating at 40% capacity",
      riskScore: 52,
      externalIntelligence: [
        { source: "News", headline: "New RBI regulations impacting sector", impact: "Medium" },
        { source: "e-Courts Portal", headline: "Civil dispute filed against promoters", impact: "High litigation risk" }
      ],
      recommendation: "REJECT",
      loanLimit: 50000000,
      interestRate: "10.5%",
      characterScore: "Fair",
      capacityScore: "Average",
      capitalScore: "Strong",
      collateralScore: "Good",
      conditionsScore: "Poor",
      explanationLogic: "Rejected due to high litigation risk found in secondary research despite strong GST flows"
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

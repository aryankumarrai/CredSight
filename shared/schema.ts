import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const creditAssessments = pgTable("credit_assessments", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull().default("Demo Company"),
  status: text("status").notNull().default("pending"),
  
  // Screen 1: Ingestion
  uploadedFiles: jsonb("uploaded_files").$type<{name: string, type: string, status: string}[]>().default([]),
  autoRedactPii: boolean("auto_redact_pii").default(true),
  discrepancyAlert: text("discrepancy_alert"),
  
  // Screen 2: Workspace
  officerObservations: text("officer_observations"),
  riskScore: integer("risk_score").default(50),
  externalIntelligence: jsonb("external_intelligence").$type<{source: string, headline: string, impact: string}[]>().default([]),
  
  // Screen 3: Output
  recommendation: text("recommendation"),
  loanLimit: integer("loan_limit"),
  interestRate: text("interest_rate"),
  characterScore: text("character_score"),
  capacityScore: text("capacity_score"),
  capitalScore: text("capital_score"),
  collateralScore: text("collateral_score"),
  conditionsScore: text("conditions_score"),
  explanationLogic: text("explanation_logic"),
  
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCreditAssessmentSchema = createInsertSchema(creditAssessments).omit({ id: true, createdAt: true });

export type CreditAssessment = typeof creditAssessments.$inferSelect;
export type InsertCreditAssessment = z.infer<typeof insertCreditAssessmentSchema>;

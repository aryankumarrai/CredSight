import { db } from "./db";
import {
  creditAssessments,
  type InsertCreditAssessment,
  type CreditAssessment,
} from "../shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getAssessments(): Promise<CreditAssessment[]>;
  getAssessment(id: number): Promise<CreditAssessment | undefined>;
  createAssessment(
    assessment: InsertCreditAssessment,
  ): Promise<CreditAssessment>;
  updateAssessment(
    id: number,
    updates: Partial<InsertCreditAssessment>,
  ): Promise<CreditAssessment | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getAssessments(): Promise<CreditAssessment[]> {
    return await db.select().from(creditAssessments);
  }

  async getAssessment(id: number): Promise<CreditAssessment | undefined> {
    const [assessment] = await db
      .select()
      .from(creditAssessments)
      .where(eq(creditAssessments.id, id));
    return assessment;
  }

  async createAssessment(
    assessment: InsertCreditAssessment,
  ): Promise<CreditAssessment> {
    const [created] = await db
      .insert(creditAssessments)
      .values({
        ...assessment,
        uploadedFiles: assessment.uploadedFiles as
          | { name: string; type: string; status: string }[]
          | null
          | undefined,
        externalIntelligence: assessment.externalIntelligence as
          | { source: string; headline: string; impact: string }[]
          | null
          | undefined,
      })
      .returning();
    return created;
  }

  async updateAssessment(
    id: number,
    updates: Partial<InsertCreditAssessment>,
  ): Promise<CreditAssessment | undefined> {
    const [updated] = await db
      .update(creditAssessments)
      // The 'as any' bypasses TypeScript's strict checking just for this database call,
      // allowing Drizzle to naturally process the update object.
      .set(updates as any)
      .where(eq(creditAssessments.id, id))
      .returning();

    return updated;
  }
}

export const storage = new DatabaseStorage();
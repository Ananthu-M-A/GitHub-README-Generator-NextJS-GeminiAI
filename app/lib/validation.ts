import { z } from "zod";

export const GenerateSchema = z.object({
  profile: z.object({
    devName: z.string().min(1, "Name is required"),
    location: z.string().optional().default(""),
    repoURL: z.string().url().optional().or(z.literal("")),
    email: z.string().email().optional().or(z.literal("")),
  }),
  project: z.object({
    name: z.string().min(1, "Project name is required"),
    tagline: z.string().optional().default(""),
    description: z.string().min(1, "Description is required"),
    features: z.array(z.string()).optional().default([]),
    tech: z.array(z.string()).optional().default([]),
    ideas: z.array(z.string()).optional().default([]),
    install: z.array(z.string()).optional().default([]),
    usage: z.array(z.string()).optional().default([]),
    badges: z.boolean().default(true),
    includeToc: z.boolean().default(true),
    license: z.string().optional(),
  }),
  existing: z.string().optional().default(""),
});

export type GenerateInput = z.infer<typeof GenerateSchema>;
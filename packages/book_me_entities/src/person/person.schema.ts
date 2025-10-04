import { z } from "zod";

/** Contract/DTO — every I/O must pass here */
export const PersonSchema = z.object({
  firstName: z.string().trim().min(1, "firstName is required"),
  lastName: z.string().trim().min(1, "lastName is required"),
  birthDate: z.coerce.date().optional(),
});

export type PersonDTO = z.infer<typeof PersonSchema>;

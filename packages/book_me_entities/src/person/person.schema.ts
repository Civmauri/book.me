import { z } from "zod";
import { getPersonTranslations } from "../i18n";

/** Contract/DTO — every I/O must pass here */
export const PersonSchema = z.object({
  firstName: z.string().trim().min(1, getPersonTranslations().firstName.required),
  lastName: z.string().trim().min(1, getPersonTranslations().lastName.required),
  birthDate: z.coerce.date().optional(),
});

export type PersonDTO = z.infer<typeof PersonSchema>;

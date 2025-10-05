import { z } from "zod";
import { PersonSchema, type PersonDTO } from "../person/person.schema";
import { getUserTranslations } from "../i18n";

/** User schema extending Person with additional fields */
export const UserSchema = PersonSchema.extend({
  email: z.string().email(getUserTranslations().email.invalid).trim().toLowerCase(),
  password: z.string().min(8, getUserTranslations().password.minLength),
  phoneNumber: z.string().trim().optional(),
  userType: z.string().trim(),
  deleted: z.boolean().default(false),
  active: z.boolean().default(true),
});

export type UserDTO = z.infer<typeof UserSchema>;


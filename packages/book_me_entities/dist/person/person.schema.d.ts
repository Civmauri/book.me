import { z } from "zod";
/** Contract/DTO — every I/O must pass here */
export declare const PersonSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    birthDate: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    birthDate?: Date | undefined;
}, {
    firstName: string;
    lastName: string;
    birthDate?: Date | undefined;
}>;
export type PersonDTO = z.infer<typeof PersonSchema>;

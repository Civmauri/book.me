import { z } from "zod";
/** User schema extending Person with additional fields */
export declare const UserSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    birthDate: z.ZodOptional<z.ZodDate>;
} & {
    email: z.ZodString;
    password: z.ZodString;
    phoneNumber: z.ZodOptional<z.ZodString>;
    userType: z.ZodString;
    deleted: z.ZodDefault<z.ZodBoolean>;
    active: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType: string;
    deleted: boolean;
    active: boolean;
    birthDate?: Date | undefined;
    phoneNumber?: string | undefined;
}, {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType: string;
    birthDate?: Date | undefined;
    phoneNumber?: string | undefined;
    deleted?: boolean | undefined;
    active?: boolean | undefined;
}>;
export type UserDTO = z.infer<typeof UserSchema>;

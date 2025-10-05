"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const zod_1 = require("zod");
const person_schema_1 = require("../person/person.schema");
const i18n_1 = require("../i18n");
/** User schema extending Person with additional fields */
exports.UserSchema = person_schema_1.PersonSchema.extend({
    email: zod_1.z.string().email((0, i18n_1.getUserTranslations)().email.invalid).trim().toLowerCase(),
    password: zod_1.z.string().min(8, (0, i18n_1.getUserTranslations)().password.minLength),
    phoneNumber: zod_1.z.string().trim().optional(),
    userType: zod_1.z.string().trim(),
    deleted: zod_1.z.boolean().default(false),
    active: zod_1.z.boolean().default(true),
});

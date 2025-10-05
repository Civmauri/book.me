"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonSchema = void 0;
const zod_1 = require("zod");
const i18n_1 = require("../i18n");
/** Contract/DTO — every I/O must pass here */
exports.PersonSchema = zod_1.z.object({
    firstName: zod_1.z.string().trim().min(1, (0, i18n_1.getPersonTranslations)().firstName.required),
    lastName: zod_1.z.string().trim().min(1, (0, i18n_1.getPersonTranslations)().lastName.required),
    birthDate: zod_1.z.coerce.date().optional(),
});

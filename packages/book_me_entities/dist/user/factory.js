"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
const user_schema_1 = require("./user.schema");
const user_1 = require("./user");
/** Single entry point: ALWAYS validates with Zod */
function createUser(input) {
    const dto = user_schema_1.UserSchema.parse(input);
    return user_1.User.fromDTO(dto);
}

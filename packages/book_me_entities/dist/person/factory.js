"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPerson = createPerson;
const person_schema_1 = require("./person.schema");
const person_1 = require("./person");
/** Single entry point: ALWAYS validates with Zod */
function createPerson(input) {
    const dto = person_schema_1.PersonSchema.parse(input);
    return person_1.Person.fromDTO(dto);
}

import { PersonSchema, type PersonDTO } from "./person.schema";
import { Person } from "./person";

/** Single entry point: ALWAYS validates with Zod */
export function createPerson(input: unknown): Person {
  const dto: PersonDTO = PersonSchema.parse(input);
  return Person.fromDTO(dto);
}

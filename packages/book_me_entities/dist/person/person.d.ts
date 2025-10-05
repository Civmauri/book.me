import type { PersonDTO } from "./person.schema.ts";
/** Domain object — use factory to construct (validated) */
export declare class Person {
    readonly firstName: string;
    readonly lastName: string;
    readonly birthDate?: Date;
    protected constructor(dto: PersonDTO);
    static fromDTO(dto: PersonDTO): Person;
    get fullName(): string;
}

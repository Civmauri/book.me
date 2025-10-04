import type { PersonDTO } from "./person.schema.ts";

/** Domain object — use factory to construct (validated) */
export class Person {
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly birthDate?: Date;

  protected constructor(dto: PersonDTO) {
    this.firstName = dto.firstName;
    this.lastName = dto.lastName;
    this.birthDate = dto.birthDate;
  }

  static fromDTO(dto: PersonDTO) {
    return new Person(dto);
  }

  get fullName() { return `${this.firstName} ${this.lastName}`; }
}

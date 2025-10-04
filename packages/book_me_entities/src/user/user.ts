import type { UserDTO } from "./user.schema";
import { Person } from "../person/person";

/** User domain object extending Person with authentication and contact fields */
export class User extends Person {
  public readonly email: string;
  public readonly password: string;
  public readonly phoneNumber?: string;
  public readonly deleted: boolean;
  public readonly active: boolean;

  private constructor(dto: UserDTO) {
    super(dto);
    this.email = dto.email;
    this.password = dto.password;
    this.phoneNumber = dto.phoneNumber;
    this.deleted = dto.deleted;
    this.active = dto.active;
  }

  static fromDTO(dto: UserDTO): User {
    return new User(dto);
  }

  /** Check if user is available for login */
  get isAvailable(): boolean {
    return this.active && !this.deleted;
  }

  /** Get user's display name with email */
  get displayName(): string {
    return `${this.fullName} (${this.email})`;
  }
}


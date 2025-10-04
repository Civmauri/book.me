import { UserSchema, type UserDTO } from "./user.schema";
import { User } from "./user";

/** Single entry point: ALWAYS validates with Zod */
export function createUser(input: unknown): User {
  const dto: UserDTO = UserSchema.parse(input);
  return User.fromDTO(dto);
}


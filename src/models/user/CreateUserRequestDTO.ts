/**
 * DTO for creating a new user
 */
export type CreateUserRequestDTO = {
  username: string;
  password: string;
  email: string;
  name: string;
  surname: string;
};

/**
 * ContactRequestDTO, for requesting to contact the admins of the website.
 */
export type ContactRequestDTO = {
  email: string;
  name: string;
  surname: string;
  content: string;
};

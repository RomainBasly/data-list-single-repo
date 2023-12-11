export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

export const validateFormInputs = (
  email: string,
  password: string
): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!email) {
    errors.email = "Votre email doit être renseigné pour vous connecter";
  } else if (!isValidEmail(email)) {
    errors.email = "L'email renseigné n'est pas valide";
  }

  if (!password) {
    errors.password =
      "Votre mot de passe doit être renseigné pour vous connecter";
  }

  return errors;
};

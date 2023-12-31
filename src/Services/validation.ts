import AuthorizationService from "./authorizationService";

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

export function isValidCode(code: string): boolean {
  const codeRegex = /^\d{6}$/;
  return codeRegex.test(code);
}

export const validateConnectFormInputs = (
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

export const validateEmailInput = (email: string): Record<string, string> => {
  const errors: Record<string, string> = {};
  if (!email) {
    errors.email = "Votre email doit être renseigné pour vous connecter";
  } else if (!isValidEmail(email)) {
    errors.email = "L'email renseigné n'est pas valide";
  }
  return errors;
};

export const validateCodeInput = (code: string): Record<string, string> => {
  const errors: Record<string, string> = {};
  if (!code) {
    errors.code = "Vous devez renseigner le code pour valider";
  } else if (!isValidCode(code)) {
    errors.code = "Le code renseigné n'est pas valide";
  }
  return errors;
};

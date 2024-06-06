export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

export function isValidCode(code: string): boolean {
  const codeRegex = /^\d{6}$/;
  return codeRegex.test(code);
}

export function isValidUserName(userName: string): boolean {
  const userNameRegex = /^[^<>&'"/\\]*$/;
  return userNameRegex.test(userName);
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
    errors.email = "L'email doit être renseigné pour continuer";
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

export function isValidPassword(input: string): boolean {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return regex.test(input);
}

export function validatePasswordInput(input: string): Record<string, string> {
  const errors: Record<string, string> = {};
  if (input.length < 6) {
    errors.password = "Le mot de passe doit contenir a minima 6 caractères";
  } else if (!isValidPassword(input)) {
    errors.password =
      "Votre mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre";
  }

  return errors;
}
export function validateUserNameInput(input: string): Record<string, string> {
  const errors: Record<string, string> = {};
  if (input.length < 3) {
    errors.username = "Le nom d'utilisateur doit avoir minimum 3 caractères";
  } else if (!isValidUserName) {
    errors.username =
      "Le nom d'utilisateur ne peut pas détenir les caractères <, >, & ', \", ', / ou \\";
  }
  return errors;
}

export function matchingPasswords(
  prePasswordInput: string,
  passwordInput: string
): Record<string, string> {
  const errors: Record<string, string> = {};
  if (prePasswordInput !== passwordInput) {
    errors.matchingPassword = "Les deux mots de passe ne correspondent pas";
  }
  return errors;
}

export function validateInputAddItemToList(input: string) {
  const errors: Record<string, string> = {};
  if (!isValidString(input)) {
    errors.itemContent =
      "Certains caractères ne sont pas autorisés (ex: <, >, & ', \", ', / ou \\)";
  }
  return errors;
}

function isValidString(input: string) {
  const regex = /^[A-Za-z0-9:\-+%âêîôûàèìòùäëïöüçœé\s]+$/;
  return regex.test(input);
}

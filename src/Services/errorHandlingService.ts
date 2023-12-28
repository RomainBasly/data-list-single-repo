export interface BackendError {
  errorCode: number;
  error: string;
  message: string;
}

export enum errorTypes {
  ALREADY_EXISTING = "Vous disposez déjà d'un compte, connectez-vous",
  NOT_EXISTING_USER = "Vous n'avez pas de compte à cette adresse",
  INVALID_CREDENTIALS = "L'email et le mot de passe ne correspondent pas",
  DEFAULT = "Une erreur inattendue est survenue",
}

export const getErrorMessage = (error: BackendError | unknown): string => {
  if (!error || typeof error !== "object" || !("errorCode" in error)) {
    return errorTypes.DEFAULT;
  }

  return handleBackendError(error as BackendError);
};

export function handleBackendError(error: BackendError) {
  switch (error.errorCode) {
    case 1001:
      return errorTypes.ALREADY_EXISTING;
    case 1002:
      return errorTypes.NOT_EXISTING_USER;
    case 2001:
      return errorTypes.INVALID_CREDENTIALS;
    default:
      return errorTypes.DEFAULT;
  }
}

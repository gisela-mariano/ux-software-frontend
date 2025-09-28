export const mapErrorMessage = (errorMessage: string): string => {
  const loweredMessage = errorMessage.toLowerCase();

  if (loweredMessage.includes("invalid credentials")) return "apiError.login.invalidCredentials";
  if (loweredMessage.includes("cpf already exists")) return "apiError.user.cpfAlreadyRegistered";
  if (loweredMessage.includes("already exists")) return "apiError.user.alreadyRegistered";

  return "apiError.generic";
};

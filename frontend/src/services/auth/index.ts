import { defaultClient, DefaultClientTokenService } from "@services/api";

export interface LoggedUser {
  id: number;
  email: string;
  name: string;
}
export const getLoggedUser = async (): Promise<LoggedUser> => {
  if (!DefaultClientTokenService.getCurrentToken()) {
    await DefaultClientTokenService.updateCurrentToken();
  }
  return defaultClient.get("/whoami").then((r) => r.data);
};

export const login = async (
  email: string,
  password: string
): Promise<LoggedUser> => {
  await DefaultClientTokenService.setRefreshToken(email, password);
  const loggedUser = await getLoggedUser();
  return loggedUser;
};

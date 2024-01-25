import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getLoggedUser as getLoggedUserService } from "@/services/auth";
import { type LoggedUser } from "@services/auth";

interface AuthContextValue {
  loggedUser: LoggedUser | null;
  setLoggedUser: ((user: LoggedUser | null) => void) | null;
}
const AuthContext = createContext<AuthContextValue>({
  loggedUser: null,
  setLoggedUser: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null);

  /*
  TODO:
    Caso não haja tryGetLoggedUser, o componente "ProtectedRoute"
    Será imediatamente executado, e redirecionará para a page de Login.
    E isso é um problema, pois talvez nosso usuário já esteja logado, apenas não deu tempo
    de a requisição ao backend pegar o usuário logado.
    Nesse caso, não se renderiza nada até obter as infos do usuário.
    Talvez seja mais bonito substituir por um "loading", ou uma tela escrita
    "Recuperando informações do usuário"
  */
  const [tryGetLoggedUser, setTryGetLoggedUser] = useState<boolean>(true);

  const getLoggedUser = async () => {
    setTryGetLoggedUser(true);
    try {
      const user = await getLoggedUserService();
      setLoggedUser(user);
      setTryGetLoggedUser(false);
    } catch (error) {
      setLoggedUser(null);
      setTryGetLoggedUser(false);
    }
  };

  useEffect(() => {
    getLoggedUser();
  }, []);

  return (
    <>
      {!tryGetLoggedUser ? (
        <AuthContext.Provider value={{ loggedUser, setLoggedUser }}>
          {children}
        </AuthContext.Provider>
      ) : null}
    </>
  );
};

interface AuthContextValueNotNull extends AuthContextValue {
  loggedUser: LoggedUser;
  setLoggedUser: (user: LoggedUser | null) => void;
}
// TODO: Fast refresh only works when a file only exports components.
// Use a new file to share constants or functions between components
export const useAuth = (): AuthContextValueNotNull => {
  const context = useContext(AuthContext);
  return context as AuthContextValueNotNull;
};

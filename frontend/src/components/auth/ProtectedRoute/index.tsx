import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@components/auth/AuthProvider";
import { AuthProvider } from "@components/auth/AuthProvider";

const ProtectedRouteComponent = ({
  redirectRouter,
}: {
  redirectRouter: string;
}) => {
  const { loggedUser } = useAuth();

  if (!loggedUser) {
    return <Navigate to={redirectRouter} />;
  }
  /* Outlet é o componente referenciado na rota, no caso, a page.
  Por exemplo, o Outlet da rota "/login" é o componente de LoginPage */
  return <Outlet />;
};

export const ProtectedRoute = () => (
  <AuthProvider>
    <ProtectedRouteComponent redirectRouter="/login" />
  </AuthProvider>
);

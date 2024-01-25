import { createBrowserRouter } from "react-router-dom";
import { NewClientPage } from "./client/NewClientPage";
import { DefaultPagesContainer } from "./DefaultPagesContainer";
import { LoginPage } from "./LoginPage";
import { ClientListPage } from "./client/ClientListPage";
import { ProtectedRoute } from "@components/auth/ProtectedRoute";
import { ClientDetailPage } from "./client/ClientDetailPage";
import { ClientEditPage } from "./client/ClientEditPage";
import { ProcessDetailPage } from "./process/ProcessDetailPage";
import { ProcessListPage } from "./process/ProcessListPage";

export const CLIENT_ROUTES = {
  CLIENTS: "/",
  NEW_CLIENT: "/clients/add",
  CLIENT_DETAIL: "/clients/:clientId",
  EDIT_CLIENT: "/clients/:clientId/edit",
};

export const PROCESS_ROUTES = {
  PROCESSES: "/processes",
  PROCESS_DETAIL: "/processes/:processId",
};

export const ROUTER_PATHS = {
  LOGIN: "/login",
  ...CLIENT_ROUTES,
  ...PROCESS_ROUTES,
};

export const router = createBrowserRouter([
  {
    path: ROUTER_PATHS.LOGIN,
    element: <LoginPage redirectUrl={ROUTER_PATHS.CLIENTS} />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <DefaultPagesContainer />,
        children: [
          { path: ROUTER_PATHS.CLIENTS, element: <ClientListPage /> },
          { path: ROUTER_PATHS.NEW_CLIENT, element: <NewClientPage /> },
          {
            path: ROUTER_PATHS.CLIENT_DETAIL,
            element: <ClientDetailPage />,
          },
          {
            path: ROUTER_PATHS.EDIT_CLIENT,
            element: <ClientEditPage />,
          },
          /* Processes */
          {
            path: ROUTER_PATHS.PROCESSES,
            element: <ProcessListPage />,
          },
          {
            path: ROUTER_PATHS.PROCESS_DETAIL,
            element: <ProcessDetailPage />,
          },
        ],
      },
    ],
  },
]);

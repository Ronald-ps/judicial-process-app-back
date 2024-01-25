import { router, ROUTER_PATHS } from "@pages/routers";
import { matchRoutes, useNavigate } from "react-router-dom";

/**
 * @description Retorna o path genérico da rota atual
 * @param pathname Pathname da rota atual
 * @returns Path genérico da rota atual
 * @example
 * const genericPath = matchRouterPath('/model/123');
 * console.log(genericPath); // /model/:modelId
 */
function matchRouterPath(pathname: string): string {
  const match = matchRoutes(router.routes, pathname);
  if (!match?.length)
    throw new Error(
      "Não foi possível encontrar o path genérico para a rota atual."
    );
  const genericPath =
    match[match?.length - 1].route
      .path; /* O último path normalmente será o mais específico
  qualquer problema, reordenar bonitinho o router */
  if (!genericPath)
    throw new Error(
      "Não foi possível encontrar o path genérico para a rota atual."
    );
  return genericPath;
}

/**
 * @description Retorna uma função que consegue retornar o path genérico da rota atual
 * @returns Função que retorna o path genérico da rota atual
 * @example
 * const matchRouterPath = useMatchRouterPath();
 * const genericPath = matchRouterPath('/model/123');
 * console.log(genericPath); // /model/:modelId
 */
export function useMatchRouterPath() {
  return matchRouterPath;
}

interface constructRouteParams {
  routerPath: string;
  params: Record<string, string | number>;
}
const constructRoute = ({ routerPath, params }: constructRouteParams) => {
  if (Object.values(ROUTER_PATHS).indexOf(routerPath) === -1) {
    throw new Error(
      "O path informado não existe no router. Verifique em src/pages/routers.tsx"
    );
  }
  let route = routerPath;

  Object.keys(params).forEach((key: string) => {
    route = route.replace(`:${key}`, params[key].toString());
  });
  return route;
};

/***
 * Retorna uma função que consegue construir uma rota com base no path e nos parâmetros passados
 *
 * Exemplo: Se há uma rota genérica /model/:modelId e é necessário construir a rota /model/123:
 *
 * const constructRoute = useConstructRoute();
 * const route = constructRoute({ routerPath: '/model/:modelId', params: { modelId: 123 } });
 *
 * routerPath são valores que estão mapeados em src/pages/routers.ts, ou em uma copia desse objeto.
 * */
export function useConstructRoute() {
  return constructRoute;
}

/**
 * @description Navega para uma rota com base no path e nos parâmetros passados
 * @example const navigate = useNavigateWithConstructRoute();
 * navigate('/model/:modelId', { modelId: 123 });
 */
export function useNavigateWithConstructRoute() {
  const constructRoute = useConstructRoute();
  const navigate = useNavigate();
  return (fParams: {
    routerPath: string;
    params: Record<string, string | number>;
  }) => {
    const route = constructRoute({
      routerPath: fParams.routerPath,
      params: fParams.params,
    });
    navigate(route);
  };
}

import { useDisclosure, useElementSize } from "@mantine/hooks";
import { AppShell, Box, Burger, Group, NavLink, Text } from "@mantine/core";
import { Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CLIENT_ROUTES, ROUTER_PATHS, PROCESS_ROUTES } from "./routers";
import { useMatchRouterPath } from "./hooks";

export const DefaultPagesContainer = () => {
  const [opened, { toggle }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { ref: mainRef, height: mainHeight } = useElementSize();
  const matchRouterPath = useMatchRouterPath();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
          <Box>
            <Text fw={700} c="#1c1642" fz={"1.6rem"}>
              Plural Patentes
            </Text>
          </Box>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLink
          label="Clientes"
          onClick={() => navigate(ROUTER_PATHS.CLIENTS)}
          active={Object.values(CLIENT_ROUTES).includes(
            matchRouterPath(location.pathname)
          )}
        />
        <NavLink
          label="Processos"
          onClick={() => navigate(ROUTER_PATHS.PROCESSES)}
          active={Object.values(PROCESS_ROUTES).includes(
            matchRouterPath(location.pathname)
          )}
        />
      </AppShell.Navbar>
      <AppShell.Main ref={mainRef}>
        {/* mainheight será um valor float, o que garante que alturas relativas vinda
        dos elementos filhos (Outlet) funcionarão corretamente */}
        <Box h={`${mainHeight}px`}>
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
};

import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import { router } from "./pages/routers";

function App() {
  return (
    <>
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    </>
  );
}

export default App;

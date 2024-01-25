import { ClientForm } from "@components/client/ClientForm";
import { Box } from "@mantine/core";
import { saveClient } from "@services/client/adapters";
import type { ClientForSave } from "@services/client/types";
import { useNavigate } from "react-router-dom";
import { CLIENT_ROUTES } from "@pages/routers";
import { AnimationPageContainer } from "@components/generic/animation/AnimationPageContainer";
import { PageDefaultMarginsContainer } from "@/pages/PageDefaultMarginsContainer";

export const NewClientPage = () => {
  const navigate = useNavigate();
  const handleSubmit = async (client: ClientForSave) => {
    client.birth_date = client.birth_date.toISOString().split("T")[0];
    await saveClient(client);
    return;
  };

  return (
    <PageDefaultMarginsContainer>
      <AnimationPageContainer>
        <Box>
          <ClientForm
            onSubmit={handleSubmit}
            gap="50px"
            onCancel={() => {
              navigate(CLIENT_ROUTES.CLIENTS);
            }}
          />
        </Box>
      </AnimationPageContainer>
    </PageDefaultMarginsContainer>
  );
};

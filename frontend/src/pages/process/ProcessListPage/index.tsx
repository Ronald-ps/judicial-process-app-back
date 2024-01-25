import { AnimationPageContainer } from "@/components/generic/animation/AnimationPageContainer";
import { ProcessesTable } from "@/components/process/ProcessesTable";
import { PageDefaultMarginsContainer } from "@/pages/PageDefaultMarginsContainer";
import { Input, Stack, Title } from "@mantine/core";
import { getProcesses as getProcessesService } from "@services/process/adapters";

import { useEffect, useState } from "react";

export const ProcessListPage = () => {
  const [processes, setProcesses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getProcesses = async () => {
    const processList = await getProcessesService(searchTerm);
    setProcesses(processList);
  };

  useEffect(() => {
    getProcesses();
  }, [searchTerm]);

  return (
    <PageDefaultMarginsContainer>
      <AnimationPageContainer>
        <Stack>
          <Title order={1}>Processos</Title>
          <Input
            placeholder="Número do processo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ProcessesTable processes={processes} />
        </Stack>
      </AnimationPageContainer>
    </PageDefaultMarginsContainer>
  );
};

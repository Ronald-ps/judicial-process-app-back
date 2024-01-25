import { updateProfileImage } from "@/services/client/adapters";
import { Modal, Image, Stack, Group, FileInput, Button } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

interface ModalEditImageProps {
  opened: boolean;
  clientId: string | number;
  onClose: () => void;
  imageUrl?: string;
  onUpdate: () => void;
}
export const ModalEditImage = (props: ModalEditImageProps) => {
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!props.imageUrl) return;
    setImageSrc(props.imageUrl);
  }, [props.imageUrl, props.opened]);

  return (
    <Modal
      opened={props.opened}
      onClose={() => {
        setImageSrc(props.imageUrl || "");
        props.onClose();
      }}
      top="20vh"
    >
      <Stack>
        <Image radius="md" src={imageSrc} />
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            if (props.imageUrl === imageSrc) {
              setLoading(false);

              return;
            }

            if (!file) {
              setLoading(false);
              return;
            }

            try {
              await updateProfileImage({
                clientId: props.clientId,
                file: file,
              });
            } catch (err) {
              console.log(err);
            }
            await props.onUpdate();
            setLoading(false);
            props.onClose();
          }}
        >
          <Group align="end">
            <FileInput
              rightSection={<IconPhoto />}
              label="Insira uma nova imagem para trocar"
              placeholder="Nova imagem"
              rightSectionPointerEvents="none"
              mt="md"
              accept="image/*"
              name="profile-image-input"
              onChange={(file): void => {
                if (!file) return;
                const url = URL.createObjectURL(file);
                setImageSrc(url);
                setFile(file);
              }}
            />
            <Button loading={loading} type="submit">
              Salvar
            </Button>
          </Group>
        </form>
      </Stack>
    </Modal>
  );
};

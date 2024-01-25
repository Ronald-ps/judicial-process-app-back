import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import classes from "./login.module.css";
import { login as doLogin } from "@services/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface LoginPageProps {
  title?: string;
  redirectUrl: string;
}
export function LoginPage(props: LoginPageProps) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = async (form: HTMLFormElement) => {
    setLoading(true);

    const emailElement = form.elements.namedItem("email") as HTMLInputElement;
    const passwordElement = form.elements.namedItem(
      "password"
    ) as HTMLInputElement;

    try {
      await doLogin(emailElement.value, passwordElement.value);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          {props.title || "Bem vindo!"}
        </Title>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            login(form);
          }}
        >
          <TextInput
            label="Email"
            placeholder="hello@gmail.com"
            size="md"
            name="email"
            type="email"
            required
          />
          <PasswordInput
            label="Senha"
            placeholder="Your password"
            mt="md"
            size="md"
            name="password"
            required
          />
          <Button fullWidth mt="xl" size="md" type="submit" loading={loading}>
            Entrar
          </Button>
        </form>

        <Text ta="center" mt="md">
          Sem conta ainda? Solicite a criação ao gestor
        </Text>
      </Paper>
    </div>
  );
}

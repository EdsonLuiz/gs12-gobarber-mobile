import React from "react";
import { Image } from "react-native";
import { Container, Title } from "./styles";

import logoImg from "../../assets/logo.png";
import Input from "../../components/Input";
import Button from "../../components/Button";

function SignIn(): JSX.Element {
  return (
    <Container>
      <Image source={logoImg} />
      <Title>Faça seu Logon </Title>
      <Input name="email" icon="mail" placeholder="email" />
      <Input name="password" icon="lock" placeholder="password" />
      <Button
        onPress={() => {
          console.log("ok");
        }}
      >
        Entrar
      </Button>
    </Container>
  );
}

export default SignIn;

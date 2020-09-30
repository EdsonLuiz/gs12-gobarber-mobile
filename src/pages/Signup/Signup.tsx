import React from "react";
import Icon from "react-native-vector-icons/Feather";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Container,
  Title,
  BackToSignInButton,
  BackToSignInButtonText,
} from "./styles";

import logoImg from "../../assets/logo.png";
import Input from "../../components/Input";
import Button from "../../components/Button";

function SignUp(): JSX.Element {
  const { goBack } = useNavigation();
  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logoImg} />
            <Title>Crie sua conta</Title>
            <Input name="name" icon="user" placeholder="name" />
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
        </ScrollView>

        <BackToSignInButton onPress={() => goBack()}>
          <Icon name="arrow-left" size={20} color="#fff" />
          <BackToSignInButtonText>Voltar para logon</BackToSignInButtonText>
        </BackToSignInButton>
      </KeyboardAvoidingView>
    </>
  );
}

export default SignUp;

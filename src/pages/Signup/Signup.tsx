import React, { useRef } from "react";
import Icon from "react-native-vector-icons/Feather";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
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
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

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
            <Form
              ref={formRef}
              onSubmit={(data) => {
                console.log(data);
              }}
              style={{ width: "100%" }}
            >
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="name"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="email"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                returnKeyType="send"
                textContentType="newPassword"
                name="password"
                icon="lock"
                placeholder="password"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
            </Form>
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

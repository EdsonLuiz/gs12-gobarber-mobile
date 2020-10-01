import React, { useCallback, useRef } from "react";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/Feather";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from "./styles";

import getValidationErrors from "../../utils/getValidationErrors";

import logoImg from "../../assets/logo.png";
import Input from "../../components/Input";
import Button from "../../components/Button";

interface ISignInFormData {
  email: string;
  password: string;
}

function SignIn(): JSX.Element {
  const { navigate } = useNavigation();

  const handleSignIn = useCallback(async (data: ISignInFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: Yup.string().required("Senha obrigatória"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      /* await signIn({ */
      /*   email: data.email, */
      /*   password: data.password, */
      /* }); */

      /* history.push('/dashboard'); */
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
        return;
      }

      Alert.alert(
        "Erro na autenticação",
        "Ocorreu um erro durante a autenticação, tente novamente"
      );
    }
  }, []);

  const formRef = useRef<FormHandles>(null);
  const passwordinputRef = useRef<TextInput>(null);
  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logoImg} />
            <Title>Faça seu Logon </Title>
            <Form
              ref={formRef}
              onSubmit={handleSignIn}
              style={{ width: "100%" }}
            >
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="email"
                returnKeyType="next"
                onSubmitEditing={() => passwordinputRef.current?.focus()}
              />
              <Input
                secureTextEntry
                returnKeyType="send"
                name="password"
                icon="lock"
                placeholder="password"
                ref={passwordinputRef}
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
            <ForgotPassword>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigate("SignUp")}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Criar conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
}

export default SignIn;

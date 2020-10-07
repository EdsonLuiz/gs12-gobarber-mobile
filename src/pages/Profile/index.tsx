import React, { useCallback, useRef } from "react";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/Feather";
import {
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
  UserAvatarButton,
  UserAvatar,
  BackButton,
} from "./styles";

import getValidationErrors from "../../utils/getValidationErrors";

import Input from "../../components/Input";
import Button from "../../components/Button";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

interface ISignUpFormData {
  name: string;
  email: string;
  password: string;
}

function SignUp(): JSX.Element {
  const { user } = useAuth();
  const { goBack } = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const oldPasswordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(async (data: ISignUpFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required("Nome obrigatório"),
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: Yup.string().min(6, "Mínimo de seis digitos"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post("/users", data);

      Alert.alert(
        "Cadastro realizado",
        "Você já pode fazer login e utilizar nossos serviços"
      );

      goBack();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
        return;
      }

      Alert.alert(
        "Erro no cadastro",
        "Ocorreu um erro durante o cadastro, cheque os dados fornecidos"
      );
    }
  }, []);

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
        <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
          <Container>
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>
            <UserAvatarButton>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>
            <Title>Meu perfil</Title>
            <Form
              ref={formRef}
              onSubmit={handleSignUp}
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
                  oldPasswordInputRef.current?.focus();
                }}
              />

              <Input
                containerStyle={{ marginTop: 16 }}
                ref={oldPasswordInputRef}
                secureTextEntry
                returnKeyType="next"
                textContentType="newPassword"
                name="old_password"
                icon="lock"
                placeholder="Senha atual"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                returnKeyType="next"
                textContentType="newPassword"
                name="password"
                icon="lock"
                placeholder="Nova senha"
                onSubmitEditing={() => {
                  confirmPasswordInputRef.current?.focus();
                }}
              />

              <Input
                ref={confirmPasswordInputRef}
                secureTextEntry
                returnKeyType="send"
                textContentType="newPassword"
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar senha"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Confirmar mudanças
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

export default SignUp;

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

interface IProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

function SignUp(): JSX.Element {
  const { user, updateUser } = useAuth();
  const { goBack } = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const oldPasswordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: IProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("Digite um e-mail válido"),
          old_password: Yup.string(),
          password: Yup.string().when("old_password", {
            is: (val) => !!val.lenght,
            then: Yup.string().required("Campo obrigatório"),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when("old_password", {
              is: (val) => !!val.lenght,
              then: Yup.string().required("Campo obrigatório"),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref("password")], "Confirmação incorreta"),
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        await schema.validate(data, {
          abortEarly: false,
        });

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put("/profile", formData);

        updateUser(response.data);

        Alert.alert(
          "Perfil atualizado",
          "Suas novas informações já estão sendo utilizadas"
        );

        goBack();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert(
          "Erro na atualização do cadastro",
          "Ocorreu um erro durante aatualização do cadastro, cheque os dados fornecidos"
        );
      }
    },
    [goBack, updateUser]
  );

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
              initialData={user}
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

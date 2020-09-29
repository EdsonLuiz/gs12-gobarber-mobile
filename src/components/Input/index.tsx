import React from "react";
import { TextInputProps } from "react-native";

import { Container, Textinput, Icon } from "./styles";

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

function Input({ name, icon, ...rest }: InputProps): JSX.Element {
  return (
    <Container>
      <Icon name={icon} size={20} color="#666360" />
      <Textinput placeholderTextColor="#666360" {...rest} />
    </Container>
  );
}

export default Input;

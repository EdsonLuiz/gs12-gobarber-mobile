import React from "react";
import { RectButtonProperties } from "react-native-gesture-handler";
import { Container, ButtonText } from "./styles";

// type WitchChildren<T = {}> = T & { children?: React.ReactNode };

interface ButtonProps extends RectButtonProperties {
  children: string;
}
function Button({ children, ...rest }: ButtonProps): JSX.Element {
  return (
    <Container {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
}

export default Button;

import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { TextInputProps } from "react-native";

import { useField } from "@unform/core";
import { Container, Textinput, Icon } from "./styles";

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, ...rest }: InputProps,
  ref
) => {
  const inputElementRef = useRef<any>(null);
  const { registerField, defaultValue = "", fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: "value",
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = "";
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <Icon name={icon} size={20} color="#666360" />
      <Textinput
        ref={inputElementRef}
        defaultValue={defaultValue}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        placeholderTextColor="#666360"
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);

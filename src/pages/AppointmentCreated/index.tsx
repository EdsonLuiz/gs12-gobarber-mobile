import React, { useCallback, useMemo } from "react";
import { format } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from "./styles";

interface RouteParams {
  date: number;
}

export default function AppointmentCreate() {
  const { reset } = useNavigation();

  const { params } = useRoute();

  const routeParams = params as RouteParams;

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [{ name: "Dashboard" }],
      index: 0,
    });
  }, [reset]);

  const formatedDate = useMemo(() => {
    return format(
      routeParams.date,
      "EEEE', dia 'dd' de 'MMMM 'de' yyyy 'às' HH:mm'h' ",
      { locale: ptBr }
    );
  }, [routeParams.date]);

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />
      <Title>Agendamento concluído</Title>
      <Description>{formatedDate}</Description>

      <OkButton onPress={handleOkPressed}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  );
}

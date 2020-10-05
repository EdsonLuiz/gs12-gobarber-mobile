import React, { useCallback } from "react";

import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  UserAvatar,
  ProfileButton,
} from "./styles";

export default function Dashboard() {
  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();
  const navigateToProfile = useCallback(() => {
    navigate("Profile");
  }, [navigate]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {"\n"}
          <UserName>{user.name}</UserName>
        </HeaderTitle>
        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>
    </Container>
  );
}

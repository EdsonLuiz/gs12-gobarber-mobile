import React from "react";
import { View, Button } from "react-native";

import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { signOut } = useAuth();
  return (
    <View>
      <Button title="sair" onPress={signOut} />
    </View>
  );
}

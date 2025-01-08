import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { styles } from "./styles";

type AdicionarLembreteNavigationProp = StackNavigationProp<{
  AdicionarLembrete: { lembrete?: Lembrete };
}>;

type Props = {
  navigation: AdicionarLembreteNavigationProp;
  route: { params: { lembrete?: Lembrete } };
};

export default function AdicionarLembrete({ navigation, route }: Props) {
  const [titulo, setTitulo] = useState("");
  const [icone, setIcone] = useState("");
  const [cor, setCor] = useState("#ffffff");
  const [data, setData] = useState(new Date());

  const predefinedColors = [
    "#FFF4E3",
    "#E3FFE3",
    "#F9E6FF",
    "#E3F9FF",
    "#FFFCE3",
    "#E3FFF4",
  ];

  useEffect(() => {
    if (route.params?.lembrete) {
      const { titulo, icone, cor, data } = route.params.lembrete;
      setTitulo(titulo);
      setIcone(icone);
      setCor(cor);
      setData(new Date(data));
    }
  }, [route.params?.lembrete]);

  const handleSave = async () => {
    try {
      const lembrete = {
        titulo,
        icone,
        cor,
        data: data.toISOString(),
        createdAt: new Date(),
      };

      const storedLembretes = await AsyncStorage.getItem("lembretes");
      const lembretes = storedLembretes ? JSON.parse(storedLembretes) : [];

      if (route.params?.lembrete) {
        const updatedLembretes = lembretes.map((l) =>
          l.titulo === route.params.lembrete?.titulo ? lembrete : l
        );
        await AsyncStorage.setItem(
          "lembretes",
          JSON.stringify(updatedLembretes)
        );
      } else {
        if (lembretes.length >= 5) {
          Alert.alert("Limite atingido", "Você só pode criar até 5 lembretes.");
          return;
        }
        lembretes.push(lembrete);
        await AsyncStorage.setItem("lembretes", JSON.stringify(lembretes));
      }

      Alert.alert("Sucesso", "Lembrete salvo com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar o lembrete:", error);
      Alert.alert("Erro", "Não foi possível salvar o lembrete.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="digite o título"
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>Ícone:</Text>
      <TextInput
        style={styles.input}
        value={icone}
        onChangeText={setIcone}
        placeholder="escolha um emoji  📝"
        placeholderTextColor="#aaa"
        keyboardType="default"
      />

      <Text style={styles.label}>Cor:</Text>
      <View style={styles.colorPalette}>
        {predefinedColors.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorOption,
              { backgroundColor: color, borderWidth: cor === color ? 3 : 0 },
            ]}
            onPress={() => setCor(color)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

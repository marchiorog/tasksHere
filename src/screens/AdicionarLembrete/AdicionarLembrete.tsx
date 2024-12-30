import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StackNavigationProp } from "@react-navigation/stack";
import { styles } from "./styles";

type AdicionarLembreteNavigationProp = StackNavigationProp<{
  AdicionarLembrete: undefined;
}>;

type Props = {
  navigation: AdicionarLembreteNavigationProp;
};

export default function Home({ navigation }: Props) {
  const [titulo, setTitulo] = useState("");
  const [icone, setIcone] = useState("");
  const [cor, setCor] = useState("#ffffff");
  const [frequencia, setFrequencia] = useState("Nenhuma");
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [data, setData] = useState(new Date());

  const predefinedColors = [
    "#FFF4E3",
    "#E3FFE3",
    "#F9E6FF",
    "#E3F9FF",
    "#FFFCE3",
    "#E3FFF4",
  ];

  const handleSave = async () => {
    try {
      const lembrete = {
        titulo,
        icone,
        cor,
        frequencia,
        data: data.toISOString(),
        createdAt: new Date(),
      };

      const storedLembretes = await AsyncStorage.getItem("lembretes");
      const lembretes = storedLembretes ? JSON.parse(storedLembretes) : [];

      if (lembretes.length >= 5) {
        Alert.alert("Limite atingido", "Você só pode criar até 5 lembretes.");
        return;
      }

      lembretes.push(lembrete);
      await AsyncStorage.setItem("lembretes", JSON.stringify(lembretes));

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
        placeholder="Digite o título"
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>Ícone:</Text>
      <TextInput
        style={styles.input}
        value={icone}
        onChangeText={setIcone}
        placeholder="Escolha um emoji"
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
              {
                backgroundColor: color,
                borderWidth: cor === color ? 3 : 0,
              },
            ]}
            onPress={() => setCor(color)}
          />
        ))}
      </View>

      <Text style={styles.label}>Horário do Lembrete:</Text>
      <TouchableOpacity
        onPress={() => setShowTimePicker(true)}
        style={styles.timePicker}
      >
        <Text style={styles.timeText}>{data.toLocaleTimeString()}</Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={data}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) setData(selectedTime);
          }}
        />
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

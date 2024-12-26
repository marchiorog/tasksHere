import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { db } from "../services/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StackNavigationProp } from "@react-navigation/stack";

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

      await addDoc(collection(db, "lembretes"), lembrete);

      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar o lembrete:", error);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  input: {
    padding: 12,
    marginBottom: 20,
    backgroundColor: "#F8F8F8",
    fontSize: 14,
    borderRadius: 8,
  },
  colorPalette: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
    borderColor: "#000",
  },
  timePicker: {
    padding: 15,
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  timeText: {
    fontSize: 14,
    color: "#555",
  },
  pickerContainer: {
    backgroundColor: "#F8F8F8",
    borderRadius: 5,
    marginBottom: 20,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#555",
  },
  saveButton: {
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

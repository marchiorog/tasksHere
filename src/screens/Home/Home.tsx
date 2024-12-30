import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { useIsFocused } from "@react-navigation/native";
import { styles } from "./styles";

interface Lembrete {
  titulo: string;
  data: string;
  cor: string;
  icone: string;
}

type HomeNavigationProp = StackNavigationProp<{
  AdicionarLembrete: undefined;
}>;

type Props = {
  navigation: HomeNavigationProp;
};

export default function Home({ navigation }: Props) {
  const [lembretes, setLembretes] = useState<Lembrete[]>([]);
  const [activeTab, setActiveTab] = useState("Ativos");
  const isFocused = useIsFocused();

  const fetchLembretes = async () => {
    try {
      const storedLembretes = await AsyncStorage.getItem("lembretes");
      if (storedLembretes) {
        setLembretes(JSON.parse(storedLembretes));
      }
    } catch (error) {
      console.error(
        "Erro ao carregar lembretes do armazenamento local:",
        error
      );
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchLembretes();
    }
  }, [isFocused]);

  const saveLembretes = async (newLembretes: Lembrete[]) => {
    try {
      await AsyncStorage.setItem("lembretes", JSON.stringify(newLembretes));
      setLembretes(newLembretes);
    } catch (error) {
      console.error("Erro ao salvar lembretes no armazenamento local:", error);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const renderItemCompleta = ({ item }: { item: Lembrete }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.cor }]}
      onPress={() => console.log("Card Pressed")}
    >
      <Text style={styles.title}>{item.icone + " " + item.titulo}</Text>
      <View style={styles.footer}>
        <Text style={styles.category}>{formatTime(item.data)}</Text>
        <Text style={styles.date}>Todos os dias</Text>
      </View>
    </TouchableOpacity>
  );

  const handleConfirm = (itemToConfirm: Lembrete) => {
    // Nenhuma alteração na cor
    const updatedLembretes = lembretes.filter(
      (item) => item.titulo !== itemToConfirm.titulo
    );
    saveLembretes(updatedLembretes);
  };

  const handleDelete = (itemToDelete: Lembrete) => {
    const updatedLembretes = lembretes.filter(
      (item) => item.titulo !== itemToDelete.titulo
    );
    saveLembretes(updatedLembretes);
  };

  const renderItem = ({ item }: { item: Lembrete }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.cor }]}
      onPress={() => console.log("Card Pressed")}
    >
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.icone + " " + item.titulo}</Text>
        {activeTab === "Ativos" ? (
          <TouchableOpacity
            style={styles.okButton}
            onPress={() => handleConfirm(item)}
          >
            <Icon name="checkmark-outline" size={20} color="#fff" />
          </TouchableOpacity>
        ) : activeTab === "Todos" ? (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(item)}
          >
            <Icon name="trash-outline" size={20} color="#fff" />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.footer}>
        <Text style={styles.category}>{formatTime(item.data)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../../assets/check.png")}
          style={styles.logo}
        />
        <Text style={styles.appName}>did i forgot?</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Ativos" ? styles.activeTab : null]}
          onPress={() => setActiveTab("Ativos")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Lista completa" ? styles.activeTabText : null,
            ]}
          >
            Ativos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "Todos" ? styles.activeTab : null]}
          onPress={() => setActiveTab("Todos")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Todos" ? styles.activeTabText : null,
            ]}
          >
            Todos
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={lembretes.filter((item) =>
          activeTab === "Ativos" ? true : true
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("AdicionarLembrete")}
      >
        <Icon name="add-outline" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

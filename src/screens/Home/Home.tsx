import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useIsFocused } from "@react-navigation/native"; // Importações necessárias
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
  const isFocused = useIsFocused(); // Hook para verificar se a tela está focada

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
      fetchLembretes(); // Recarregar lembretes quando a tela for focada
    }
  }, [isFocused]); // Depende de `isFocused`

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

  const renderItem = ({ item }: { item: Lembrete }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.cor }]}
      onPress={() => console.log("Card Pressed")}
    >
      <Text style={styles.title}>{item.icone + " " + item.titulo}</Text>
      <View style={styles.footer}>
        <Text style={styles.category}>{formatTime(item.data)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../../../assets/check.png")} style={styles.logo} />
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
          activeTab === "Ativos" ? item.cor !== "#ccc" : true
        )}
        keyExtractor={(item, index) => index.toString()}
        renderItem={activeTab === "Ativos" ? renderItem : renderItemCompleta}
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


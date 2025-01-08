import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
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
  concluido: boolean;
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

  const handleConfirm = (itemToConfirm: Lembrete) => {
    Alert.alert(
      "",
      `Você tem certeza que deseja marcar o lembrete como concluído?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: () => {
            const updatedLembretes = lembretes.map((item) =>
              item.titulo === itemToConfirm.titulo
                ? { ...item, concluido: true }
                : item
            );
            saveLembretes(updatedLembretes);
          },
        },
      ]
    );
  };

  const handleDelete = (itemToDelete: Lembrete) => {
    Alert.alert("", `Você tem certeza que deseja excluir o lembrete?`, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        onPress: () => {
          const updatedLembretes = lembretes.filter(
            (item) => item.titulo !== itemToDelete.titulo
          );
          saveLembretes(updatedLembretes);
        },
      },
    ]);
  };

  const renderItemCompleta = ({ item }: { item: Lembrete }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.cor }]}
      onPress={() =>
        navigation.navigate("AdicionarLembrete", { lembrete: item })
      }
    >
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.icone + " " + item.titulo}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item)}
        >
          <Icon name="trash-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: Lembrete }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.cor }]}
      onPress={() => console.log("Card Pressed")}
    >
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.icone + " " + item.titulo + " "}</Text>
        <TouchableOpacity
          style={styles.okButton}
          onPress={() => handleConfirm(item)}
        >
          <Icon name="checkmark-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const filteredLembretes = lembretes.filter((item) =>
    activeTab === "Ativos" ? !item.concluido : true
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../../assets/check.png")}
          style={styles.logo}
        />
        <Text style={styles.appName}>tasksHere</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Ativos" ? styles.activeTab : null]}
          onPress={() => setActiveTab("Ativos")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Ativos" ? styles.activeTabText : null,
            ]}
          >
            ativos ({filteredLembretes.filter((item) => !item.concluido).length}
            )
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
            todos
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredLembretes}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={activeTab === "Ativos" ? renderItem : renderItemCompleta}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          navigation.navigate("AdicionarLembrete");
        }}
      >
        <Icon name="add-outline" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

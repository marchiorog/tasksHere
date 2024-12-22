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
import { StackNavigationProp } from "@react-navigation/stack";
import { db } from "../services/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

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
  const [activeTab, setActiveTab] = useState("Lista completa");

  const fetchLembretes = async () => {
    try {
      const lembretesSnapshot = await getDocs(collection(db, "lembretes"));
      const lembretesList = lembretesSnapshot.docs.map((doc) => doc.data());

      setLembretes(lembretesList as Lembrete[]);
    } catch (error) {
      console.error("Erro ao buscar lembretes:", error);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    fetchLembretes();
  }, []);

  const renderItem = ({ item }: { item: Lembrete }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.cor }]}
      onPress={() => console.log("Card Pressed")}
    >
      <Text style={styles.title}>{item.icone + " " + item.titulo}</Text>
      <View style={styles.footer}>
        <Text style={styles.category}>{formatTime(item.data)}</Text>
        <Text style={styles.date}>{item.data}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/check.png")}
          style={styles.logo}
        />
        <Text style={styles.appName}>did i forgot?</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "Lista completa" ? styles.activeTab : null,
          ]}
          onPress={() => setActiveTab("Lista completa")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Lista completa" ? styles.activeTabText : null,
            ]}
          >
            Lista completa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "Lista toda" ? styles.activeTab : null,
          ]}
          onPress={() => setActiveTab("Lista toda")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Lista toda" ? styles.activeTabText : null,
            ]}
          >
            Lista toda
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={lembretes.filter(
          (item) =>
            activeTab === "Lista completa" ? true : item.cor === "#ccc" 
        )}
        keyExtractor={(item, index) => index.toString()}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  appName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tabs: {
    marginTop: 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "center",        
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    width: "80%",  
    alignSelf: "center", 
  },
  tab: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#000",
  },
  tabText: {
    color: "#aaa",
    fontWeight: "bold",
  },
  activeTabText: {
    color: "#fff",
  },
  listContainer: {
    padding: 20,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  category: {
    fontSize: 12,
    color: "#555",
  },
  date: {
    fontSize: 12,
    color: "#555",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#000",
    borderRadius: 30,
    padding: 15,
  },
});

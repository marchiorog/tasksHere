import React from "react";
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

interface Lembrete {
    title: string;
    category: string;
    date: string;
    color: string;
  }

type HomeNavigationProp = StackNavigationProp<{
  AdicionarLembrete: undefined;
}>;

type Props = {
  navigation: HomeNavigationProp;
};

export default function Home({ navigation }: Props) {
  const lembretes = [
    {
      title: "Creatina",
      category: "12:00 pm",
      date: "Todos os dias",
      color: "#FFF4E3",
    },
    {
      title: "Suplementação",
      category: "12:00 am",
      date: "Todos os dias",
      color: "#E3FFE3",
    },
    {
      title: "Fechar janela",
      category: "14:00 pm",
      date: "13/05/2025",
      color: "#F9E6FF",
    },
  ];

  const renderItem = ({ item }: { item: Lembrete }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.color }]}
      onPress={() => console.log("Card Pressed")}
    >
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.footer}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/*<Image source={require(".../assets/check.png")} style={styles.logo} />*/}
        <Text style={styles.appName}>did i forgot?</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>
            Lista completa
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={lembretes}
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
    paddingTop: 50,
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
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  tab: {
    padding: 10,
    borderRadius: 20,
    width: 160,
    marginTop: 15,
  },
  activeTab: {
    backgroundColor: "#000",
  },
  tabText: {
    color: "#aaa",
    fontWeight: "bold",
    textAlign: "center",
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

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    width: "65%",
    alignSelf: "center",
  },
  tab: {
    flex: 1,
    padding: 13,
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
  rowContainer: {
    flexDirection: 'row',  // Alinha os itens na horizontal
    alignItems: 'center',  // Alinha os itens verticalmente ao centro
    justifyContent: 'space-between',  // Distribui o espaço entre os itens
    width: '100%',  // Garante que os itens usem a largura total do card
  },

  emoji: {
    fontSize: 20,  // Ajuste do tamanho do emoji
    marginRight: 10,  // Espaço entre o emoji e o título
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  horarioTitulo: {
    fontSize: 13,
    fontWeight: "bold",
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
  okButton: {
    padding: 5,
    backgroundColor: "#4caf50",
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButton: {
    padding: 5,
    backgroundColor: "#ff6b6b",
    borderRadius: 5,
    marginLeft: 10,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
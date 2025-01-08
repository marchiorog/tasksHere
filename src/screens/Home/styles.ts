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
    color: "#313131",
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Necessário para Android
  },
  tab: {
    flex: 1,
    padding: 13,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#5ea872",
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
    backgroundColor: "#fff", // Adicione uma cor de fundo para que a sombra seja visível

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
    color: "#313131",
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
    color: "#a8a7a7",
  },
  date: {
    fontSize: 12,
    color: "#555",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#5ea872",
    borderRadius: 30,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Necessário para Android
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
  congratulationsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#f0f8ff", // cor de fundo suave para destacar
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  
  congratulationsText: {
    fontSize: 18,
    color: "#28a745", // cor verde para dar a sensação de sucesso
    fontWeight: "bold",
  }
  
});
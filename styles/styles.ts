import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loading: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  cardContainer: {
    paddingTop: 50,
    alignItems: "center",
  },
  cardImage: {
    height: 300,
    width: 215,
  },
  wrapper: {
    paddingTop: 80,
    alignItems: "center",
  },
  statsWrapper: {
    paddingTop: 40,
    display: "flex",
    justifyContent: "flex-start",
    width: 350,
    paddingBottom: 40,
  },
  guessWrapper: {
    paddingTop: 60,
    alignItems: "center",
  },

  normalText: {
    fontSize: 16,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  btnText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 20,
    justifyContent: "space-between",
    width: 250,
  },
  btnWrapper: {
    width: 85,
    height: 40,
    backgroundColor: "#084B83",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
});

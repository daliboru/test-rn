import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles/styles";

interface ICard {
  cardImg: string;
  value: number;
}

export default function App() {
  const [cardsLeft, setCardsLeft] = useState<number>(52);
  const [deckId, setDeckId] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [card, setCard] = useState<ICard>();
  const [shuffle, setShuffle] = useState(false);
  const [error, setError] = useState(false);
  const [score, setScore] = useState(0);

  const fetchDeckId = async () => {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/new/`);
    const data = await response.json();
    if (data.success) {
      setDeckId(data.deck_id);
    } else {
      setError(true);
    }
  };

  const deckShuffle = async () => {
    await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
    setShuffle(true);
  };

  const drawACard = async () => {
    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const data = await response.json();

    if (data.success) {
      setCardsLeft((cardsNum) => cardsNum - 1);
      let value;

      // special card values: ACE JACK QUEEN KING

      if (data.cards[0].value === "KING") {
        value = "14";
      } else if (data.cards[0].value === "QUEEN") {
        value = "13";
      } else if (data.cards[0].value === "JACK") {
        value = "12";
      } else if (data.cards[0].value === "ACE") {
        value = "15";
      } else {
        value = data.cards[0].value;
      }
      let res: ICard = { cardImg: data.cards[0].image, value: parseInt(value) };
      return res;
    } else {
      setError(true);
    }
  };

  const checkAnswer = async (ans: string) => {
    const res = await drawACard();

    if (ans === "higher") {
      if (res && card && (res.value > card.value || res.value === card.value)) {
        setScore((currScore) => currScore + 1);
      } else {
        setScore(0);
      }
    } else if (ans === "lower") {
      if (res && card && (res.value < card.value || res.value === card.value)) {
        setScore((currScore) => currScore + 1);
      } else {
        setScore(0);
      }
    }

    setCard(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchDeckId();
  }, []);

  useEffect(() => {
    if (deckId) {
      deckShuffle();
    }
  }, [deckId]);

  useEffect(() => {
    if (cardsLeft) {
      if (shuffle) {
        drawACard().then((res) => {
          setCard(res);
          setLoading(false);
        });
      }
    }
  }, [shuffle]);

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loading}>
          Something went wrong, please refresh the page...
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }

  if (!cardsLeft) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loading}>Game over!</Text>
          <TouchableOpacity
            onPress={() => {
              setScore(0);
              setCardsLeft(51);
              fetchDeckId();
            }}
          >
            <View style={{ ...styles.btnWrapper, marginTop: 20 }}>
              <Text style={styles.btnText}>Restart</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    card && (
      <>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <Text style={styles.sectionTitle}>Card game</Text>
            <View style={styles.statsWrapper}>
              <Text style={styles.normalText}>Cards left: {cardsLeft}</Text>
              <Text style={styles.normalText}>Current score: {score}</Text>
            </View>

            <View style={styles.cardContainer}>
              <Image style={styles.cardImage} source={{ uri: card.cardImg }} />
            </View>
            <View style={styles.guessWrapper}>
              <Text style={styles.normalText}>The next card is?</Text>

              <View style={styles.btnContainer}>
                <TouchableOpacity onPress={() => checkAnswer("higher")}>
                  <View style={styles.btnWrapper}>
                    <Text style={styles.btnText}>Higher</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => checkAnswer("lower")}>
                  <View style={styles.btnWrapper}>
                    <Text style={styles.btnText}>Lower</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </>
    )
  );
}

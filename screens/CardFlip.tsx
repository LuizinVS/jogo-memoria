import { View, Text, StyleSheet, Button } from "react-native";
import Animated, { SharedValue, interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface Props {
    isFlipped: SharedValue<boolean>;
}

export function Card({ isFlipped }: Props) {
    const regularCardAnimatedStyle = useAnimatedStyle(() => {
        const spinValue = interpolate(Number(isFlipped.value), [0, 1], [0, 180]);
        const rotateValue = withTiming(`${spinValue}deg`, { duration: 500 });

        return {
            transform: [{ rotateY: rotateValue }]
        };
    });

    const flippedCardAnimatedStyle = useAnimatedStyle(() => {
        const spinValue = interpolate(Number(isFlipped.value), [0, 1], [180, 360]);
        const rotateValue = withTiming(`${spinValue}deg`, { duration: 500 });

        return {
            transform: [{ rotateY: rotateValue }]
        };
    });

    return (
        <>
            <Animated.View
                style={[
                    styles.card,
                    styles.regularCardContainer,
                    regularCardAnimatedStyle
                ]}
            >
                <View style={styles.regularCard}>
                    <Text style={styles.regularCardText}>Essa é a parte da frente do Card ✌</Text>
                </View>
            </Animated.View>
            <Animated.View
                style={[
                    styles.card,
                    styles.flippedCardContainer,
                    flippedCardAnimatedStyle
                ]}
            >
                <View style={styles.flippedCard}>
                    <Text style={styles.flippedCardText}>Essa é a parte de trás do Card 🤞</Text>
                </View>
            </Animated.View>
        </>
    );
}

export function CardFlip() {
    const isFlipped = useSharedValue(false);

    const handlePress = () => {
        isFlipped.value = !isFlipped.value;
    }

    return (
        <View style={styles.container}>
            <Card isFlipped={isFlipped} />
            <View style={styles.buttonContainer}>
                <Button onPress={handlePress} title="Virar card" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 300,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonContainer: {
        marginTop: 250,
        justifyContent: "center",
        alignItems: "center",
    },
    toggleButton: {
        backgroundColor: "#b58df1",
        padding: 12,
        borderRadius: 48,
    },
    toggleButtonText: {
        color: "#fff",
        textAlign: "center",
    },
    card: {
        width: 170,
        height: 200,
    },
    flippedCard: {
        flex: 1,
        backgroundColor: "#baeee5",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    flippedCardText: {
        color: "#001a72",
    },
    regularCardContainer: {
        position: "absolute",
        zIndex: 1,
    },
    flippedCardContainer: {
        position: "absolute",
        backfaceVisibility: "hidden",
        zIndex: 2,
    },
    regularCard: {
        flex: 1,
        backgroundColor: "#b6cff7",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    regularCardText: {
        color: "#001a72",
    },
});
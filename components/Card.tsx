import React, { ReactNode } from 'react';
import { Pressable, SafeAreaView, View, StyleSheet, Text } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { CARD_SIZE } from '../constants/card';

const RegularContent = () => {
    return (
        <View style={regularContentStyles.card}>
            <Text style={regularContentStyles.text}>Regular content ✨</Text>
        </View>
    );
};

const regularContentStyles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#b6cff7',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#001a72',
    },
});

const FlippedContent = () => {
    return (
        <View style={flippedContentStyles.card}>
            <Text style={flippedContentStyles.text}>Flipped content 🚀</Text>
        </View>
    );
};

const flippedContentStyles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#baeee5',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#001a72',
    },
});

interface Props {
    isFlipped: boolean;
    frontContent?: ReactNode;
    backContent: ReactNode;
    onPress: () => void;
}

const CARD_ROTATION_DURATION = 700;

export function Card({
    isFlipped,
    frontContent,
    backContent,
    onPress,
}: Props) {
    const frontCardAnimatedStyle = useAnimatedStyle(() => {
        const spinValue = interpolate(Number(isFlipped), [0, 1], [0, 180]);
        const rotateValue = withTiming(`${spinValue}deg`, { duration: CARD_ROTATION_DURATION });

        return {
            transform: [
                { rotateY: rotateValue },
            ],
        };
    });

    const backCardAnimatedStyle = useAnimatedStyle(() => {
        const spinValue = interpolate(Number(isFlipped), [0, 1], [180, 360]);
        const rotateValue = withTiming(`${spinValue}deg`, { duration: CARD_ROTATION_DURATION });

        return {
            transform: [
                { rotateY: rotateValue },
            ],
        };
    });

    return (
        <Pressable onPress={onPress}>
            <Animated.View
                style={[
                    flipCardStyles.regularCard,
                    styles.card,
                    frontCardAnimatedStyle,
                ]}>
                <View style={styles.frontCardContent}>
                    <Text style={styles.cardText}>
                        {frontContent}
                    </Text>
                </View>
            </Animated.View>
            <Animated.View
                style={[
                    flipCardStyles.flippedCard,
                    styles.card,
                    backCardAnimatedStyle,
                ]}>
                <View style={styles.backCardContent}>
                    <Text style={styles.cardText}>
                        {backContent}
                    </Text>
                </View>
            </Animated.View>
        </Pressable>
    );
};

const flipCardStyles = StyleSheet.create({
    regularCard: {
        position: 'absolute',
        zIndex: 1,
    },
    flippedCard: {
        backfaceVisibility: 'hidden',
        zIndex: 2,
    },
});

const styles = StyleSheet.create({
    card: {
        width: CARD_SIZE,
        height: CARD_SIZE,
        marginBottom: 16,
    },
    frontCardContent: {
        flex: 1,
        backgroundColor: '#b6cff7',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backCardContent: {
        flex: 1,
        backgroundColor: '#baeee5',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        fontSize: 32,
    }
});
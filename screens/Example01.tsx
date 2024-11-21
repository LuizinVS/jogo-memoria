import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import Animated, { useSharedValue, withSpring  } from "react-native-reanimated";

export function Example01() {
    const width = useSharedValue(100)

    const handlePress = () => {
        width.value = withSpring(width.value + 20);
    }

    return (
        <View>
            <Animated.View style={[styles.box, { width }]}/>
            <Button title="Clique aqui"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        height: 100,
        width: 100,
        backgroundColor: 'cyan',
        borderRadius: 20,
        marginVertical: 16,
    }
})
// import { View, Button } from "react-native";
// import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

// export function Example02() {
//     const translateX = useSharedValue(0);

//     const handlePress = () => {
//         translateX.value += 50;
//     }

//     const animatedStyles = useAnimatedStyle(() => ({
//         transform: [{
//             translateX: withSpring(translateX.value * 2);
//         }]
//     }))

//     return ( 
//         <View>
//             <Animated.View style={[styles.box, animatedStyles]} />
//             <Button title="Clique aqui!" onPress={handlePress} />
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     box: {
//         height: 100,
//         width: 100,
//         backgroundColor: 'cyan',
//         borderRadius: 20,
//     }
// })
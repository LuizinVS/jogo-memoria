import LottieView from "lottie-react-native";

export function ExampleLottie() {
    return ( 
        <LottieView 
        autoPlay
        loop
        source={require(".assets/animation.json")}
        />
    )
}
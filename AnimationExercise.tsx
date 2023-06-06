import React from "react";
import {
  View,
  Button,
  StyleSheet,
  Animated,
  Image,
  SafeAreaView,
  PanResponder,
  Easing,
  Platform,
  ScrollView,
  Text
} from "react-native";

const AnimationExercise = () => {
  let xAxis= 0;
  let yAxis= 0;
  const [isVisible, setIsVisible] = React.useState(false);
  const [frogSize, setFrogSize] = React.useState(10);
  const animatedOpacity = React.useRef(new Animated.Value(0)).current;
  const animatedSize = React.useRef(new Animated.Value(0)).current;
  const spinValue = React.useRef(new Animated.Value(0)).current;
  const pan = React.useRef(new Animated.ValueXY()).current;
  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }),
      onPanResponderRelease: () => {
        pan.extractOffset();
        console.log(pan.getLayout());
        console.log(xAxis);
        console.log(yAxis);
        if (xAxis > -190 && xAxis < 190 && yAxis > 290 && yAxis < 680) {
          changeFrogSize();
        }
      },
    }),
  ).current;

  pan.addListener(({ x, y }) => {
    xAxis = x;
    yAxis = y;
  })

  const changeFrogSize = () => {
    console.log("Frog Size:", frogSize);
    setFrogSize(frogSize + 5);
  }

  const startAnimation = () => {

    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(animatedSize, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const stopAnimation = () => {

    Animated.timing(animatedOpacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(animatedSize, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const spinner = () => {
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => spinValue.setValue(0));
  };

  const onPress = () => {
    isVisible ? stopAnimation() : startAnimation();
    setIsVisible(!isVisible);
  };

  const onPressSpinFrog = () => {
    isVisible ? spinner() : null;
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Animated.View
          style={{
            zIndex: 2,
            transform: [
              { 
                translateX: pan.x 
              }, 
              { 
                translateY: pan.y }],
          }}
          {...panResponder.panHandlers}>
          <Animated.Image
            style={[styles.image, {
              opacity: animatedOpacity, transform: [
                {
                  scaleX: animatedSize.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, frogSize]
                  })
                },
                {
                  scaleY: animatedSize.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, frogSize]
                  })
                },
                {
                  rotate: spinValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg']
                  })
                }
              ]
            }]}
            source={{ uri: "https://i.redd.it/why-is-this-place-only-active-on-wednesdays-frogs-should-be-v0-kk7bufwx8oza1.jpg?s=bbff4e3e1733137ccbcc1f1264032be8b29248c3" }}
            resizeMode="cover"
          />
        </Animated.View>
        <Button title={isVisible ? "Stop Animation" : "Start Animation"} onPress={onPress} />
        <Button title={"Spin that Frog!"} onPress={onPressSpinFrog} />
        <Image style={styles.image2} source={{ uri: "https://i.redd.it/wb2x74qtfxj01.jpg" }}/>
        <ScrollView contentContainerStyle={styles.container}>
          <Text>OS</Text>
          <Text style={styles.value}>{Platform.OS}</Text>
          <Text>OS Version</Text>
          <Text style={styles.value}>{Platform.Version}</Text>
          <Text>isTV</Text>
          <Text style={styles.value}>{Platform.isTV.toString()}</Text>
          {Platform.OS === 'ios' && (
            <>
              <Text>isPad</Text>
              <Text style={styles.value}>{Platform.isPad.toString()}</Text>
            </>
          )}
          <Text>Constants</Text>
          <Text style={styles.value}>
            {JSON.stringify(Platform.constants, null, 2)}
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  image: {
    width: 20,
    height: 20,
    marginTop: 100,
    marginBottom: 200
  },
  image2: {
    width: 200,
    height: 200,
    marginTop: 100,
    marginBottom: 200,
  },
  value: {
    fontWeight: '600',
    padding: 4,
    marginBottom: 8,
  },
});

export default AnimationExercise;
import {
  AnimatedIconProp,
  AnimatedVectorIcon,
} from 'components/basic/vectorIcon';
import React, {ReactNode} from 'react';
import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  WithTimingConfig,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useAppIsRtl} from 'state/appState';
import {Consts, GS, normalizeSize, normalizeWidth} from 'utils/globalStyles';

const springConfig = (velocity: number) => {
  'worklet';

  return {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
    velocity,
  };
};

const animationDuration = 250;

export const timingConfig: WithTimingConfig = {
  duration: animationDuration,
  easing: Easing.bezierFn(0.25, 0.1, 0.25, 1),
};

type ListItemProps = {
  children: ReactNode;
  onDoneRemove: () => void;
  onStartRemove?: () => void;
  enabled?: boolean;
  buttonWidth?: number;
};
export const SwipeItem = React.memo(
  ({
    onDoneRemove,
    onStartRemove,
    children,
    buttonWidth = normalizeWidth(80),
  }: ListItemProps) => {
    const isRtl = useAppIsRtl();
    const isRemoving = useSharedValue(false);
    const translateX = useSharedValue(0);
    const rowHeight = useSharedValue(0);
    const buttonSwipeWidth = -buttonWidth;
    const position = useSharedValue(0);

    function handleRemove() {
      onStartRemove?.();
      isRemoving.value = true;
    }

    const removeButton: ButtonData = {
      icon: {
        type: 'MaterialCommunityIcons',
        name: 'delete-sweep',
        color: 'InvertText',
        size: normalizeSize(32),
      },
      title: 'Delete',
      backgroundColor: 'red',
      color: 'white',
      width: buttonWidth,
      onPress: handleRemove,
    };

    const panGesture = Gesture.Pan()
      .simultaneousWithExternalGesture()
      .minDistance(20)
      .onStart(() => {
        position.value = translateX.value;
      })
      .onUpdate(evt => {
        const nextTranslate =
          evt.translationX + (isRtl ? -position.value : position.value);
        translateX.value = isRtl
          ? Math.max(0, Math.min(nextTranslate, -buttonSwipeWidth))
          : Math.min(0, Math.max(nextTranslate, buttonSwipeWidth));
      })
      .onEnd(evt => {
        if (isRtl ? evt.velocityX > 20 : evt.velocityX < -20) {
          translateX.value = withSpring(
            isRtl ? -buttonSwipeWidth : buttonSwipeWidth,
            springConfig(evt.velocityX),
          );
        } else {
          translateX.value = withSpring(0, springConfig(evt.velocityX));
        }
      });

    const animatedStyles = useAnimatedStyle(() => {
      if (isRemoving.value) {
        return {
          height: withDelay(
            animationDuration,
            withTiming(0, timingConfig, () => runOnJS(onDoneRemove)()),
          ),
          transform: [
            {
              translateX: withTiming(
                isRtl ? Consts.windowWidth : -Consts.windowWidth,
                timingConfig,
              ),
            },
          ],
        };
      }

      return {
        height: rowHeight.value || 'auto',
        transform: [
          {
            translateX: translateX.value,
          },
        ],
      };
    });

    const onLayoutEvent = (event: LayoutChangeEvent) => {
      const layout = event.nativeEvent.layout;
      rowHeight.value = layout.height;
    };

    return (
      <View onLayout={onLayoutEvent} style={[styles.item]}>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={animatedStyles}>
            {children}
            <View style={styles.buttonsContainer}>
              <Button item={removeButton} />
            </View>
          </Animated.View>
        </GestureDetector>
      </View>
    );
  },
);

type ButtonData = {
  title: string;
  backgroundColor: string;
  color: string;
  onPress: () => void;
  width: number;
  icon?: AnimatedIconProp;
};
const Button = ({item}: {item: ButtonData}) => {
  return (
    <View
      style={[
        styles.button,
        {
          width: Consts.windowWidth,
          paddingRight: Consts.windowWidth - item.width,
        },
        {backgroundColor: item.backgroundColor},
      ]}>
      <TouchableOpacity
        onPress={item.onPress}
        style={[styles.buttonInner, {width: item.width}]}>
        {item?.icon ? (
          <AnimatedVectorIcon
            size={item?.icon.size || normalizeSize(20)}
            color={item?.icon.color || 'MainText'}
            style={[GS.marginRight8]}
            name={item?.icon.name}
            type={item?.icon.type}
          />
        ) : (
          <Text style={{color: item.color}}>{item.title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonInner: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonsContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: Consts.windowWidth,
    width: Consts.windowWidth,
  },
});

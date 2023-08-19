import LottieView from 'lottie-react-native';
import React, {Dispatch} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {GS} from 'utils/globalStyles';

type ColorFilter = {
  keypath: string;
  color: string;
};

type LottieProps = {
  source: string;
  style?: StyleProp<ViewStyle>;
  wrapStyle?: StyleProp<ViewStyle>;
  loop?: boolean;
  autoPlay?: boolean;
  width?: number;
  height?: number;
  colorFilters?: ColorFilter[];
  onAnimationFinish?: () => void;
  setLottieRef?: Dispatch<React.SetStateAction<LottieView | null>>;
};

export const GetLottie = ({
  source,
  style,
  loop,
  autoPlay,
  width,
  height,
  wrapStyle,
  colorFilters,
  setLottieRef,
  onAnimationFinish,
}: LottieProps) => {
  return (
    <View style={[GS.center, wrapStyle]}>
      <LottieView
        source={source}
        ref={ref => setLottieRef && setLottieRef(ref)}
        colorFilters={colorFilters}
        style={[style, {width, height}]}
        loop={loop}
        onAnimationFinish={onAnimationFinish}
        autoPlay={autoPlay}
        speed={1}
      />
    </View>
  );
};

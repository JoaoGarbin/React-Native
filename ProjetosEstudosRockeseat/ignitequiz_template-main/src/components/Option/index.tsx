import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { styles } from './styles';
import { Canvas, Skia, Path, BlurMask, Circle } from '@shopify/react-native-skia';
import { THEME } from '../../styles/theme';
import { Easing, useAnimatedReaction, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';

type Props = TouchableOpacityProps & {
  checked: boolean;
  title: string;
}

const CHECK_SIZE = 28;
const CHECK_STROKE = 2;

export function Option({ checked, title, ...rest }: Props) {

  const RADIUS = (CHECK_SIZE - CHECK_STROKE) / 2;
  const CENTER_CIRCLE = RADIUS / 2;


  const path = Skia.Path.Make();
  path.addCircle(CHECK_SIZE, CHECK_SIZE, RADIUS)

  const skiaPercentage = useSharedValue(0);
  const skiaCircle = useSharedValue(0);

  const percentage = useDerivedValue(() => {
    return skiaPercentage.value;
  }, [skiaPercentage]);

  const circle = useDerivedValue(() => {
    return skiaCircle.value;
  }, [skiaCircle]);

  useAnimatedReaction(
    () => checked,
    (isChecked) => {
      skiaPercentage.value = withTiming(isChecked ? 1 : 0, { duration: 700 });
      skiaCircle.value = withTiming(isChecked ? CENTER_CIRCLE : 0, {
        easing: Easing.linear,
      });
    },
    [checked]
  );

  return (
    <TouchableOpacity
      style={
        [
          styles.container,
          checked && styles.checked
        ]
      }
      {...rest}
    >
      <Text style={styles.title}>
        {title}
      </Text>

      <Canvas style={{ height: CHECK_SIZE * 2, width: CHECK_SIZE * 2 }}>
        <Path
          path={path}
          color={THEME.COLORS.GREY_500}
          style="stroke"
          strokeWidth={CHECK_STROKE}
        />

        <Path
          path={path}
          color={THEME.COLORS.BRAND_LIGHT}
          style="stroke"
          strokeWidth={CHECK_STROKE}
          start={0}
          end={percentage}
        >
          <BlurMask blur={1} style={'solid'} />
        </Path>
        <Circle
          cx={CHECK_SIZE}
          cy={CHECK_SIZE}
          r={circle}
          color={THEME.COLORS.BRAND_LIGHT}

        >
          <BlurMask blur={4} style={'solid'} />
        </Circle>
      </Canvas>

    </TouchableOpacity>
  );
}
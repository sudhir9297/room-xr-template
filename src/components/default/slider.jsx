import { Container } from "@react-three/uikit";
import { colors } from "./theme.jsx";
import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import { Vector3 } from "three";
import { Signal, computed } from "@preact/signals-core";

const vectorHelper = new Vector3();

export const Slider = forwardRef(
  (
    {
      disabled = false,
      value: providedValue,
      defaultValue,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      ...props
    },
    ref
  ) => {
    const [uncontrolled, setUncontrolled] = useState(defaultValue);
    const value = providedValue ?? uncontrolled ?? 50;
    const percentage = useMemo(
      () =>
        computed(() => {
          const range = readReactive(max) - readReactive(min);
          return `${(100 * readReactive(value)) / range}%`;
        }),
      [min, max, value]
    );
    const internalRef = useRef(null);
    const onChange = useRef(onValueChange);
    onChange.current = onValueChange;
    const hasProvidedValue = providedValue != null;
    const handler = useMemo(() => {
      let downPointerId;
      function setValue(e) {
        if (internalRef.current == null) {
          return;
        }
        vectorHelper.copy(e.point);
        internalRef.current.interactionPanel.worldToLocal(vectorHelper);
        const minValue = readReactive(min);
        const maxValue = readReactive(max);
        const newValue = Math.min(
          Math.max(
            Math.round(
              ((vectorHelper.x + 0.5) * (maxValue - minValue) + minValue) / step
            ) * step,
            minValue
          ),
          maxValue
        );
        if (!hasProvidedValue) {
          setUncontrolled(newValue);
        }
        onChange.current?.(newValue);
        e.stopPropagation();
      }
      return {
        onPointerDown(e) {
          if (downPointerId != null) {
            return;
          }
          downPointerId = e.pointerId;
          setValue(e);
          e.target.setPointerCapture(e.pointerId);
        },
        onPointerMove(e) {
          if (downPointerId != e.pointerId) {
            return;
          }
          setValue(e);
        },
        onPointerUp(e) {
          if (downPointerId == null) {
            return;
          }
          downPointerId = undefined;
          e.stopPropagation();
        },
      };
    }, [max, min, hasProvidedValue, step]);
    useImperativeHandle(ref, () => internalRef.current);
    return (
      <Container
        {...(disabled ? {} : handler)}
        positionType="relative"
        flexDirection="column"
        height={8}
        width="100%"
        alignItems="center"
        ref={internalRef}
        {...props}
      >
        <Container
          height={4}
          positionType="absolute"
          positionLeft={0}
          positionRight={0}
          flexGrow={1}
          borderRadius={1000}
          backgroundColor={colors.secondary}
        >
          <Container
            height="100%"
            width={percentage}
            borderRadius={1000}
            backgroundColor={colors.primary}
          />
        </Container>
        <Container
          zIndexOffset={{ minor: 100 }}
          positionType="absolute"
          positionLeft={percentage}
          transformTranslateX={-5}
          transformTranslateY={-3}
          cursor="pointer"
          borderOpacity={disabled ? 0.5 : undefined}
          backgroundOpacity={disabled ? 0.5 : undefined}
          height={10}
          width={10}
          borderWidth={2}
          borderRadius={1000}
          borderColor={colors.primary}
          backgroundColor={colors.background}
        />
      </Container>
    );
  }
);

function readReactive(s) {
  if (s instanceof Signal) {
    return s.value;
  }
  return s;
}

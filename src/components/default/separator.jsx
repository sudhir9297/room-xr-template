import { Container } from "@react-three/uikit";
import React, { forwardRef } from "react";
import { colors } from "./theme";

export const Separator = forwardRef(
  ({ orientation = "horizontal", ...props }, ref) => {
    return (
      <Container
        flexShrink={0}
        backgroundColor={colors.border}
        width={orientation === "horizontal" ? "100%" : 1}
        height={orientation === "horizontal" ? 1 : "100%"}
        ref={ref}
        {...props}
      />
    );
  }
);

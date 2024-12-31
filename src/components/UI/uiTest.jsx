import React from "react";
import { Container, Fullscreen, Image, Root } from "@react-three/uikit";
import { ProductDetail } from "./ProductDetailUI";

const UiTest = () => {
  return (
    <Root
      positionType="relative"
      // anchorY="bottom"
      pixelSize={0.002}
      sizeX={1.6}
      sizeY={1}
    >
      <ProductDetail />
    </Root>
  );
};

export default UiTest;

const UI = () => {
  return (
    <Root
      positionType="relative"
      anchorY="top"
      pixelSize={0.002}
      sizeX={1}
      sizeY={1}
    >
      <Container
        width="100%"
        height="100%"
        justifyContent="center"
        backgroundColor="#f2f2f2"
        borderRadius={2.5}
      >
        <Image
          src={"./texture/productThumbnail/vitra_eames.png"}
          objectFit="cover"
          aspectRatio={1}
          onClick={() => handleVariationClick(el)}
        />
      </Container>
    </Root>
  );
};

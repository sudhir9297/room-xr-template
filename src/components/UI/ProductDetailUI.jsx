import { Container, Image, Text } from "@react-three/uikit";
import React from "react";

import { Check, Minus, Plus } from "@react-three/uikit-lucide";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../default/accordion";

const uiConfig = {
  borderRadius: 2,
  padding: 2,
  gap: 2,
  error: {
    primary: "#FF4C4C",
    text: {
      default: "#FFFFFF",
    },
  },
  success: {
    primary: "#4CAF50",
    text: {
      default: "#FFFFFF",
    },
  },
  warning: {
    primary: "#FFC107",
    text: {
      default: "#000000",
    },
  },
  info: {
    primary: "#2196F3",
    text: {
      default: "#FFFFFF",
    },
  },
};

export const ProductDetail = () => {
  return (
    <Container
      backgroundColor="#f2f2f2"
      backgroundOpacity={0.5}
      padding={10}
      borderRadius={uiConfig.borderRadius * 6}
    >
      <Container>
        <Container
          borderTopLeftRadius={uiConfig.borderRadius * 3}
          borderBottomLeftRadius={uiConfig.borderRadius * 3}
          width="60%"
          backgroundColor="#FFFFFF"
          padding={10}
          flexDirection="column"
        >
          <Container height="60%">
            <Container
              borderWidth="1"
              justifyContent="center"
              alignItems="center"
              flexGrow="1"
              height="100%"
            >
              <Text>3D Content</Text>
            </Container>

            <Container
              height="100%"
              gap={4}
              flexDirection="column"
              overflow={"scroll"}
              scrollbarColor="black"
              scrollbarWidth={2}
              padding="4"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((variation, idx) => (
                <Container
                  width={60}
                  height={60}
                  aspectRatio={1}
                  backgroundColor="#4CAF50"
                  backgroundOpacity="0.5"
                  borderRadius={uiConfig.borderRadius * 2}
                >
                  <Image
                    key={idx}
                    src={"./texture/productThumbnail/vitra_eames.png"}
                    objectFit="cover"
                  />
                </Container>
              ))}
            </Container>
          </Container>

          <Container
            width="100%"
            height="40%"
            flexDirection="column"
            overflow="scroll"
            scrollbarColor="black"
            scrollbarWidth={2}
          >
            <Accordion paddingX="12">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <Text fontSize={14} color="black">
                    Product Description
                  </Text>
                </AccordionTrigger>
                <AccordionContent
                  flexWrap="wrap"
                  overflow="scroll"
                  paddingRight="12"
                  scrollbarColor="black"
                  scrollbarWidth={2}
                >
                  <Text fontSize={10}>
                    You can't miss Billie when you step into a room. Its chubby
                    shape and wide armrests are completely on trend. The sofa is
                    justas stylish from the back as it is from the front, which
                    means it can easily stand almost anywhere. In addition to
                    its fantastic appearance, it is very comfortable to sit in
                    and is therefore an excellent choice as a sofa for evenings
                    in front of the TV. This variant also comes with a divan for
                    extra relaxation.
                  </Text>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <Text fontSize={14}>Dimensions</Text>
                </AccordionTrigger>
                <AccordionContent
                  flexWrap="wrap"
                  overflow="scroll"
                  paddingRight="12"
                  scrollbarColor="black"
                  scrollbarWidth={2}
                >
                  <Text fontSize={10}>300cm x 400cm x 200 cm</Text>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Container>
        </Container>
        <Container
          borderTopRightRadius={uiConfig.borderRadius * 3}
          borderBottomRightRadius={uiConfig.borderRadius * 3}
          width="40%"
          backgroundColor="#FFFFFF"
          padding={10}
        >
          <Container
            positionType="relative"
            width="100%"
            height="auto"
            justifyContent="flex-start"
            alignItems="flex-start"
            padding={10}
            flexWrap="wrap"
            overflow="scroll"
            scrollbarColor="black"
            scrollbarWidth={2}
          >
            <Container flexDirection="column">
              <Text
                width="60%"
                fontSize={16}
                color="black"
                fontWeight={"semi-bold"}
                marginBottom={12}
              >
                Billie Beige Boucle Divan Sofa Right
              </Text>
              <Container alignItems="center" gap={10} marginBottom={12}>
                <Text fontSize={16} color="black" fontWeight={"semi-bold"}>
                  $2.199
                </Text>
                <Text
                  fontSize={10}
                  color="black"
                  fontWeight={"semi-bold"}
                  opacity={0.5}
                >
                  $2.499
                </Text>
                <Text
                  fontSize={7}
                  backgroundColor={uiConfig.error.primary}
                  paddingX={uiConfig.padding * 3}
                  paddingY={uiConfig.padding * 2}
                  fontWeight={"extra-bold"}
                  borderRadius={uiConfig.borderRadius * 3}
                  color={uiConfig.error.text.default}
                >
                  ON SALE
                </Text>
              </Container>
              <Text
                width="80%"
                fontSize={10}
                fontWeight={"medium"}
                marginBottom={12}
              >
                A classic smaller-sized chest of drawers in solid wood, with a
                traditional look and modern function. Quiet, smooth-running
                drawers makes it easy to organise your things. Psst! Please
                attach to the wall.
              </Text>

              <Container
                width="100%"
                alignItems="center"
                justifyContent="flex-start"
                flexDirection="row"
                marginBottom={16}
                gap={4}
              >
                <Container
                  backgroundColor={uiConfig.success.primary}
                  width={6}
                  height={6}
                  borderRadius={uiConfig.borderRadius * 6}
                />

                <Text fontSize={10} color="black" fontWeight={"semi-bold"}>
                  In stock. Immediate delivery
                </Text>
              </Container>
              <Container
                gap={4}
                marginBottom="10"
                width="100%"
                alignItems="center"
                justifyContent="flex-start"
              >
                <Text fontSize={10} color="black" fontWeight={"semi-bold"}>
                  Color:
                </Text>
                <Text
                  fontSize={10}
                  color="black"
                  opacity={0.8}
                  fontWeight={"semi-bold"}
                >
                  Beige Boucle
                </Text>
              </Container>
              <Container
                height="70"
                gap={4}
                flexDirection="column"
                flexWrap="wrap"
                overflow={"scroll"}
                scrollbarColor="black"
                scrollbarWidth={2}
                marginBottom={16}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((variation, idx) => (
                  <Container
                    width={60}
                    height={60}
                    aspectRatio={1}
                    backgroundColor="#4CAF50"
                    backgroundOpacity="0.5"
                    borderRadius={uiConfig.borderRadius * 2}
                  >
                    <Image
                      key={idx}
                      src={"./texture/productThumbnail/vitra_eames.png"}
                      objectFit="cover"
                    />
                  </Container>
                ))}
              </Container>
              <Container flexDirection="column" gap="8" marginBottom="20">
                <Text fontSize={10} color="black" fontWeight={"semi-bold"}>
                  Side:
                </Text>
                <Container flexDirection="row" gap="8">
                  <Text
                    fontSize={12}
                    backgroundColor={"black"}
                    paddingX={uiConfig.padding * 6}
                    paddingY={uiConfig.padding * 3}
                    fontWeight={"bold"}
                    borderRadius={uiConfig.borderRadius * 3}
                    color={uiConfig.error.text.default}
                  >
                    Left
                  </Text>
                  <Text
                    fontSize={12}
                    backgroundColor={"black"}
                    paddingX={uiConfig.padding * 6}
                    paddingY={uiConfig.padding * 3}
                    fontWeight={"bold"}
                    borderRadius={uiConfig.borderRadius * 3}
                    color={uiConfig.error.text.default}
                  >
                    Right
                  </Text>
                </Container>
              </Container>
              <Container marginBottom={16} gap="8" alignItems="center">
                <Container
                  backgroundColor="black"
                  borderRadius={uiConfig.borderRadius * 3}
                  paddingY={uiConfig.padding * 2}
                  paddingX={uiConfig.padding * 2}
                >
                  <Minus color={uiConfig.error.text.default} padding="4" />
                  <Text
                    fontSize={12}
                    paddingX={uiConfig.padding * 10}
                    fontWeight={"bold"}
                    color={uiConfig.error.text.default}
                  >
                    1
                  </Text>
                  <Plus color={uiConfig.error.text.default} padding="4" />
                </Container>

                <Text
                  fontSize={12}
                  backgroundColor={uiConfig.success.primary}
                  paddingX={uiConfig.padding * 6}
                  paddingY={uiConfig.padding * 4.5}
                  fontWeight={"bold"}
                  borderRadius={uiConfig.borderRadius * 3}
                  color={uiConfig.error.text.default}
                >
                  ADD TO CART
                </Text>
              </Container>
              <Container flexDirection="column" gap={8}>
                <Container
                  width="100%"
                  alignItems="center"
                  justifyContent="flex-start"
                  flexDirection="row"
                  gap={6}
                >
                  <Container
                    backgroundColor={uiConfig.success.primary}
                    width={12}
                    height={12}
                    padding={uiConfig.padding * 0.5}
                    borderRadius={uiConfig.borderRadius * 6}
                  >
                    <Check color="white" />
                  </Container>

                  <Text fontSize={10} color="black" fontWeight={"semi-bold"}>
                    Free shipping
                  </Text>
                </Container>
                <Container
                  width="100%"
                  alignItems="center"
                  justifyContent="flex-start"
                  flexDirection="row"
                  marginBottom={16}
                  gap={6}
                >
                  <Container
                    backgroundColor={uiConfig.success.primary}
                    width={12}
                    height={12}
                    padding={uiConfig.padding * 0.5}
                    borderRadius={uiConfig.borderRadius * 6}
                  >
                    <Check color="white" />
                  </Container>
                  <Text fontSize={10} color="black" fontWeight={"semi-bold"}>
                    Buy now. Pay in 3 months, interest-free
                  </Text>
                </Container>
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

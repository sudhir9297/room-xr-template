import React, { createContext, forwardRef, useContext, useState } from "react";
import { Container, DefaultProperties } from "@react-three/uikit";
import { ChevronDown } from "@react-three/uikit-lucide";

const AccordionContext = createContext(null);

export function Accordion({ children, ...props }) {
  const stateHandler = useState(undefined);
  return (
    <Container flexDirection="column" {...props}>
      <AccordionContext.Provider value={stateHandler}>
        {children}
      </AccordionContext.Provider>
    </Container>
  );
}
const AccordionItemContext = createContext("");

export const AccordionItem = forwardRef(({ children, ...props }, ref) => {
  const [value, setValue] = useContext(AccordionContext);
  const isSelected = props.value === value;
  return (
    <Container
      cursor="pointer"
      flexDirection="column"
      onClick={() => setValue(isSelected ? undefined : props.value)}
      borderBottomWidth={1}
      ref={ref}
      {...props}
    >
      <AccordionItemContext.Provider value={props.value}>
        {children}
      </AccordionItemContext.Provider>
    </Container>
  );
});

export const AccordionTrigger = forwardRef(({ children, ...props }, ref) => {
  const itemValue = useContext(AccordionItemContext);
  const [value] = useContext(AccordionContext);
  const isSelected = itemValue === value;
  return (
    <Container
      flexDirection="row"
      flexGrow={1}
      flexShrink={1}
      alignItems="center"
      justifyContent="space-between"
      paddingY={16}
      ref={ref}
      {...props}
    >
      <DefaultProperties fontWeight="medium">{children}</DefaultProperties>
      <ChevronDown
        transformRotateZ={isSelected ? 180 : 0}
        width={16}
        height={16}
        flexShrink={0}
      />
    </Container>
  );
});

export const AccordionContent = forwardRef(({ children, ...props }, ref) => {
  const itemValue = useContext(AccordionItemContext);
  const [value] = useContext(AccordionContext);
  if (value != itemValue) {
    return null;
  }
  return (
    <Container overflow="hidden" ref={ref} {...props}>
      <Container paddingBottom={16}>
        <DefaultProperties fontSize={14}>{children}</DefaultProperties>
      </Container>
    </Container>
  );
});

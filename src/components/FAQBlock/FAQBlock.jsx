import React from "react";
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

const FAQBlock = ({title, text}) => {
  return (
    <AccordionItem bg={"var(--tg-theme-bg-color)"} color={"var(--tg-theme-text-color)"}>
      <h2>
        <AccordionButton bg={"var(--tg-theme-bg-color)"}>
          <Box as="span" flex="1" textAlign="left" color={"var(--tg-theme-text-color)"}>
            {title}
          </Box>
          <AccordionIcon color={"var(--tg-theme-text-color)"} />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4} bg={"var(--tg-theme-bg-color)"} color={"var(--tg-theme-text-color)"}>
        {text}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default FAQBlock;

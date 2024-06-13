import React from "react";
import "./BannedBanner.css";
import { useTelegram } from "../../hooks/useTelegram";
import { motion } from "framer-motion";
import { animationVariants } from "../../constants/animationList";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { Button, Text } from "@chakra-ui/react";

const BannedBanner = () => {
  const { user, onClose } = useTelegram();
  return (
    <motion.div
      className="BannedBanner"
      variants={animationVariants.fadeIn}
      initial="initial"
      animate="animate"
    >
      <WarningTwoIcon w={50} h={50} color={"red"} />
      <Text align={"center"} fontSize={"2xl"} color='var(--tg-theme-text-color)'>{user?.first_name}, Вы были заблокированы</Text>
      <Button onClick={onClose} bg={"var(--tg-theme-button-color)"} color={"var(--tg-theme-button-text-color)"}>Выйти</Button>
    </motion.div>
  );
};

export default BannedBanner;

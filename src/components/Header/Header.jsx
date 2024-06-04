import React from "react";
import Button from "../Button/Button";
import { useTelegram } from "../../hooks/useTelegram";
import "./Header.css";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box
} from "@chakra-ui/react";

const Header = () => {
  const { user, onClose } = useTelegram();

  return (
    <Box>
      <Menu>
        {({ isOpen }) => (
          <div>
            <MenuButton as={Button}>
              {isOpen ? "Закрыть" : "Открыть"}
            </MenuButton>
            <MenuList className="tgTheme">
              <MenuItem className="tgTheme">Профиль</MenuItem>
              <MenuItem className="tgTheme">FAQ</MenuItem>
              <MenuItem className="tgTheme">О нас</MenuItem>
              <MenuItem className="tgTheme" onClick={onClose}>Выйти</MenuItem>
            </MenuList>
          </div>
        )}
      </Menu>
      <span className={"username"}>{user?.username}</span>
    </Box>
  );
};

export default Header;

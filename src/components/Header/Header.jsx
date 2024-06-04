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
import { Link } from "react-router-dom";

const Header = () => {
  const { user, onClose } = useTelegram();

  return (
    <Box className="MainHeader">
      <Menu>
        {({ isOpen }) => (
          <div>
            <MenuButton as={Button}>
              {isOpen ? "Закрыть" : "Открыть"}
            </MenuButton>
            <MenuList>
              <MenuItem><Link className="link" to={"/"}>Главная</Link></MenuItem>
              <MenuItem><Link className="link" to={"/faq"}>FAQ</Link></MenuItem>
              <MenuItem><Link className="link" to={"/"}>О нас</Link></MenuItem>
              <MenuItem onClick={onClose}>Выйти</MenuItem>
            </MenuList>
          </div>
        )}
      </Menu>
      <span className={"username"}>{user?.username}</span>
    </Box>
  );
};

export default Header;

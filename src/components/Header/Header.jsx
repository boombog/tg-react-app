import React from "react";
import Button from "../Button/Button";
import { useTelegram } from "../../hooks/useTelegram";
import useFetchData from "../../hooks/useFetch";
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
  const TESTID = 666666;
  const { user, onClose } = useTelegram();
  const { data, loading} = useFetchData(`https://6fc7-178-206-118-118.ngrok-free.app/api/getuser/${(user ? user.id : TESTID)}`);

  return (
    <Box className="MainHeader">
      <Menu>
        {({ isOpen }) => (
          <div>
            <MenuButton as={Button}>
              {isOpen ? "Закрыть" : "Открыть"}
            </MenuButton>
            <MenuList width={"calc(100vw - 20px)"} m={"10px"}>
              <MenuItem><Link className="link" to={"/"}>Главная</Link></MenuItem>
              <MenuItem><Link className="link" to={"/faq"}>FAQ</Link></MenuItem>
              {data?.role === "admin" ? <MenuItem><Link className="link" to={"/admin"}>AdminPanel</Link></MenuItem> : null}
              <MenuItem><Link className="link" to={"/contact"}>Написать в поддержку</Link></MenuItem>
              <MenuItem onClick={onClose}>Выйти</MenuItem>
            </MenuList>
          </div>
        )}
      </Menu>
      <span className={"username"}>{user?.username}</span>
      <span className="data">{loading ? <>Загрузка...</> : data.first_name}</span>
    </Box>
  );
};

export default Header;

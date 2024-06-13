import "./AdminPanel.css";
import { useEffect, useCallback } from "react";
import axios from "axios";
import { useTelegram } from "../../hooks/useTelegram";
import useFetchGet from "../../hooks/useFetchGet";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";

const AdminPanel = () => {
  const { tg, fetchURL, user, onClose, queryId } = useTelegram();
  const { data, loading, error } = useFetchGet(`${fetchURL}/api/getusers`);

  useEffect(() => {
    tg.MainButton.hide();
  }, [tg]);

  const makeAdmin = useCallback(
    (firstName, userID) => {

      const data = {
        firstName: firstName,
        login: user?.username || "testmode",
        queryId: queryId,
      };
      console.log("Отправляются данные: ", data);
      axios.post(`${fetchURL}/api/makeadmin/${userID}`, data, {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        })
        .catch((error) => {
          console.error("Ошибка отправки: ", error);
        });

      onClose();
    },
    [onClose, user?.username, queryId, fetchURL]
  );

  const makeUser = useCallback(
    (firstName, userID) => {

      const data = {
        firstName: firstName,
        login: user?.username || "testmode",
        queryId: queryId,
      };
      console.log("Отправляются данные: ", data);
      axios.post(`${fetchURL}/api/makeuser/${userID}`, data, {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        })
        .catch((error) => {
          console.error("Ошибка отправки: ", error);
        });

      onClose();
    },
    [onClose, user?.username, queryId, fetchURL]
  )

  const banUser = useCallback(
    (firstName, userID) => {

      const data = {
        firstName: firstName,
        login: user?.username || "testmode",
        queryId: queryId
      };
      console.log("Отправляются данные: ", data);
      axios.post(`${fetchURL}/api/ban/${userID}`, data, {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        })
        .catch((error) => {
          console.error("Ошибка отправки: ", error);
        });

      onClose();
    },
    [onClose, user?.username, queryId, fetchURL]
  )

  const unbanUser = useCallback(
    (firstName, userID) => {

      const data = {
        firstName: firstName,
        login: user?.username || "testmode",
        queryId: queryId
      };
      console.log("Отправляются данные: ", data);
      axios.post(`${fetchURL}/api/unban/${userID}`, data, {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        })
        .catch((error) => {
          console.error("Ошибка отправки: ", error);
        });

      onClose();
    },
    [onClose, user?.username, queryId, fetchURL]
  )

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Heading size={"md"}>Загрузка...</Heading>
        </CardHeader>
      </Card>
    );
  }

  if (error) {
    return <div>Ошибка загрузки: {error.message}</div>;
  }

  return (
    <Card bg={"var(--tg-theme-bg-color)"}>
      <CardHeader bg={"var(--tg-theme-bg-color)"}>
        <Heading color={"var(--tg-theme-text-color)"} size="md">
          Список пользователей чат-бота
        </Heading>
      </CardHeader>

      <CardBody bg={"var(--tg-theme-bg-color)"}>
        <Stack
          divider={<StackDivider color={"var(--tg-theme-text-color)"} />}
          spacing="4"
        >
          {data && data.length > 0 ? (
            data.map((item) => {
              return (
                <Box key={item.accLogin} bg={"var(--tg-theme-bg-color)"}>
                  <Heading
                    color={"var(--tg-theme-text-color)"}
                    size="xs"
                  >
                    {item.first_name} {`(${item.role === "admin" ? "Администратор" : "Пользователь"})`}{" "}
                    {item.user_id === user?.id ? "[Вы]" : ""}
                  </Heading>
                  <Text
                    color={"var(--tg-theme-text-color)"}
                    pt="2"
                    fontSize="sm"
                  >
                    Синхронизирован с аккаунтом: {item.accLogin}{" "}
                    {`(${item.phone})`}
                  </Text>
                  {item.user_id === 666666 ? (
                    <Text
                      color={"var(--tg-theme-text-color)"}
                      pt="2"
                      fontSize="sm"
                    >
                      Этот аккаунт является тестовым для разработок.
                    </Text>
                  ) : (
                    ""
                  )}
                  {item.accLogin !== "test" && item.user_id !== user?.id ? (
                    <Box display={"flex"} gap={"10px"} mt={"10px"}>
                      {item.role === "admin" ? (
                        <Button bg={"var(--tg-theme-button-color)"} color={"var(--tg-theme-button-text-color)"} onClick={() => makeUser(item.first_name, item.user_id)}>
                          Понизить до пользователя
                        </Button>
                      ) : (
                        <Button bg={"var(--tg-theme-button-color)"} color={"var(--tg-theme-button-text-color)"} onClick={() => makeAdmin(item.first_name, item.user_id)}>
                          Выдать Администратора
                        </Button>
                      )}
                      {item.userStatus === "unblocked" ? (
                        <Button bg={"var(--tg-theme-button-color)"} color={"var(--tg-theme-button-text-color)"} onClick={() => banUser(item.first_name, item.user_id)}>
                          Заблокировать
                        </Button>
                      ) : (
                        <Button bg={"var(--tg-theme-button-color)"} color={"var(--tg-theme-button-text-color)"} onClick={() => unbanUser(item.first_name, item.user_id)}>
                          Разблокировать
                        </Button>
                      )}
                    </Box>
                  ) : (
                    ""
                  )}
                </Box>
              );
            })
          ) : (
            <div>Пользователей нет...</div>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default AdminPanel;

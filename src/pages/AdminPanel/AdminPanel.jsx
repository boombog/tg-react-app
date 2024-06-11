import "./AdminPanel.css";
import { useEffect } from "react";
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
  Text
} from "@chakra-ui/react";


const AdminPanel = () => {
  const { tg, fetchURL, user } = useTelegram();
  const { data, loading, error } = useFetchGet(
    `${fetchURL}/api/getusers`
  );
  useEffect(() => {
    tg.MainButton.hide();
  }, [tg]);

  if (loading) {
    return <Card><CardHeader><Heading size={"md"}>Загрузка...</Heading></CardHeader></Card>;
  }

  if (error) {
    return <div>Ошибка загрузки: {error.message}</div>;
  }

  return (
    <Card bg={"var(--tg-theme-bg-color)"}>
      <CardHeader bg={"var(--tg-theme-bg-color)"}>
        <Heading color={"var(--tg-theme-text-color)"} size="md">Список пользователей чат-бота</Heading>
      </CardHeader>

      <CardBody bg={"var(--tg-theme-bg-color)"}>
        <Stack divider={<StackDivider color={"var(--tg-theme-text-color)"} />} spacing="4">
          {data && data.length > 0 ? (
            data.map((item) => {
              return (
                <Box bg={"var(--tg-theme-bg-color)"}>
                  <Heading color={"var(--tg-theme-text-color)"} size="xs" textTransform="uppercase">
                    {item.first_name} {`(${item.role})`} {item.user_id === user?.id ? "Вы" : ""}
                  </Heading>
                  <Text color={"var(--tg-theme-text-color)"} pt="2" fontSize="sm">
                    Синхронизирован с аккаунтом: {item.accLogin} {`(${item.phone})`}
                  </Text>
                </Box>
              );
            })
          ) : (
            <div>Заявок нет</div>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default AdminPanel;

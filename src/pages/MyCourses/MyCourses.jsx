import React from "react";
import "./MyCourses.css";
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
} from "@chakra-ui/react";

const MyCourses = () => {
  const TESTID = 666666;
  const { user, fetchURL } = useTelegram();
  const { data, loading, error } = useFetchGet(
    `${fetchURL}/api/getmycourses/${user ? user.id : TESTID}`
  );

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
          Список моих курсов на платформе
        </Heading>
      </CardHeader>

      <CardBody bg={"var(--tg-theme-bg-color)"}>
        <Stack
          divider={<StackDivider color={"var(--tg-theme-text-color)"} />}
          spacing="4"
        >
          {data? (
            <Box key={data.fullname} bg={"var(--tg-theme-bg-color)"}>
                <Heading color={"var(--tg-theme-text-color)"} size="xs">
                {data.fullname}
                </Heading>
            </Box>
          ) : (
            <Box bg={"var(--tg-theme-bg-color)"}>
              <Heading color={"var(--tg-theme-text-color)"} size="xs">
                Курсов нет
              </Heading>
            </Box>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default MyCourses;

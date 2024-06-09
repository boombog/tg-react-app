import "./AdminPanel.css";
import { useEffect } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import useFetchData from "../../hooks/useFetch";
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
  const { tg, fetchURL } = useTelegram();
  const { data, loading, error } = useFetchData(
    `${fetchURL}/api/getallreports`
  );
  useEffect(() => {
    tg.MainButton.hide();
  }, [tg]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Заявки пользователей</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {data && data.length > 0 ? (
            data.map((item) => {
              return (
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    {item.username}
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {item.message}
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

import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const UserReport = (data) => {
  return (
    <Box>
      <Heading size="xs" textTransform="uppercase">
        {data.username}
      </Heading>
      <Text pt="2" fontSize="sm">
        {data.message}
      </Text>
    </Box>
  );
};

export default UserReport;

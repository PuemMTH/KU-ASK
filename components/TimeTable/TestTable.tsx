import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";

const Schedule: React.FC = () => {
  return (
    <Flex gridTemplateColumns="repeat(7, 1fr)" gridTemplateRows="repeat(24, 1fr)" alignItems="center" justifyContent="center" >
      <Box gridColumn="1 / 2" gridRow="1 / 2" bg="gray.100" color="gray.700" fontSize="lg" borderWidth="1px" borderColor="gray.200" borderRadius="md" boxShadow="md">
        <Text>12:00 AM</Text>
      </Box>
      <Box gridColumn="1 / 2" gridRow="2 / 3" bg="gray.100" color="gray.700" fontSize="lg" borderWidth="1px" borderColor="gray.200" borderRadius="md" boxShadow="md">
        <Text>1:00 AM</Text>
      </Box>
      <Box gridColumn="2 / 3" gridRow="1 / 2" bg="gray.100" color="gray.700" fontSize="lg" borderWidth="1px" borderColor="gray.200" borderRadius="md" boxShadow="md">
        <Text>12:00 AM</Text>
      </Box>
      <Box gridColumn="2 / 3" gridRow="2 / 3" bg="gray.100" color="gray.700" fontSize="lg" borderWidth="1px" borderColor="gray.200" borderRadius="md" boxShadow="md" >
        <Text>1:00 AM</Text>
      </Box>
  </Flex>
  )
}

export default function TestTable() {
  return (
    <>
      <Schedule />
    </>
  );
}

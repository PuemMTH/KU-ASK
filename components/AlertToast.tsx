import { useToast, Button, Box } from "@chakra-ui/react"

function CustomToastExample() {
  const toast = useToast()
  return (
    <Button
      onClick={() =>
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
    >
      Show Toast
    </Button>
  )
}

export default CustomToastExample
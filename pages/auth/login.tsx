import { Button, Checkbox, Flex, FormControl, FormLabel, Heading, Input, Link, Stack, Image, CreateToastFnReturn } from "@chakra-ui/react";
import Notiflix from "notiflix";
import { useEffect, useRef } from "react";
import FAxiosService from "../../services/faxios.service";
import { LoginInF, User } from "../../interface/global_interface";
import { useLocalStorage } from "usehooks-ts";
import { NextRouter, useRouter } from "next/router";
import { useToast } from '@chakra-ui/react'

export default function SplitScreen() {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const router: NextRouter = useRouter()
  const toast: CreateToastFnReturn = useToast()

  // useLocalStorage
  const [accesstoken, setAccesstoken] = useLocalStorage<string | undefined>( "accesstoken", undefined);
  const [user, setUser] = useLocalStorage<LoginInF | undefined>("user", undefined);

  let AxiosProvider = new FAxiosService(); 

  const haddleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const usernameValue = username.current?.value;
    const passwordValue = password.current?.value;

    Notiflix.Loading.dots()

    if (!usernameValue || !passwordValue) {
      Notiflix.Notify.failure("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    try{
      const { data } = await AxiosProvider.axiosInstance.post<LoginInF>("/login", {
        username: usernameValue,
        password: passwordValue,
      });

      if (data) {
        (async () => {
          toast({
            title: 'Login Success.',
            description: "ยินดีต้อนรับคุณ " + data.user.idCode,
            status: 'success',
            variant: 'subtle',
            duration: 4000,
            position: 'top',
            isClosable: true,
          })
          setAccesstoken(data.accesstoken);
          setUser(data);
          await AxiosProvider.axiosInstance.post('/sub/update_status_users', { token_verify: data.accesstoken }).then(res => {
            // console.log(res.data)
          })
        })();
        router.push("/");
      } else {
        Notiflix.Notify.failure("เข้าสู่ระบบไม่สำเร็จ");
      }
    }catch(e){
      Notiflix.Notify.failure("เข้าสู่ระบบไม่สำเร็จ");
    } finally {
      Notiflix.Loading.remove()
    }

  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex flex={2} bg={"blue.700"}>
        {/*  */}
      </Flex>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <form onSubmit={haddleLogin}>
            <Heading fontSize={"2xl"}>Sign in to your account</Heading>
            <FormControl id="text">
              <FormLabel>บัญชีผู้ใช้เครือข่ายนนทรี</FormLabel>
              <Input type="text" ref={username} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>รหัสผ่าน</FormLabel>
              <Input type="password" ref={password} />
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.500"}>Forgot password?</Link>
              </Stack>
              <Button colorScheme={"blue"} variant={"solid"} type="submit" >
                Sign in
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </Stack>
  );
}

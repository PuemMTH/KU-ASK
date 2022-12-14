import { Button, Checkbox, Flex, FormControl, FormLabel, Heading, Input, Link, Stack, Image, CreateToastFnReturn, Text } from "@chakra-ui/react";
import Notiflix from "notiflix";
import { useEffect, useRef } from "react";
import FAxiosService from "../../services/faxios.service";
import { LoginInF, User } from "../../interface/global_interface";
import { useLocalStorage } from "usehooks-ts";
import { NextRouter, useRouter } from "next/router";
import { useToast } from '@chakra-ui/react'
import { Show, Hide } from '@chakra-ui/react'

// eye icon for show password
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Head from "next/head";

export default function SplitScreen() {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const router: NextRouter = useRouter()
  const toast: CreateToastFnReturn = useToast()

  // useLocalStorage
  const [accesstoken, setAccesstoken] = useLocalStorage<string | undefined>( "accesstoken", undefined);
  const [user, setUser] = useLocalStorage<LoginInF | undefined>("user", undefined);

  let AxiosProvider = new FAxiosService(); 

  useEffect(() => {
    // password edit eye icon for show password
    const password = document.getElementById("password");
    const eye = document.getElementById("eye");
    eye?.addEventListener("click", togglePass);
    function togglePass() {
      eye?.classList.toggle("active");
      (password as HTMLInputElement).type === "password"
        ? (password as HTMLInputElement).type = "text"
        : (password as HTMLInputElement).type = "password";
    }
  }, [1]);

  const haddleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const usernameValue = username.current?.value;
    const passwordValue = password.current?.value;

    Notiflix.Loading.dots()

    if (!usernameValue || !passwordValue) {
      Notiflix.Notify.failure("กรุณากรอกข้อมูลให้ครบ");
      setTimeout(() => {
        Notiflix.Loading.remove()
      }, 2000)
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
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <Stack
        minH={"100vh"}
        direction={{ base: "column", md: "row" }}
      >
        <Hide below='md'>
          <Flex flex={2} bg={"blue.700"}>
            {/*  */}
          </Flex>
        </Hide>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <form onSubmit={haddleLogin}>
              <Heading fontSize={"2xl"} py="5">Sign in to your account</Heading>
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
                  align={"end"}
                  justify={"end"}
                >
                </Stack>
                <Button colorScheme={"blue"} variant={"solid"} type="submit" >
                  Sign in
                </Button>
                <Text color={"gray.400"}>
                  ทั้งหมดนี้ <Text as="span" color="red.400"> ไม่ใช่ </Text> เว็บของมหาลัยจริง <Text as="span" color="red.400"> KU-ASK </Text>
                  เป็นเว็บไซต์ที่ทำขึ้นเพื่อทำให้สดวกต่อ การจัดการหน่วยกิต
                  โดยใช้ข้อมูลจาก <Text as="span" color="green.400"> https://my.ku.th/ </Text>
                </Text>
              </Stack>
            </form>
          </Stack>
        </Flex>
      </Stack>
    </>
  );
}

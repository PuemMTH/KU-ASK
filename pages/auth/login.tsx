import { Button, Checkbox, Flex, FormControl, FormLabel, Heading, Input, Link, Stack, Image, CreateToastFnReturn, Text, InputRightElement, InputGroup } from "@chakra-ui/react";
import Notiflix from "notiflix";
import { useEffect, useRef, useState } from "react";
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
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

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
          <Flex
            flex={2} 
            bg={"blue.700"}
            bgImage={'url(https://gamerstyle.com.mx/wp-content/uploads/2022/09/Spy-x-Family-fecha-parte-2.jpg)'}
            bgPos={'center'}
            bgSize={'cover'}
            align={"center"}
          >
            {/* image */}
          </Flex>
        </Hide>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <form onSubmit={haddleLogin}>
              <Heading fontSize={"2xl"} py="5">Sign in to your account</Heading>
              <FormControl id="text">
                <FormLabel>บัญชีผู้ใช้เครือข่ายนนทรี</FormLabel>
                <Input type="text" placeholder='เช่น 64xxxxxxxx' ref={username} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>รหัสผ่าน</FormLabel>
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    ref={password}
                    type={show ? 'text' : 'password'}
                    placeholder='รหัสผ่านผู้ใช้เครือข่ายนนทรี'
                  />
                  <InputRightElement width='4.5rem' >
                    <Button h='1.75rem' size='md' onClick={handleClick}>
                      {show ? <MdVisibility/> : <MdVisibilityOff/>}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={6}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"end"}
                  justify={"end"}
                >
                </Stack>
                <Button colorScheme={"blue"} variant={"solid"} type="submit" >
                  เข้าสู่ระบบ
                </Button>
                <Text color={"gray.400"}>
                  ทั้งหมดนี้ <Text as="span" color="red.400"> ไม่ใช่ </Text> เว็บของมหาลัยจริง <Text as="span" color="red.400"> KU-ASK </Text>
                  เป็นเว็บไซต์ที่ทำขึ้นเพื่อทำให้สดวกต่อ การจัดการหน่วยกิต
                  โดยใช้ข้อมูลจาก <Text as="span" color="green.400"> <a href="https://my.ku.th/">https://my.ku.th/</a> </Text>
                </Text>
              </Stack>
            </form>
          </Stack>
        </Flex>
      </Stack>
    </>
  );
}
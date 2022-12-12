import { ReactNode, useState, useEffect } from 'react';
import { Image, Box, Flex, Avatar, Link, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, useColorModeValue, Stack, useColorMode, Center, color, HStack, Input, Popover, PopoverAnchor, PopoverBody, PopoverContent, PopoverTrigger, Radio, RadioGroup, Card, CardBody, CardFooter, CardHeader, Heading, Text, StatGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { NextRouter, useRouter } from 'next/router';
import Notiflix from 'notiflix';
import { useReadLocalStorage } from 'usehooks-ts'
import { LoginInF } from '../interface/global_interface';
import Sidebar from '../components/Sidebar';

import AxiosServiceFrontend from '../services/faxios.service';
import Head from 'next/head';

export default function Nav() {
  const router: NextRouter = useRouter()
  const accesstoken = useReadLocalStorage<string | undefined>("accesstoken");
  const user = useReadLocalStorage<LoginInF | undefined>("user");
  const [isLoading, setIsLoading] = useState(false);
  const [isUser, setIsUser] = useState<LoginInF | undefined>(undefined);

  let FAxios = new AxiosServiceFrontend();
  const removelocalStorage = () => {
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('user');
    window.location.href = '/auth/login';
  }

  useEffect(() => {
    Notiflix.Loading.dots('Loading...');
    if (user !== undefined && user !== null) {
      if(accesstoken !== undefined && accesstoken !== null && typeof accesstoken === 'string'){
        let check = FAxios.axiosInstance.post('/token', { token_verify: accesstoken })
        check.then((res) => {
          if(res.status === 200){
            setIsUser(user);
          }else{
            removelocalStorage()
          }
        }).catch(() => {
          removelocalStorage()
        });
      }
    }else{
      removelocalStorage()
    }
    setTimeout(() => {
      Notiflix.Loading.remove();
    }, 1000)
    setIsLoading(true);
  }, [user, accesstoken])

  const CompoNode: ReactNode = (
    <>
      <Stack spacing='2'>
          <Card variant={"outline"} align='center'>
            <CardHeader>
              <Heading size='md'> Customer dashboard</Heading>
            </CardHeader>
            <CardBody>
              <Text>View a summary of all your customers over the last month.</Text>
            </CardBody>
            <CardFooter>
              <Button colorScheme='blue'>View here</Button>
            </CardFooter>
          </Card>
          <Card variant={"outline"} mt={2}>
            <CardBody>
              <StatGroup>
                <Stat>
                  <StatLabel>Sent</StatLabel>
                  <StatNumber>345,670</StatNumber>
                  <StatHelpText>
                    <StatArrow type='increase' />
                    23.36%
                  </StatHelpText>
                </Stat>

                <Stat>
                  <StatLabel>Clicked</StatLabel>
                  <StatNumber>45</StatNumber>
                  <StatHelpText>
                    <StatArrow type='decrease' />
                    9.05%
                  </StatHelpText>
                </Stat>
              </StatGroup>
            </CardBody>
          </Card>
      </Stack>
  </>
  )

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Sidebar title={"Home"} users={isUser} _children={CompoNode} />
    </>
  )
}
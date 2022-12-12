import { ReactNode, useState, useEffect } from 'react';
import { Image, Box, Flex, Avatar, Link, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, useColorModeValue, Stack, useColorMode, Center, color, HStack, Input, Popover, PopoverAnchor, PopoverBody, PopoverContent, PopoverTrigger, Radio, RadioGroup, Card, CardBody, CardFooter, CardHeader, Heading, Text, StatGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Breadcrumb, BreadcrumbItem, BreadcrumbLink, SimpleGrid, GridItem, Grid } from '@chakra-ui/react';
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

  const [isInput, setIsInput] = useState<string | undefined>(undefined);
  const [dataSearch, setDataSearch] = useState<any>([]);
  useEffect(() => {
    // https://ku-ask.vercel.app/api/sub/find_subject
    FAxios.axiosInstance.get('/sub/find_subject').then((res) => {
      setDataSearch(res.data.data)
    });
    console.log(dataSearch)
  }, [1]);

  const CompoNode: ReactNode = (
    <>
      <Stack spacing='2'>
          <Card variant={"outline"}>
            <CardHeader>Search</CardHeader>
            <CardBody alignItems={"flex-end"}>
              <Input
                placeholder="Search" 
                size="sm"
                onChange={(e) => {
                  setIsInput(e.target.value)
                }}
              />
            </CardBody>
          </Card>
          {/* <SimpleGrid columns={2} spacing={2}> */}
          {/* if mobile size to set colums to 1 */}
          <SimpleGrid columns={[1, 2, 2, 2]} spacing={2}>
            {
              dataSearch?.filter((item: any) => {
                if(isInput === undefined){
                  return item
                }else if(item.sub_code.toLowerCase().includes(isInput.toLowerCase())){
                  return item
                }
              }).map((item: any, index: number) => {
                if(index < 6){
                  return (
                    <GridItem key={index}>
                      <Card variant={"outline"}>
                        <CardBody>
                          <Text>
                            {item.sub_code}
                          </Text>
                          <Text>
                            วิชา {item.subject_name}
                          </Text>
                          <Text>
                            กลุ่ม {item.group_}
                          </Text>
                        </CardBody>
                      </Card>
                    </GridItem>
                  )
                }
              })
            }
          </SimpleGrid>
      </Stack>

      
  </>
  )
  return (
    <>
      <Head>
        <title>Search</title>
      </Head>
      <Sidebar title={"Search"} users={isUser} _children={CompoNode} />
    </>
  )
}
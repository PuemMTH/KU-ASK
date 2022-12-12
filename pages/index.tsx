import { ReactNode, useState, useEffect } from 'react';
import { Image, Box, Flex, Avatar, Link, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, useColorModeValue, Stack, useColorMode, Center, color, HStack, Input, Popover, PopoverAnchor, PopoverBody, PopoverContent, PopoverTrigger, Radio, RadioGroup, Card, CardBody, CardFooter, CardHeader, Heading, Text, StatGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Breadcrumb, BreadcrumbItem, BreadcrumbLink, List, ListIcon, ListItem } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { NextRouter, useRouter } from 'next/router';
import Notiflix from 'notiflix';
import { useReadLocalStorage } from 'usehooks-ts'
import { LoginInF } from '../interface/global_interface';
import Sidebar from '../components/Sidebar';

import AxiosServiceFrontend from '../services/faxios.service';
import Head from 'next/head';
import { MdCheckCircle, MdSettings } from 'react-icons/md';

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
    // window.location.href = '/auth/login';
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

  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const CompoNode: ReactNode = (
    <>
      <Stack spacing='2'>
          <Card variant={"outline"}>
            <CardBody>
              <StatGroup>
                <Stat>
                  <StatLabel>Time</StatLabel>
                  <StatNumber>{
                    time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ' ' + (time.getHours() >= 12 ? 'PM' : 'AM')
                  }</StatNumber>
                  <StatHelpText>
                    <StatArrow type='increase' />
                    {time.getHours() >= 12 ? 'Good Afternoon' : 'Good Morning' + ' ' + isUser?.user.firstNameEn + ' ' + isUser?.user.lastNameEn}
                  </StatHelpText>
                </Stat>

                <Stat>
                  <StatLabel>Date</StatLabel>
                  <StatNumber>{time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear()}</StatNumber>
                  <StatHelpText>
                    <StatArrow type='decrease' />
                    {isUser?.user.student.campusNameTh}
                  </StatHelpText>
                </Stat>
              </StatGroup>
            </CardBody>
          </Card>
          <Card variant={"outline"} align='left'>
            <CardHeader>
              <Heading size='sm'> 
                แผนการพัฒนาระบบ
              </Heading>
            </CardHeader>
            <CardBody>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={MdCheckCircle} color='green.500' />
                ระบบแสดงข้อมูลสถิติการทำงานของระบบ
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color='green.500' />
                หน้า Home แสดงแผนการทำงาน
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color='green.500' />
                หน้า Course ส่วนการแสดงข้อมูลของตารางที่จัดไว้
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color='green.500' />
                หน้า Course ส่วนการแก้ไขข้อมูล
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color='green.500' />
                หน้า Course ส่วนการ Sync ข้อมูลจากระบบ myku
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color='green.500' />
                หน้า Search ส่วนการ ค้นหาและแสดงข้อมูล รายละเอียดของนรายวิชา
              </ListItem>
              <ListItem>
                <ListIcon as={MdSettings} color='yellow.500' />
                หน้า TimeTable ส่วนการแสดงตารางเรียน
              </ListItem>
              <ListItem>
                <ListIcon as={MdSettings} color='yellow.500' />
                หน้า TimeTable ส่วนการแก้ไขตารางเรียน
              </ListItem>
              <ListItem>
                <ListIcon as={MdSettings} color='yellow.500' />
                หน้า TimeTable ส่วนการ Sync ข้อมูลจากระบบ myku
              </ListItem>
              <ListItem>
                <ListIcon as={MdSettings} color='red.500' />
                หน้า Setting ส่วนการตั้งค่าการใช้งาน
              </ListItem>
            </List>
            </CardBody>
            <CardFooter>
              <Button colorScheme='blue'>View here</Button>
            </CardFooter>
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
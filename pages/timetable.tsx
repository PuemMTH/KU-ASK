import { ReactNode, useState, useEffect, useRef } from 'react';
import { Image, Box, Flex, Avatar, Link, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, useColorModeValue, Stack, useColorMode, Center, color, HStack, Input, Popover, PopoverAnchor, PopoverBody, PopoverContent, PopoverTrigger, Radio, RadioGroup, Card, CardBody, CardFooter, CardHeader, Heading, Text, StatGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { NextRouter, useRouter } from 'next/router';
import Notiflix from 'notiflix';
import { useReadLocalStorage } from 'usehooks-ts'
import { LoginInF, ResultGroupCourse } from '../interface/global_interface';
import Sidebar from '../components/Sidebar';

import AxiosServiceFrontend from '../services/faxios.service';
import Head from 'next/head';
import CardTable from '../components/TimeTable/CardTable';

export default function TimeTableShow() {
  const router: NextRouter = useRouter()
  const accesstoken = useReadLocalStorage<string | undefined>("accesstoken");
  const user = useReadLocalStorage<LoginInF | undefined>("user");
  const [isUser, setIsUser] = useState<LoginInF | undefined>(undefined);

  const [gcData, setGcData] = useState<ResultGroupCourse[] | undefined>(undefined)
  

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
  }, [user, accesstoken])

  useEffect(() => {
    Notiflix.Loading.dots('Loading...');
    let check = FAxios.axiosInstance.post('/ku/getGroupCourse', { token_verify: accesstoken, academicYear: "2565", semester: "2"  })
    check.then((res) => {
      console.log(res.data.data.results[0].course)
      setGcData(res.data.data.results[0].course)
      Notiflix.Loading.remove();
    } ).catch(() => {
      Notiflix.Loading.remove();
    });
  }, [accesstoken])



  const CompoNode: ReactNode = (
    <>
        <CardTable GroupCourse={gcData}/>
    </>
  )

  return (
    <>
      <Head>
        <title >TimeTable</title>
      </Head>
      <Sidebar title={"TimeTable"} users={isUser} _children={CompoNode} />
      
    </>
  )
}
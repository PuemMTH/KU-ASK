import { ReactNode, useState, useEffect, useRef } from 'react';
import { Image, Box, Flex, Avatar, Link, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, useColorModeValue, Stack, useColorMode, Center, color, HStack, Input, Popover, PopoverAnchor, PopoverBody, PopoverContent, PopoverTrigger, Radio, RadioGroup, Card, CardBody, CardFooter, CardHeader, Heading, Text, StatGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Table, TableContainer, Tbody, Td, Th, Thead, Tr, AlertDialogContent, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { NextRouter, useRouter } from 'next/router';
import Notiflix from 'notiflix';
import { useEffectOnce, useReadLocalStorage } from 'usehooks-ts'
import { LoginInF } from '../interface/global_interface';
import Sidebar from '../components/Sidebar';

import AxiosServiceFrontend from '../services/faxios.service';
import TableEditor from '../components/TableEditor';
import Head from 'next/head';
import TableShow from '../components/TableShow';

export default function Nav() {
  const router: NextRouter = useRouter()
  const accesstoken = useReadLocalStorage<string | undefined>("accesstoken");
  const user = useReadLocalStorage<LoginInF | undefined>("user");
  const [isLoading, setIsLoading] = useState(false);
  const [isUser, setIsUser] = useState<LoginInF | undefined>(undefined);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isSearch, setIsSearch] = useState<any>([])

  const [fInv, setFInv] = useState<any>([])

  let FAxios = new AxiosServiceFrontend();
  const removelocalStorage = () => {
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('user');
    window.location.href = '/auth/login';
  }
  
  const handleResync = () => {
    Notiflix.Loading.dots('Loading...');
    let check = FAxios.axiosInstance.post('/sub/resync_inv_users', { token_verify: accesstoken })
    check.then(() => {
      setIsSaveLoading(false);
      Notiflix.Loading.remove();
      router.push('/');
    } ).catch(() => {
      setIsSaveLoading(false);
      Notiflix.Loading.remove();
      // console.log("Error")
    });
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

  useEffect(() => {
    let check = FAxios.axiosInstance.post('/sub/find_inv_users', { token_verify: accesstoken })
    check.then((res) => {
        if(res.status === 200){
            setFInv(res.data)
        }
    }).catch(() => {
        // console.log("Error")
    });
  },[1])

  const Resync = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef(null)
  
    return (
      <>
        <Button colorScheme='red' onClick={onOpen} size='sm' mx="2">
          Sync
        </Button>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Resync Data
              </AlertDialogHeader>
              <AlertDialogBody>
                <Text><Text color={"red"} fontWeight='bold'>คำเตือน</Text>ข้อมูลของคุณจะถูกลบทั้งหมด และจะถูกดึงข้อมูลใหม่จากระบบ</Text>
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  ml={3}
                  isLoading={isSaveLoading}
                  loadingText='Resyncing...'
                  colorScheme='red'
                  onClick={() => {
                      onClose();
                      setIsSaveLoading(true);
                      handleResync();
                  }}
                >
                  Resync Now
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }

  const CompoNode: ReactNode = (
    <>
      <TableEditor data={fInv} setData={setFInv} _children={Resync} />
    </>
  )

  return (
    <>
    <Head>
      <title>Course</title>
    </Head>
      {
        <Sidebar title={"Course"} users={isUser} _children={CompoNode} />
      }
    </>
  )
}

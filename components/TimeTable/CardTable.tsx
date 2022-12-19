import { Box,  Button,  Card, Text, CardBody,  CardFooter,  CardHeader,  chakra, Container, Flex,  Heading,  List,  ListIcon,  ListItem,  SimpleGrid,  Stack,  Stat,  StatArrow,  StatGroup,  StatHelpText,  StatLabel,  StatNumber,  useColorModeValue, VStack, Avatar, Badge, Table, Image, FormLabel, Switch, FormControl, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { ResultGroupCourse } from "../../interface/global_interface";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";

const CardTime: React.FC<{GroupCourse: ResultGroupCourse[] | undefined}> = ({GroupCourse}) => {
  const cScheme = (type: string) => {
    if(type == 'บรรยาย ') return ''
    if(type == 'ปฏิบัติ ') return 'red'
    if(type == 'LECTURE ') return 'facebook.500'
    if(type == 'LAB ') return 'red'
    if(type == 'MON ') return 'yellow'
    if(type == 'TUE ') return 'red'
    if(type == 'WED ') return 'green'
    if(type == 'THU ') return 'orange'
    if(type == 'FRI ') return 'blue'
    if(type == 'SAT ') return 'pink'
    if(type == 'SUN ') return 'gray'
  }

  const LangThEn = {
    'th': {
      'MON': 'จันทร์',
      'TUE': 'อังคาร',
      'WED': 'พุธ',
      'THU': 'พฤหัส',
      'FRI': 'ศุกร์',
      'SAT': 'เสาร์',
      'SUN': 'อาทิตย์',

      'DAY': 'วัน',
      'TIME': 'เวลา',
      'SUBJECT_CODE': 'รหัสวิชา',
      'SUBJECT_NAME': 'ชื่อวิชา',
      'TEACHER': 'อาจารย์',
    },
    'en': {
      'MON': 'MON',
      'TUE': 'TUE',
      'WED': 'WED',
      'THU': 'THU',
      'FRI': 'FRI',
      'SAT': 'SAT',
      'SUN': 'SUN',

      'DAY': 'DAY',
      'TIME': 'TIME',
      'SUBJECT_CODE': 'SUBJECT CODE',
      'SUBJECT_NAME': 'SUBJECT NAME',
      'TEACHER': 'TEACHER',
    }
  }

  const haddleDayOfWeek = (day: string, lang: string) => {
    if(day == 'MON ' && lang == 'en') return LangThEn.en.MON
    if(day == 'TUE ' && lang == 'en') return LangThEn.en.TUE
    if(day == 'WED ' && lang == 'en') return LangThEn.en.WED
    if(day == 'THU ' && lang == 'en') return LangThEn.en.THU
    if(day == 'FRI ' && lang == 'en') return LangThEn.en.FRI
    if(day == 'SAT ' && lang == 'en') return LangThEn.en.SAT
    if(day == 'SUN ' && lang == 'en') return LangThEn.en.SUN
    if(day == 'MON ' && lang == 'th') return LangThEn.th.MON
    if(day == 'TUE ' && lang == 'th') return LangThEn.th.TUE
    if(day == 'WED ' && lang == 'th') return LangThEn.th.WED
    if(day == 'THU ' && lang == 'th') return LangThEn.th.THU
    if(day == 'FRI ' && lang == 'th') return LangThEn.th.FRI
    if(day == 'SAT ' && lang == 'th') return LangThEn.th.SAT
    if(day == 'SUN ' && lang == 'th') return LangThEn.th.SUN
  }

  const [getLocalLang, setLocalLang] = useLocalStorage('lang', 'en')
  const [getTable, setTable] = useLocalStorage('table', 'grid')

  const handleChangeLang = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalLang(e.target.checked ? 'th' : 'en')
  }
  const handleChangeTabke = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTable(e.target.checked ? 'table' : 'grid')
  }

  return (
    <>
      <Card 
        variant={"outline"}
      >
        <CardBody>
          <FormControl as={SimpleGrid} columns={{ base: 2, lg: 4 }}>
            <FormLabel htmlFor='isChecked'>Switch Lang:</FormLabel>
            <Switch onChange={(e) => handleChangeLang(e) } defaultChecked={getLocalLang == 'th' ? true : false} />
            <FormLabel htmlFor='isChecked'>Switch Table:</FormLabel>
            <Switch onChange={(e) => handleChangeTabke(e) } defaultChecked={getTable == 'table' ? true : false} />
          </FormControl>
        </CardBody>
      </Card>

      { getTable == 'table' ? (
        <>
          <TableContainer pt="2" dropShadow={"3px"}>
            <Table
              variant='striped'
              size='sm'
            >
              <Thead>
                <Tr>
                  <Th> { getLocalLang == 'en' ? LangThEn.en.DAY : LangThEn.th.DAY } </Th>
                  <Th> { getLocalLang == 'en' ? LangThEn.en.TIME : LangThEn.th.TIME } </Th>
                  <Th> { getLocalLang == 'en' ? LangThEn.en.SUBJECT_CODE : LangThEn.th.SUBJECT_CODE } </Th>
                  <Th> { getLocalLang == 'en' ? LangThEn.en.SUBJECT_NAME : LangThEn.th.SUBJECT_NAME } </Th>
                  <Th> { getLocalLang == 'en' ? LangThEn.en.TEACHER : LangThEn.th.TEACHER } </Th>
                </Tr>
              </Thead>
              <Tbody>
                {GroupCourse?.map((item, index) => (
                  <Tr key={index}>
                    <Td> { getLocalLang == 'en' ? haddleDayOfWeek(item.day_w, 'en') : haddleDayOfWeek(item.day_w, 'th') } </Td>
                    <Td> { item.time_from } - {item.time_to} </Td>
                    <Td> { item.subject_code } </Td>
                    <Td> { getLocalLang == 'en' ? item.subject_name_en : item.subject_name_th } </Td>
                    <Td> { getLocalLang == 'en' ? item.teacher_name_en : item.teacher_name } </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <SimpleGrid columns={[1, 1, 1, 2, 2]} spacing={2} pt="2" dropShadow={"3px"}>
          {
            GroupCourse?.map((item, index) => (
              <Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline' key={index}>
                <Box bg={cScheme(item.day_w)+".300"} w='20px' p={0} color='white' />
                <Stack>
                  <CardBody>
                    <Heading size='sm'>
                        {item.subject_code}
                        {" "}<Badge colorScheme='blue'>{item.section_code}</Badge>
                        {" "}{ getLocalLang == 'en' ? <Badge colorScheme={cScheme(item.day_w)}>{item.section_type_en}</Badge> : <Badge colorScheme={cScheme(item.day_w)}>{item.section_type_th}</Badge> }
                    </Heading>
                    <Text>{ getLocalLang == 'en' ? item.subject_name_en : item.subject_name_th }</Text>
                    <Text>{ getLocalLang == 'en' ? item.teacher_name_en : item.teacher_name }</Text>
                    <Text>
                        <Badge colorScheme={cScheme(item.day_w)}> {
                          getLocalLang == 'en' ? haddleDayOfWeek(item.day_w, 'en') : haddleDayOfWeek(item.day_w, 'th')
                        } </Badge>
                        {" "}<Badge colorScheme='purple'>{item.time_from} - {item.time_to}</Badge>
                        {" "}<Badge colorScheme='purple'>{item.room_name_en}</Badge>
                    </Text>
                  </CardBody>
                </Stack>
              </Card>
            ))
          }
        </SimpleGrid>
      ) }
      </>
  );
};

const CardTable: React.FC<{GroupCourse: ResultGroupCourse[] | undefined}> = ({GroupCourse}) => {
  const [isData, setIsData] = useState<boolean>(false)
  useEffect(() => {
    if(GroupCourse != undefined){
      setIsData(true)
    }
  }, [GroupCourse])


  if(isData) {
    return (
      <>
        <CardTime GroupCourse={GroupCourse} />
      </>
    );
  }else{
    return (
      <>
      </>
    );
  }
}

export default CardTable
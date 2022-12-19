import { Box,  Button,  Card, Text, CardBody, Heading, SimpleGrid, Stack, Badge, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Spacer } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { ResultGroupCourse } from "../../interface/global_interface";
import { useLocalStorage } from "usehooks-ts";
import { DownloadIcon, CheckIcon } from '@chakra-ui/icons'

import domSave from 'dom-to-image';
const CardTime: React.FC<{GroupCourse: ResultGroupCourse[] | undefined}> = ({GroupCourse}) => {

  const ref_to = useRef<HTMLDivElement>(null)
  const ref_lang = useRef<HTMLButtonElement>(null)
  const ref_table = useRef<HTMLButtonElement>(null)

  const handleSave = (e: HTMLDivElement) => {
    domSave.toPng(e,
      {
        bgcolor: '#1A202C',
        quality: 1,
        style: {
          width: '100%',
          height: '100%',
        }
      }
      ).then((dataUrl: any) => {
      const link = document.createElement('a');
      link.download = 'TimeTable_KU-ASK.png';
      link.href = dataUrl;
      link.click();
    });
  }

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

  useEffect(() => {
    // set text ref_table
    if(getTable == 'table') {
      ref_table.current!.innerHTML = 'Grid'
    } else {
      ref_table.current!.innerHTML = 'Table'
    }

    if(getLocalLang == 'th') {
      ref_lang.current!.innerHTML = 'EN'
    } else {
      ref_lang.current!.innerHTML = 'TH'
    }
  }, [getTable, getLocalLang])

  const handleChangeLang = () => {
    setLocalLang(getLocalLang == 'th' ? 'en' : 'th')
  }
  const handleChangeTabke = () => {
    setTable(getTable == 'table' ? 'grid' : 'table')
  }

  return (
    <>
      <Card variant={"outline"} >
        <CardBody p={2}>
          <Stack direction='row' spacing={1}>
            <Button leftIcon={<CheckIcon />} colorScheme='linkedin' variant='outline' ref={ref_lang} onClick={() => handleChangeLang()} >
              Lang
            </Button>
            <Button leftIcon={<CheckIcon />} colorScheme='facebook' variant='outline' ref={ref_table} onClick={() => handleChangeTabke()} >
              Table
            </Button>
            <Spacer />
            <Button rightIcon={<DownloadIcon />} colorScheme='green' variant='outline' onClick={() => {
              if(!ref_to.current != null) {
                // @ts-ignore
                handleSave(ref_to?.current)
              }
            }}>
              Download
            </Button>
          </Stack>
        </CardBody>
      </Card>

      <div ref={ref_to}>
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
      </div>

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
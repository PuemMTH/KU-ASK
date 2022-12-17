import { Box,  Button,  Card, Text, CardBody,  CardFooter,  CardHeader,  chakra, Container, Flex,  Heading,  List,  ListIcon,  ListItem,  SimpleGrid,  Stack,  Stat,  StatArrow,  StatGroup,  StatHelpText,  StatLabel,  StatNumber,  useColorModeValue, VStack, Avatar, Badge, Table, Image, FormLabel, Switch, FormControl } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { MdCheckCircle, MdSettings } from "react-icons/md";
import tw from "twin.macro";
import { ResultGroupCourse } from "../../interface/global_interface";
import html2canvas from 'html2canvas';
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

  const [getLocalLang, setLocalLang] = useLocalStorage('lang', 'en')

  const handleChangeLang = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalLang(e.target.checked ? 'th' : 'en')
  }

  return (
    <>
      <Card >
        <CardBody>
          <FormControl display='flex' alignItems='center'>
            <FormLabel htmlFor='sw_lag' mb='0'>
              Switch Language
            </FormLabel>
            <Switch 
              id='sw_lag'
              colorScheme='green'
              onChange={(e) => {
                handleChangeLang(e)
              }}
              defaultChecked={getLocalLang == 'th' ? true : false}
            />
          </FormControl>
        </CardBody>
      </Card>
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
                    {" "}{
                      getLocalLang == 'en' ? <Badge colorScheme={cScheme(item.day_w)}>{item.section_type_en}</Badge> : <Badge colorScheme={cScheme(item.day_w)}>{item.section_type_th}</Badge>
                    }
                  </Heading>
                  <Text>
                      {
                        getLocalLang == 'en' ? item.subject_name_en : item.subject_name_th
                      }
                  </Text>
                  <Text>
                      {
                        getLocalLang == 'en' ? item.teacher_name_en : item.teacher_name
                      }
                  </Text>
                  <Text>
                      <Badge colorScheme={cScheme(item.day_w)}> {item.day_w} </Badge> {" "}
                      <Badge colorScheme='purple'>{item.time_from} - {item.time_to}</Badge> {" "}
                      <Badge colorScheme='purple'>{item.room_name_en}</Badge>
                  </Text>
                </CardBody>
              </Stack>
            </Card>
          ))
        }
      </SimpleGrid>
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
import { Box,  Button,  Card, Text, CardBody,  CardFooter,  CardHeader,  chakra, Container, Flex,  Heading,  List,  ListIcon,  ListItem,  SimpleGrid,  Stack,  Stat,  StatArrow,  StatGroup,  StatHelpText,  StatLabel,  StatNumber,  useColorModeValue, VStack, Avatar, Badge, Table } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { MdCheckCircle, MdSettings } from "react-icons/md";
import tw from "twin.macro";
const staticTime: string[] = ["Day/Time", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00" ];
const staticDay: string[] = [ "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN" ];

interface courseInf {
  section_id: number;
  groupheader: string;
  weekstartday: string;
  weekendday: string;
  std_id: string;
  subject_code: string;
  subject_name_th: string;
  subject_name_en: string;
  section_code: string;
  section_type: string;
  section_type_th: string;
  section_type_en: string;
  student_status_code: string;
  std_status_th: string;
  std_status_en: string;
  teacher_name: string;
  teacher_name_en: string;
  day_w_c: string;
  time_from: string;
  time_to: string;
  day_w: string;
  room_name_th: string;
  room_name_en: string;
  time_start: number;
}

const CardTime: React.FC<{ time: string[]; day: string[] }> = ({ time, day }) => {
  const ref_area = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const area = ref_area.current;
    let INDEX_DAY = {
      "MON": 0,
      "TUE": 26,
      "WED": 52,
      "THU": 78,
      "FRI": 104,
      "SAT": 130,
      "SUN": 156
    }
    if (area) {
      const divs = area.querySelectorAll("div");
      divs.forEach((div, index) => {
        if (index == INDEX_DAY["MON"] + 2) {
          div.style.backgroundColor = "red";
          div.style.color = "white";
        }
      })

    }
  }, [1]);

  return (
    <>
        <Stack spacing='2'>
                <Card variant={"outline"} align='left'>
                  <CardBody>
                      <SimpleGrid columns={13} spacing={0} border="1px">
                      {time.map((time, index3) => (
                        <Box key={index3} p={2} >
                          <Text fontSize='sm'>{time}</Text>
                        </Box>
                      ))}
                    </SimpleGrid>
                    <SimpleGrid columns={26} spacing={0} border="0px" ref={ref_area} >
                      {day.map((time, index2) => (
                        <>
                          <Box key={index2} p={2}>
                            <Text fontSize='sm'>{time}</Text>
                          </Box>
                          {
                            [...Array(25)].map((_, index) => (
                              <Box key={index} p={2} borderBlockEnd={"1px"} borderColor="whatsapp.800" >
                                <Text fontSize='sm'></Text>
                              </Box>
                            ))
                          }
                        </>
                      ))}
                    </SimpleGrid>
                  </CardBody>
                </Card>
      </Stack>
    </>
  );
};

export default function BasicStatistics() {
  return (
    <>
      <CardTime time={staticTime} day={staticDay} />
    </>
  );
}

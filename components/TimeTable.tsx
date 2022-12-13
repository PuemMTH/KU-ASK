import { Box,  Button,  Card, Text, CardBody,  CardFooter,  CardHeader,  chakra, Container, Flex,  Heading,  List,  ListIcon,  ListItem,  SimpleGrid,  Stack,  Stat,  StatArrow,  StatGroup,  StatHelpText,  StatLabel,  StatNumber,  useColorModeValue, VStack, Avatar, Badge } from "@chakra-ui/react";
import { MdCheckCircle, MdSettings } from "react-icons/md";
import tw from "twin.macro";
const staticTime: string[] = ["Day/Time", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00" ];
const staticDay: string[] = [ "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "Sun" ];
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
  return (
    <>
        <Stack spacing='2'>
          <Card variant={"outline"} align='left'>
            <CardHeader>
              <Heading size='sm'> 
                กำลังอยู่ในช่วงการพัฒนา
              </Heading>
            </CardHeader>
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

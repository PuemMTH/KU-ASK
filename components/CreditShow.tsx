import { Image, Box,  Button,  Card, Text, CardBody,  CardFooter,  CardHeader,  chakra, Container, Flex,  Heading,  List,  ListIcon,  ListItem,  SimpleGrid,  Stack,  Stat,  StatArrow,  StatGroup,  StatHelpText,  StatLabel,  StatNumber,  useColorModeValue, VStack, Avatar, Badge } from "@chakra-ui/react";

import Link from 'next/link'

const CardTime: React.FC = () => {

  const Credits = [
    {
      name: "KU TABLE",
      url: "https://ku-table.vercel.app",
      img: "https://ku-table.vercel.app/img/ku-table.c02b1676.jpg"
    },
    {
      name: "KU TABLE 2",
      url: "https://ku-table2.vercel.app",
      img: "data:image/jpeg;base64,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"
    }
  ]

  const CardCode = [
    {
      name: "Github",
      url: "https://github.com/PuemMTH/KU-ASK",
      img: "https://avatars.githubusercontent.com/u/59855164?s=400&u=025e910a15293edb8a5cea93badc8ee01ce0784d&v=4"
    }
  ]
  return (
    <>
        <Stack spacing='2'>
          <Card variant={"outline"} align='left'>
            <CardBody>
            <Stack spacing='2'>

            <Heading size='md'>Github</Heading>
              <Text py='2'>
                Source Code ของโปรแกรมนี้
              </Text>
              {
                CardCode.map((credit, index) => {
                  return (
                    <Card
                      direction={{ base: 'column', sm: 'row' }}
                      overflow='hidden'
                      variant='outline'
                      key={index}
                    >
                      <Image
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '200px' }}
                        src={credit.img}
                        alt='Caffe Latte'
                      />
                      <Stack>
                        <CardBody>
                          <Heading size='md'>{credit.name}</Heading>
                          <Text py='2'>
                              {credit.url}
                          </Text>
                        </CardBody>
                        <CardFooter>
                          <Button variant='solid' colorScheme='blue'>
                            <Link href={credit.url}>OPEN</Link>
                          </Button>
                        </CardFooter>
                      </Stack>
                    </Card>
                  )
                })
              }

              <Heading size='md' pt="3">Credits</Heading>
              <Text py='2'>
                ส่วนช่วยเหลือและอ้างอิงมาทำการพัฒนาโปรแกรมนี้
              </Text>
              {
                Credits.map((credit, index) => {
                  return (
                    <Card
                      direction={{ base: 'column', sm: 'row' }}
                      overflow='hidden'
                      variant='outline'
                      key={index}
                    >
                      <Image
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '200px' }}
                        src={credit.img}
                        alt='Caffe Latte'
                      />

                      <Stack>
                        <CardBody>
                          <Heading size='md'>{credit.name}</Heading>
                          <Text py='2'>
                              {credit.url}
                          </Text>
                        </CardBody>
                        <CardFooter>
                          <Button variant='solid' colorScheme='blue'>
                            <Link href={credit.url}>OPEN</Link>
                          </Button>
                        </CardFooter>
                      </Stack>
                    </Card>
                  )
                })
              }
            </Stack>
            </CardBody>
          </Card>
      </Stack>
    </>
  );
};

export default function BasicCardTime() {
  return (
    <>
      <CardTime />
    </>
  );
}

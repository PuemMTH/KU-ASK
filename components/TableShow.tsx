import React, { useState, useEffect, ReactNode } from 'react';
import { Text, Table, TableContainer, Tbody, Td, Th, Thead, Tr, TableCaption, Select, Button, useToast, AccordionItem, Accordion, AccordionButton, AccordionIcon, AccordionPanel, Box, Card, CardBody, List, ListIcon, ListItem, Tfoot, Container, Progress, Skeleton, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react';
import {MdSettings} from 'react-icons/md';
const TableShow = ({ data, _children }: any) => {
    const [mock, setMock] = useState(data);
    const [section, setSection] = useState<string[]>([]);
    const [group, setGroup] = useState<string[]>([]);

    useEffect(() => {
        setMock(data);
        if(mock != undefined){
            setSection(Array.from(new Set( mock.map((item: any) => {
                if(item.section != 'ไม่จัดหมวดหมู่' && item.section != ''){
                    return item.section;
                }else{
                    return 'ไม่จัดหมวดหมู่';
                }
            }))));

            setGroup(Array.from(new Set( mock.map((item: any) => {
                if(item.group_ != 'ไม่จัดหมวดหมู่' && item.group_ != ''){
                    return item.group_;
                }else{
                    return 'ไม่จัดหมวดหมู่';
                }
            }))));
        }
    }, [mock, data]);


    interface CreditSumGroup {
        [key: string]: number;
    }

    // [{group: 'A', credit: 3}, {group: 'B', credit: 3}]
    

    const TableData = ({dataClean, groupClean }: any) => {

        // sum credit
        const [sumCredit, setSumCredit] = useState(0);
        const [sumCreditGroup, setSumCreditGroup] = useState([]);
        const [creditSumGroup, setCreditSumGroup] = useState<CreditSumGroup[]>([]);

        useEffect(() => {
            if(dataClean != undefined){
                setSumCredit(dataClean.reduce((a: any, b: any) => a + (b.credit || 0), 0));
                let CreditGroup = dataClean.map((item: any) => {
                    return item.group_
                })
                let setCreditGroup = Array.from(new Set(CreditGroup));
                let sumCreditGroup = setCreditGroup.map((item: any) => {
                    let sum = 0;
                    dataClean.forEach((element: any) => {
                        if(element.group_ == item){
                            sum += element.credit;
                        }
                    });
                    return {group: item, credit: sum};
                })
                console.log(sumCreditGroup);
                setCreditSumGroup(sumCreditGroup);
            }
        }, [dataClean])

        return (
                <TableContainer>
                    <Table variant='unstyled' colorScheme='teal'>
                        <Thead>
                            <Tr>
                                <Th>subject_code</Th>
                                <Th>subject_name</Th>
                                <Th>grouping_data</Th>
                                <Th>credit</Th>
                                <Th>section</Th>
                                <Th>group</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                dataClean?.map((item: {
                                        credit: number; 
                                        subject_code: string;
                                        subject_name_th: string;
                                        grouping_data: string;
                                        section: string;
                                        group_: string;
                                    }, 
                                    index: React.Key | null | undefined) => {
                                    return (
                                        <Tr key={index}>
                                            <Td>{item.subject_code}</Td>
                                            <Td>{item.subject_name_th}</Td>
                                            <Td>{item.grouping_data}</Td>
                                            <Td>{item.credit}</Td>
                                            <Td>{item.section}</Td>
                                            <Td>{item.group_}</Td>
                                        </Tr>
                                    )
                                })
                            }

                        </Tbody>
                    </Table>
                    <Card my="2" variant='outline'>
                        <CardBody>
                            {
                                creditSumGroup.map((item: any, index: React.Key | null | undefined) => {
                                    return (
                                        <List spacing={3} key={index}>
                                            <ListItem>
                                                <ListIcon as={MdSettings} color="green.500" />
                                                {item.group} : {item.credit} หน่วย
                                            </ListItem>
                                        </List>
                                    )
                                })
                            }
                            <Text>รวมทั้งหมด : {sumCredit} หน่วยกิต</Text>
                        </CardBody>
                    </Card>
                </TableContainer>
        )
    }
    return (
        <>
            <Accordion defaultIndex={[0]} allowMultiple >
                {
                    section.length > 1 ? (
                        section.map((item: string, index: React.Key | null | undefined) => {
                            if(item != 'ไม่จัดหมวดหมู่'){
                                return (
                                    <AccordionItem key={index}>
                                        <h2>
                                        <AccordionButton>
                                            <Box flex='1' textAlign='left'>
                                                {item}
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            <TableData
                                                dataClean={mock.filter((itemFilter: any) => itemFilter.section == item)}
                                                groupClean={mock.filter((itemFilter: any) => 
                                                    {
                                                        if(itemFilter.section == item){
                                                            return itemFilter.group_;
                                                        }
                                                    }
                                                )}
                                            />
                                        </AccordionPanel>
                                    </AccordionItem>
                                )
                            }
                        })
                    ) : (
                        <AccordionItem>
                            <h2>
                            <AccordionButton>
                                <Box flex='1' textAlign='left'>
                                    Note: ไม่มีข้อมูล
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <List spacing={3}>
                                    <ListItem>
                                        <ListIcon as={MdSettings} color='green.500' />
                                        คุณยังไม่ได้ Sync ข้อมูล
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={MdSettings} color='green.500' />
                                        หรือคุณ Sync แล้วแต่ยังไม่มีข้อมูล ให้แก้ไขข้อมูล
                                    </ListItem>
                                </List>
                            </AccordionPanel>
                        </AccordionItem>
                    )
                }
            </Accordion>
        </>
    );
}

export default TableShow;
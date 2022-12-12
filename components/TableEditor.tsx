import React, { useState, useEffect, ReactNode } from 'react';
import { Text, Table, TableContainer, Tbody, Td, Th, Thead, Tr, TableCaption, Select, Button, useToast, Tab, TabList, TabPanel, TabPanels, Tabs, Flex } from '@chakra-ui/react';
import { useEffectOnce, useLocalStorage, useReadLocalStorage } from 'usehooks-ts';
import { UsersSubJectInventory } from '../interface/global_interface';
import AxiosServiceFrontend from '../services/faxios.service';
import TableShow from './TableShow';

interface Dict {
    [key: string]: string[];
}
interface ReverdDict {
    [key: string]: string;
}

const TableEditor = ({ data, setData, _children }: any) => {
    const [mock, setMock] = useState(data.data);
    const accesstoken = useReadLocalStorage<string | undefined>("accesstoken");
    const toast = useToast()
    let FAxios = new AxiosServiceFrontend();

    useEffect(() => {
        setMock(data.data);
    }), [mock];
    
    const dict_value: Dict = {
        "": ["ไม่จัดหมวดหมู่", "ไม่จัดหมวดหมู่"],
        "01": ["หมวดวิชาศึกษาทั่วไป", "กลุ่มสาระอยู่ดีมีสุข"],
        "02": ["หมวดวิชาศึกษาทั่วไป", "กลุ่มสาระศาสตร์แห่งผู้ประกอบการ"],
        "03": ["หมวดวิชาศึกษาทั่วไป", "กลุ่มสาระภาษากับการสื่อสาร"],
        "04": ["หมวดวิชาศึกษาทั่วไป", "กลุ่มสาระพลเมืองไทยและพลเมืองโลก"],
        "05": ["หมวดวิชาศึกษาทั่วไป", "กลุ่มสาระสุนทรียศาสตร์"],
        "06": ["หมวดวิชาศึกษาทั่วไป", "อื่นๆ"],
        "11": ["หมวดวิชาเฉพาะ", "วิชาแกน"],
        "12": ["หมวดวิชาเฉพาะ", "วิชาเฉพาะบังคับ"],
        "13": ["หมวดวิชาเฉพาะ", "เฉพาะเลือก"],
        "21": ["หมวดวิชาเสรี", "เสรี"]
    }

    const dict_key: ReverdDict = {
        "ไม่จัดหมวดหมู่": "",
        "กลุ่มสาระอยู่ดีมีสุข": "01",
        "กลุ่มสาระศาสตร์แห่งผู้ประกอบการ": "02",
        "กลุ่มสาระภาษากับการสื่อสาร": "03",
        "กลุ่มสาระพลเมืองไทยและพลเมืองโลก": "04",
        "กลุ่มสาระสุนทรียศาสตร์": "05",
        "อื่นๆ": "06",
        "วิชาแกน": "11",
        "วิชาเฉพาะบังคับ": "12",
        "เฉพาะเลือก": "13",
        "เสรี": "21"
    }
    
    const handleSave = () => {
        FAxios.axiosInstance.post('/sub/update_inv_users', { token_verify: accesstoken, update_subject: mock }).then((res) => {
            if(res.status === 200){
                toast({
                    title: "บันทึกสำเร็จ",
                    description: "บันทึกข้อมูลสำเร็จ",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
            }else{
                toast({
                    title: "บันทึกไม่สำเร็จ",
                    description: "บันทึกข้อมูลไม่สำเร็จ",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
            }
        })
    }
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>, index: React.Key | null | undefined ) => {
        try {
            const { value } = e.target;
            let section: string = dict_value[value][0]
            let group_: string = dict_value[value][1]
            const temp = [...mock];
            index = Number(index);
            temp[index].group_ = group_;
            temp[index].section = section;
            setMock(temp);
            handleSave();
            // console.log(temp);
        } catch {
            toast({
                title: 'An error occurred.',
                description: "Please try again later.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    return (
        <>
            <Tabs variant='solid-rounded' colorScheme='green'>
              <TabList>
                <Tab>ตาราง</Tab>
                <Tab>แก้ไข</Tab>
                <Tab ml='auto'></Tab>
                <_children />
              </TabList>
              <TabPanels>
                <TabPanel>
                    <TableShow data={mock} />
                </TabPanel>
                <TabPanel>
                    <TableContainer>
                        <Table variant='striped' colorScheme='teal'>
                            <TableCaption>Imperial to metric conversion factors</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>subject_code</Th>
                                    <Th>subject_name</Th>
                                    <Th>grouping_data</Th>
                                    <Th>credit</Th>
                                    <Th>sectionGroup</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    mock?.map((item: {
                                            credit: number; 
                                            subject_code: string;
                                            subject_name_th: string;
                                            grouping_data: string;
                                            group_: string;
                                        }, 
                                        index: React.Key | null | undefined) => {
                                        return (
                                            <Tr key={index}>
                                                <Td>{item.subject_code}</Td>
                                                <Td>{item.subject_name_th}</Td>
                                                <Td>{item.grouping_data}</Td>
                                                <Td>{item.credit}</Td>
                                                <Td>
                                                    <Select
                                                        placeholder='ยังไม่ได้เลือก'
                                                        onChange={(e) => {
                                                            handleChange(e, index)
                                                            // console.log(item.group_)
                                                        }}
                                                        value={dict_key[item.group_]}
                                                    >
                                                        <option value='01'>หมวดวิชาศึกษาทั่วไป - กลุ่มสาระอยู่ดีมีสุข</option>
                                                        <option value='02'>หมวดวิชาศึกษาทั่วไป - กลุ่มสาระศาสตร์แห่งผู้ประกอบการ</option>
                                                        <option value='03'>หมวดวิชาศึกษาทั่วไป - กลุ่มสาระภาษากับการสื่อสาร</option>
                                                        <option value='04'>หมวดวิชาศึกษาทั่วไป - กลุ่มสาระพลเมืองไทยและพลเมืองโลก</option>
                                                        <option value='05'>หมวดวิชาศึกษาทั่วไป - กลุ่มสาระสุนทรียศาสตร์</option>
                                                        <option value='06'>หมวดวิชาศึกษาทั่วไป - อื่นๆ</option>
                                                        <option value='11'>หมวดวิชาเฉพาะ - วิชาแกน</option>
                                                        <option value='12'>หมวดวิชาเฉพาะ - วิชาเฉพาะบังคับ</option>
                                                        <option value='13'>หมวดวิชาเฉพาะ - เฉพาะเลือก</option>
                                                        <option value='21'>หมวดวิชาเสรี</option>
                                                    </Select>
                                                </Td>
                                            </Tr>
                                        )
                                    })
                                }
                            </Tbody>
                        </Table>
                    </TableContainer>
                </TabPanel>
              </TabPanels>
            </Tabs>
        </>
    );
}

export default TableEditor;
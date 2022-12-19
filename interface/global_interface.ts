export interface ResultGroupCourse {
    day: string;
    section_id: number;
    groupheader: string;
    weekstartday: Date;
    weekendday: Date;
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

export interface jwt_getGroupCourse{
    token_verify: string,
    academicYear: string,
    semester: string
}

export interface ResultGrade {
    academicYear: string;
    gpa:          number;
    cr:           number;
    grade:        UsersSubJectInventory[];
}
export interface UsersSubJectInventory {
    std_code: string,
    std_id: string,
    subject_code: string,
    subject_name_th: string,
    subject_name_en: string,
    credit: number,
    grade: string,
    registration_year: number,
    registration_semester: number,
    rownum: number,
    grouping_data: string,
    section: string,
    group_: string,
    gpa: number,
    cr: number,
}

// end

export interface UsersStatus {
    user_id: string;
    user_inventory: UsersSubJectInventory[];
    user_log_count: number;
    user_firstLogin: boolean;
    user_log_time: Date;
}

export interface checkGradesMain {
    code:    string;
    results: checkGradesResult[];
    cache:   boolean;
}

export interface checkGradesResult {
    academicYear: string;
    gpa:          number;
    cr:           number;
    grade:        checkGradesGrade[];
}

export interface checkGradesGrade {
    std_code:              string;
    std_id:                string;
    subject_code:          string;
    subject_name_th:       string;
    subject_name_en:       string;
    credit:                number;
    grade:                 string;
    registration_year:     number;
    registration_semester: number;
    rownum:                string;
    grouping_data:         string;
    gpa:                   number;
    cr:                    number;
}

// 

export interface ReqLogin {
    username: string
    password: string
}
export interface RoleMenu {
    menuId: number;
    menuNameTh: string;
    menuUrl?: string;
    menuIcon?: string;
    parentMenuId: number;
    menuType: number;
}

export interface jwt_Decoded {
    username:      string;
    usertype:      string;
    idcode:        string;
    stdid:         string;
    firstNameEn:   string;
    firstNameTh:   string;
    lastNameEn:    string;
    lastNameTh:    string;
    titleTh:       string;
    roleId:        null;
    stdStatusCode: string;
    iat:           number;
    exp:           number;
}

export interface jwt_verify {
    token_verify: string,
}

export interface req_inv_token {
    token_verify: string,
    add_subject: UsersSubJectInventory[],
}

export interface update_inv_token {
    token_verify: string,
    update_subject: UsersSubJectInventory[],
}

export interface LoginInF {
    code: string;
    message: string;
    accesstoken: string;
    renewtoken: string;
    user: User;
    cache: boolean;
}

export interface User {
    loginName: string;
    userType: string;
    idCode: string;
    titleTh: string;
    titleEn: string;
    firstNameTh: string;
    firstNameEn: string;
    middleNameTh: any;
    middleNameEn: any;
    lastNameTh: string;
    lastNameEn: string;
    avatar: string;
    gender: string;
    student: Student;
    roleMenus: RoleMenu[];
}

export interface Student {
    loginName: string;
    stdId: string;
    stdCode: string;
    titleTh: string;
    titleEn: string;
    firstNameTh: string;
    middleNameTh: any;
    lastNameTh: string;
    firstNameEn: string;
    middleNameEn: any;
    lastNameEn: string;
    copenId: string;
    copenNameTh: string;
    copenNameEn: string;
    campusCode: string;
    campusNameTh: string;
    campusNameEn: string;
    facultyCode: string;
    facultyNameTh: string;
    facultyNameEn: string;
    departmentCode: string;
    departmentNameTh: string;
    departmentNameEn: string;
    majorCode: string;
    majorNameTh: string;
    majorNameEn: string;
    nationCode: string;
    nationalityNameTh: string;
    nationalityNameEn: string;
    studentStatusCode: string;
    studentStatusNameTh: string;
    studentStatusNameEn: string;
    studentTypeCode: string;
    studentTypeNameTh: string;
    studentTypeNameEn: string;
    edulevelCode: string;
    edulevelNameTh: string;
    edulevelNameEn: string;
    studentYear: string;
    advisorId: string;
    advisorNameTh: string;
    advisorNameEn: string;
    positionTh: string;
    email: string;
    mobileNo: string;
}


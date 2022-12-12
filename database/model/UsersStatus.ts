import mongoose from "mongoose";
import { UsersStatus } from "../../interface/global_interface";

const UsersStatus = new mongoose.Schema<UsersStatus>({
    user_id: String,
    user_inventory: [{
        std_code: String,
        std_id: String,
        subject_code: String,
        subject_name_th: String,
        subject_name_en: String,
        credit: Number,
        grade: String,
        registration_year: Number,
        registration_semester: Number,
        rownum: Number,
        grouping_data: String,
        section: { type: String, default: "ศึกษาทั่วไป"},
        group_: { type: String, default: "ศึกษาทั่วไป"},
        gpa: Number,
        cr: Number,
    }],
    user_log_count: Number,
    user_log_time: Date,
    user_firstLogin: Boolean,
})

export default mongoose.models.UsersStatus || mongoose.model("UsersStatus", UsersStatus);
import mongoose from "mongoose";

const SubjectInfo = new mongoose.Schema({
    sub_code : String,
    sub_id : String,
    section : String,
    group_ : String,
    subject_group : String,
    subgroup : String,
    subject_name : String,
    credit : Number,
    affiliation : String,
    edition : String,
    course_id : String
})

export default mongoose.models.SubjectInfo || mongoose.model("SubjectInfo", SubjectInfo);
const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    employeeName:String,
    employeeLocation:String,
    employeePosition:String,
    employeeSalary:Number
})
const employeeData=new mongoose.model('employee',employeeSchema)
module.exports=employeeData

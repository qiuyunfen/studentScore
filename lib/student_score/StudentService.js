/**
 * Created by qiuyf on 17-4-7.
 */
let System = require('./System');

let system = new System();
class StudentService {
    constructor() {
    }
    handAddStudent(studentInfo) {
        return system.handAddStudent(studentInfo);
    }
    printStudentInfo(studentNos) {
        return system.printStudentInfo(studentNos);
    }
    getAllClass() {
        return system.getAllClass();
    }
}

module.exports = StudentService;
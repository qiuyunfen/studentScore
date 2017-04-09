let Student = require('./Student');
let stuModel = require('./stuModel');
let stumodel = new stuModel();

const HINT_INFO = {
    MAIN_COMMAND: '1.添加学生\n2.生成成绩单\n3.退出\n请输入你的选择(1-3)',
    ADDSTUDENT_HINT: '请输入学生信息（格式：姓名，学号，民族，班级，学科：成绩，...），按回车提交：',
    ADDSTUDENT_WRONGFORMAT_HINT: '请按正确的格式输入（格式：姓名，学号，学科：成绩，...）',
    ADDSTUDENT_SUCCESS_HINT: '添加学生成功',
    PRINTSCORE_HINT: '请输入要打印的学生的学号：（格式：学号，学号...）',
    PRINTSCORE_WRONGFORMAT_HINT: '请按正确的格式输入（格式：学号，学号，...）',
    EXIT_SYSTEM:'系统退出'
}

const COMMAND = {
    STUDENTADD: '1',
    SCOREPRINT: '2',
    EXITSYSTEM: '3'
}

const STATUS = {
    MAIN_DEFAULT: 0,
    ADD_STUDENT: 1,
    PRINT_SCORE: 2,
    EXIT_SYSTEM: 3
}


class System {
    constructor() {
        this.status = STATUS.MAIN_DEFAULT;
    }
    getAllClass() {
        return stumodel.getAllClass();
    }
    handInput(input) {
        if(this.status === STATUS.MAIN_DEFAULT) {
            if(input == COMMAND.STUDENTADD) {
                this.status = STATUS.ADD_STUDENT;
                return HINT_INFO.ADDSTUDENT_HINT;
            } else if(input === COMMAND.SCOREPRINT) {
                this.status = STATUS.PRINT_SCORE;
                return HINT_INFO.PRINTSCORE_HINT;
            } else if(input === COMMAND.EXITSYSTEM) {
                this.status = STATUS.EXIT_SYSTEM;
                return HINT_INFO.EXIT_SYSTEM;
            }
        } else if(this.status === STATUS.ADD_STUDENT) {
            let msg = this.handAddStudent(input);
            return msg;
        } else if(this.status === STATUS.PRINT_SCORE) {
            return this.printStudentInfo(input);
        } else {
            return HINT_INFO.EXIT_SYSTEM;
        }
    }

    handAddStudent(studentInfo) {
        let stu = this.resolveStudentInfo(studentInfo);
        if(Object.prototype.toString.call(stu) == '[object Object]') {
            let allCls = stumodel.addStudentScore(stu);
            this.status = STATUS.MAIN_DEFAULT;
            return {status: 1, msg: HINT_INFO.ADDSTUDENT_SUCCESS_HINT};
        } else {
            return {status: 0, msg: HINT_INFO.ADDSTUDENT_WRONGFORMAT_HINT};
        }
    }

    parseStudetenSubject(str) {
        return parseInt(str.split(':')[1]);
    }

    resolveStudentInfo(input) {
        let {name, stuNo, nation, classNo, math, chinese, english, program} = input;
        if(name == null || stuNo == null || nation == null || classNo == null ||
            math == null || chinese == null || english == null || program == null) {
            return HINT_INFO.ADDSTUDENT_WRONGFORMAT_HINT;
        } else {
            stuNo = parseInt(stuNo);
            classNo = parseInt(classNo);
            math = parseInt(math);
            chinese = parseInt(chinese);
            english = parseInt(english);
            program = parseInt(program);
            let student = new Student({
                name,
                stuNo,
                nation,
                classNo,
                math,
                chinese,
                english,
                program
            });
            return student;
        }
        return null;
    }


    printStudentInfo(studentNos) {
        let stuNos = this.resolveStudId(studentNos);
        if(Object.prototype.toString.call(stuNos) === '[object Array]') {
            let newcls = stumodel.getStudentScore(stuNos);
            return {newcls: newcls, status: 1};
        } else {
            return {status: 0};
        }
    }

    resolveStudId(stuIds) {
        let ids = stuIds.split(',');
        let res = [];
        for(let id of ids) {
            if(isNaN(id)) {
                return null;
            }
            res.push(parseInt(id));
        }
        return res;
    }


    printStuScore(newcl) {
        console.log(newcl);
        let stuStr = [];
        if(newcl.length === 0) {
            stuStr = HINT_INFO.ADDSTUDENT_SUCCESS_HINT;
        }

        for(let cl of newcl) {
            stuStr.push('成绩单');
            stuStr.push('姓名|数学|语文|英语|编程|平均分|总分');
            stuStr.push('========================');
            for(let stu of cl.stuScore) {
                stuStr.push(`${stu.student.name}|${stu.student.math}|${stu.student.chinese}|${stu.student.english}|${stu.student.program}|${stu.average}|${stu.sum}`);
            }
            stuStr.push('========================')
            stuStr.push(`全班总分平均分:${cl.average}`);
            stuStr.push(`全班总分中位数:${cl.middle}`);
        }
        return stuStr.join('\n') + '\n';
    }



}

module.exports = System;
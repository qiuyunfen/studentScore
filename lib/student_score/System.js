let Student = require('./Student');
let Class = require('./Class');

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
        this.allCls = [];
        this.status = STATUS.MAIN_DEFAULT;
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
            this.allCls = this.addStudentScore(stu, this.allCls);
            this.status = STATUS.MAIN_DEFAULT;
            let msg = HINT_INFO.ADDSTUDENT_SUCCESS_HINT + '\n' + HINT_INFO.MAIN_COMMAND;
            return msg;
        } else {
            return HINT_INFO.ADDSTUDENT_WRONGFORMAT_HINT;
        }
    }

    handAddStudentInfo(stu) {
        if(Object.prototype.toString.call(stu) == '[object Object]') {
            this.allCls = this.addStudentScore(stu, this.allCls);
            this.status = STATUS.MAIN_DEFAULT;
            let msg = HINT_INFO.ADDSTUDENT_SUCCESS_HINT + '\n' + HINT_INFO.MAIN_COMMAND;
            return msg;
        } else {
            return HINT_INFO.ADDSTUDENT_WRONGFORMAT_HINT;
        }
    }

    parseStudetenSubject(str) {
        return parseInt(str.split(':')[1]);
    }

    resolveStudentInfo(input) {
        let [name, stuNo, nation, classNo, math, chinese, english, program] = input.split(',');
        if(input.split(',').length < 8) {
            return HINT_INFO.ADDSTUDENT_WRONGFORMAT_HINT;
        } else {
            stuNo = parseInt(stuNo);
            classNo = parseInt(classNo);
            math = this.parseStudetenSubject(math);
            chinese = this.parseStudetenSubject(chinese);
            english = this.parseStudetenSubject(english);
            program = this.parseStudetenSubject(program);
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

    addStudentScore(student, allCls) {
        if(student !== null) {
            let stuScore =  student.calStuScore(student);

            let findcl = allCls.find(cl => cl.classId === stuScore.student.classNo);
            if(findcl) {
                let index = findcl.findStudent(stuScore);
                if(index !== -1) {
                    findcl.stuScore.splice(index, 1);
                }
                findcl.stuScore.push(stuScore);
                let avarage = findcl.calAverage(stuScore);
                let middle = findcl.calMiddle(stuScore);
                findcl.updateClass(avarage, middle);
            } else {
                this.addClass(allCls, stuScore);
            }
        }
        return allCls;
    }

    addClass(allClass, stuScore) {
        let newcl = new Class(stuScore.sum, stuScore.sum, stuScore.student.classNo);
        newcl.addStuScore(stuScore);
        allClass.push(newcl);
        return allClass;
    }

    printStudentInfo(studentNos) {
        let stuNos = this.resolveStudId(studentNos);
        if(Object.prototype.toString.call(stuNos) === '[object Array]') {
            let stuStr = this.getStudentScore(stuNos, this.allCls);
            this.status = STATUS.MAIN_DEFAULT;
            let msg = stuStr + '\n' + HINT_INFO.MAIN_COMMAND;
            return msg;
        } else {
            let msg = HINT_INFO.PRINTSCORE_WRONGFORMAT_HINT;
            return msg;
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
    getStudentScore(test, allcls) {
        let newcls = [];
        for(let stuno of test) {
            let findcl = allcls.find(cl => cl.stuScore.filter(stu => stu.student.stuNo == stuno).length > 0);
            if(findcl) {
                findcl.updateNewClass(newcls, stuno);
            }
        }
        let str = this.printStuScore(newcls);
        return str;
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
let Student = require('./Student');
let Class = require('./Class');

let allCls = [];
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const HINT_INFO = {
    MAIN_COMMAND: '1.添加学生\n2.生成成绩单\n3.退出\n请输入你的选择(1-3)',
    ADDSTUDENT_HINT: '请输入学生信息（格式：姓名，学号，民族，班级，学科：成绩，...），按回车提交：',
    ADDSTUDENT_WRONGFORMAT_HINT: '请按正确的格式输入（格式：姓名，学号，学科：成绩，...）',
    ADDSTUDENT_SUCCESS_HINT: '添加学生成功',
    PRINTSCORE_HINT: '请输入要打印的学生的学号：（格式：学号，学号...）',
    PRINTSCORE_WRONGFORMAT_HINT: '请按正确的格式输入（格式：学号，学号，...）',
}

const COMMAND = {
    STUDENTADD: '1',
    SCOREPRINT: '2',
}

entry();
function entry() {
    printSysInfo();
    rl.on('line', (input) => {
        if (input === COMMAND.STUDENTADD) {
            handAddStudent(HINT_INFO.ADDSTUDENT_HINT);
        } else if (input === COMMAND.SCOREPRINT) {
            printStudentInfo(HINT_INFO.PRINTSCORE_HINT);
        } else {
            process.exit(1);
        }
    })
}

function handAddStudent(output) {
    rl.question(output, (answer) => {
        let stu = resolveStudentInfo(answer);
        if(Object.prototype.toString.call(stu) == '[object Object]') {
            allCls = addStudentScore(stu, allCls);
            console.log(HINT_INFO.ADDSTUDENT_SUCCESS_HINT);
            console.log(allCls);
            printSysInfo();
            return;
        } else {
            handAddStudent(HINT_INFO.ADDSTUDENT_WRONGFORMAT_HINT);
        }
    })
}

function printStudentInfo(output) {
    rl.question(output, answer => {
        let stuNos = resolveStudId(answer);
        if(Object.prototype.toString.call(stuNos) === '[object Array]') {
            let stuStr = getStudentScore(stuNos, allCls);
            console.log(stuStr);
            printSysInfo();
        } else {
            printStudentInfo(HINT_INFO.PRINTSCORE_WRONGFORMAT_HINT);
        }
    })
}

function printSysInfo() {
    console.log(HINT_INFO.MAIN_COMMAND);
}

function addStudentScore(student, allCls) {
    if(student !== null) {
        let stuScore =  student.calStuScore(student);

        let findcl = allCls.find(cl => cl.classId === stuScore.student.classNo);
        if(findcl) {
            let index = findcl.findStudent(stuScore);
            if(index !== -1) {
                findcl.stuScore.splice(index, 1);
            }
            let avarage = findcl.calAverage(stuScore);
            let middle = findcl.calMiddle(stuScore);
            findcl.updateClass(stuScore, avarage, middle);
        } else {
            addClass(allCls, stuScore);
        }
    }
    return allCls;
}

function getStudentScore(test, allcls) {
    let newcls = [];
    for(let stuno of test) {
        let findcl = allcls.find(cl => cl.stuScore.filter(stu => stu.student.stuNo == stuno));
        if(findcl) {
            findcl.updateNewClass(newcls);
        }
    }
    let str = printStuScore(newcls);
    return str;
}

function parseStudetenSubject(str) {
    return parseInt(str.split(':')[1]);
}

function resolveStudentInfo(input) {
    let student_info = input.split(',');
    if(student_info.length < 8) {
        return HINT_INFO.ADDSTUDENT_WRONGFORMAT_HINT;
    } else {
        let name = student_info[0];
        let stuNo = parseInt(student_info[1]);
        let nation = student_info[2];
        let classNo = parseInt(student_info[3]);
        let math = parseStudetenSubject(student_info[4]);
        let chinese = parseStudetenSubject(student_info[5]);
        let english = parseStudetenSubject(student_info[6]);
        let program = parseStudetenSubject(student_info[7]);
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

function resolveStudId(stuIds) {
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

function printStuScore(newcl) {
    let stuStr = [];
    if(newcl.length === 0) {
        stuStr.push(HINT_INFO.ADDSTUDENT_SUCCESS_HINT);
    }
    for(let cl of newcl) {
        stuStr.push('成绩单');
        stuStr.push('姓名|数学|语文|英语|编程|平均分|总分');
        stuStr.push('========================');
        for(let stu of cl.stuScore) {
            stuStr.push(`${stu.student.name}|${stu.student.math}|${stu.student.chinese}|${stu.student.english}|${stu.student.program}|${stu.average}|${stu.middle}`);
        }
        stuStr.push('========================')
        stuStr.push(`全班总分平均分:${cl.average}`);
        stuStr.push(`全班总分中位数:${cl.middle}`);
    }
    return stuStr.join('\n');
}

function addClass(allClass, stuScore) {
    let newcl = new Class(stuScore.sum, stuScore.sum, stuScore.student.classNo);
    newcl.addStuScore(stuScore);
    allClass.push(newcl);
    return allClass;
}

module.exports = {resolveStudentInfo, addClass, resolveStudId, printStuScore};
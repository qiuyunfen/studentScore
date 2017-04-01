const StuScore = require('./StuScore');

class Student {
    constructor({ name, stuNo, nation, classno, math, chinese, english, program }) {
        this.name = name;
        this.stuNo = stuNo;
        this.nation = nation;
        this.classno = classno;
        this.math = math;
        this.chinese = chinese;
        this.english = english;
        this.program = program;
    }

    calStuScore(student) {
        let ave = 0;
        let sum = 0;
        sum = student.math + student.chinese + student.program + student.english;
        ave = sum / 4;
        return new StuScore(student, ave, sum);
    }

}

module.exports = Student;

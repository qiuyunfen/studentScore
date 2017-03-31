const Class = require('./Class');

class StuScore{
    constructor(student, average, sum) {
        this.student = student;
        this.average = average;
        this.sum = sum;
    }

    resetStuScore(cls) {
        for(let stu of cls.stuScore) {
            if(stu.student.stuno === this.student.stuno) {
                stu.student.math = this.student.math;
                stu.student.chinese = this.student.chinese;
                stu.student.english = this.student.english;
                stu.student.program = this.student.program;
                stu.average = this.average;
                stu.sum = this.sum;
                break;
            }
        }
        return cls;
    }


}

module.exports = StuScore;
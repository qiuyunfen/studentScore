const Class = require('./Class');

class StuScore{
    constructor(student, average, sum) {
        this.student = student;
        this.average = average;
        this.sum = sum;
    }

    resetStuScore(cls) {
        for(let stu of cls.stuScore) {
            if(stu.student.stuNo === this.student.stuNo) {
                Object.assign(stu, this);
            }
        }
        return cls;
    }

}

module.exports = StuScore;
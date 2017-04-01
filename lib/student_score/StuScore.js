const Class = require('./Class');

class StuScore{
    constructor(student, average, sum) {
        this.student = student;
        this.average = average;
        this.sum = sum;
    }
}

module.exports = StuScore;
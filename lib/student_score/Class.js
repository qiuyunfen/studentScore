class Class {
    constructor(average, middle, classId) {
        this.stuScore = [];
        this.average = average;
        this.middle = middle;
        this.classId = classId;

    }

    calAverage() {
        let sum = 0;
        for(let stu of this.stuScore) {
            sum += stu.sum;
        }
        return sum / this.stuScore.length;
    }

    calMiddle() {
        let arr = this.stuScore.map(stu => stu.sum).sort((a, b) => a - b);
        let middle = 0;
        let mid = parseInt(arr.length / 2);
        if(arr.length % 2 === 1) {
            middle = arr[mid];
        } else {
            middle =  (arr[mid - 1] + arr[mid]) / 2;
        }
        return middle;
    }

    updateClass(avarage, middle) {
        this.average = avarage;
        this.middle = middle;
        return this;
    }

    addStuScore(stuScore) {
        this.stuScore.push(stuScore);
        return this;
    }

    findStudent(stuScore) {
        let stus = this.stuScore;
        for(let index in stus) {
            if(stus[index].student.stuNo == stuScore.student.stuNo) {
                return index;
            }
        }
        return -1;
    }

    updateNewClass(newcl, stuno) {
        let stuScore = this.stuScore.find(stu => stu.student.stuNo === stuno);
        let isExitClass = false;
        for(let cl of newcl) {
            if(cl.classId === this.classId) {
                isExitClass = true;
                cl.stuScore.push(stuScore);
            }
        }
        if(!isExitClass || newcl.length === 0) {
            newcl.push(new Class(this.average, this.middle, this.classId).addStuScore(stuScore));
        }
        return newcl;
    }
}

module.exports = Class;
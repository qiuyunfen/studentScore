class Class {
    constructor(average, middle, classId) {
        this.stuScore = [];
        this.average = average;
        this.middle = middle;
        this.classId = classId;

    }

    // findClass(stuScore) {
    //     return this.classId === stuScore.student.classno;
    // }

    calAverage(stuScore) {
        let sum = 0;
        for(let stu of this.stuScore) {
            sum += stu.sum;
        }
        sum += stuScore.sum;
        return sum / (this.stuScore.length + 1);
    }

    calMiddle(stuScore) {
        let arr = [];
        let middle = 0;
        for(let stu of this.stuScore) {
            arr.push(stu.sum);
        }
        arr.push(stuScore.sum);
        arr.sort((a, b) => {
            return a - b;
        })

        let mid = parseInt(arr.length / 2);
        if(arr.length % 2 === 1) {
            middle = arr[mid];
        } else {
            middle =  (arr[mid - 1] + arr[mid]) / 2;
        }
        return middle;
    }

    updateClass(stuScore, avarage, middle) {
        this.stuScore.push(stuScore);
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
            if(stus[index].student.stuno == stuScore.student.stuno) {
                return index;
            }
        }
        return -1;
    }

    updateNewClass(newcl) {
        if(newcl.length === 0) {
            newcl.push(this);
        } else {
            let isExitClass = false;
            for(let cl of newcl) {
                if(cl.classId === this.classId) {
                    isExitClass = true;
                    cl.stuScore.push(this.stuScore);
                }
            }
            if(!isExitClass) {
                newcl.push(this);
            }
        }
        return newcl;
    }
}

module.exports = Class;

let Class = require('./Class');

class stuModel{
    constructor() {
        this.allCls = [];
    }

    getAllClass() {
        return this.allCls;
    }

    addStudentScore(student) {
        if(student !== null) {
            let stuScore =  student.calStuScore(student);

            let findcl = this.allCls.find(cl => cl.classId === stuScore.student.classNo);
            if(findcl) {
                let index = findcl.findStudent(stuScore);
                if(index !== -1) {
                    findcl.stuScore.splice(index, 1);
                }
                let avarage = findcl.calAverage(stuScore);
                let middle = findcl.calMiddle(stuScore);
                findcl.updateClass(stuScore, avarage, middle);
            } else {
                this.addClass(stuScore);
            }
        }
        return this.allCls;
    }

    addClass(stuScore) {
        let newcl = new Class(stuScore.sum, stuScore.sum, stuScore.student.classNo);
        newcl.addStuScore(stuScore);
        this.allCls.push(newcl);
        return this.allCls;
    }

    getStudentScore(test) {
        let newcls = [];
        for(let stuno of test) {
            let findcl = this.allCls.find(cl => cl.stuScore.filter(stu => stu.student.stuNo == stuno).length > 0);
            if(findcl) {
                findcl.updateNewClass(newcls, stuno);
            }
        }
        return newcls;
    }
}

module.exports = stuModel;

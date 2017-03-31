describe('studentScore', function () {
    const studentScore = require('../../lib/student_score/studentScore');
    const Student = require('../../lib/student_score/Student');
    const StuScore = require('../../lib/student_score/StuScore');
    const Class = require('../../lib/student_score/Class');

    it('should return student object when input has right format', function () {
        var input = 'Tom,1,han,1,math:75,chinese:95,english:80,program:80';
        var student = studentScore.resolveStudentInfo(input);
        expect(student).toEqual(new Student({name: 'Tom', stuno:1, nation:'han', classno: 1, math: 75, chinese: 95, english: 80, program: 80}));
    })

    it('should return string when input has wrong format', function () {
        let input = 'Tom, 1, han, math: 75';
        let wrongStr = studentScore.resolveStudentInfo(input);
        expect(wrongStr).toEqual('请按正确的格式输入（格式：姓名，学号，学科：成绩，...）');
    })

    it('should return sutScore object', function () {
        let student = new Student({name: 'Tom', stuno:1, nation:'han', classno: 1, math: 75, chinese: 95, english: 80, program: 80});
        let score = student.calStuScore(student);
        expect(score).toEqual(new StuScore(student, 330/4, 330));
    })

    it('should add student in class', function () {
        let stu = new StuScore(new Student({name: 'Tom', stuno:1, nation:'han', classno: 1, math: 80, chinese: 80, english: 80, program: 80}), 80, 320);
        let cl = new Class(320, 320, 1).addStuScore(stu);
        expect(cl.stuScore.length).toEqual(1);
    })


    it('should return class object when student in class', function () {
        let stu = new StuScore(new Student({name: 'Tom', stuno:1, nation:'han', classno: 1, math: 80, chinese: 80, english: 80, program: 80}), 80, 320);
        let cl = new Class(320, 320, 1).addStuScore(stu);
        let allcls = [cl];

        let findcl = allcls.find(cl => cl.findClass(stu));

        expect(findcl).toEqual(cl);
    })

    // it('should return null when student not in class', function () {
    //     let stu = new StuScore(new Student({name: 'Tom', stuno:1, nation:'han', classno: 1, math: 80, chinese: 80, english: 80, program: 80}), 80, 320);
    //     let cl = new Class(320, 320, 1).addStuScore(stu);
    //     let allcls = [cl];
    //
    //     let stu1 = new StuScore(new Student({name: 'Jerry', stuno:2, nation: 'han', classno: 1, math: 85, chinese: 85, english: 85, program: 85}), 85, 340);
    //     let findcl = allcls.find(cl => cl.findClass(stu1));
    //     expect(findcl).toEqual(undefined);
    // })

    it('should reset stuScore info in class', function () {
        let stu = new StuScore(new Student({name: 'Tom', stuno:1, nation:'han', classno: 1, math: 80, chinese: 80, english: 80, program: 80}), 80, 320);
        let cl = new Class(320, 320, 1).addStuScore(stu);
        let allcls = [cl];
        let findcl = allcls.find(cl => cl.findClass(stu));

        let stu1 = new StuScore(new Student({name: 'Tom', stuno:1, nation:'han', classno: 1, math: 90, chinese: 90, english: 90, program: 90}), 90, 360);
        findcl = stu1.resetStuScore(findcl);
        expect(findcl.stuScore[0]).toEqual(stu1);
    })

    it('should add Class when student has new classId', function () {
        let stu = new StuScore(new Student({name: 'Tom', stuno:1, nation:'han', classno: 1, math: 80, chinese: 80, english: 80, program: 80}), 80, 320);
        let allcls = [];
        let finalcl = studentScore.addClass(allcls, stu);
        expect(finalcl.length).toEqual(1);
    })
    
    it('should add stuScore and classId is exist', function () {
        let stu = new StuScore(new Student({name: 'Tom', stuno:1, nation:'han', classno: 1, math: 80, chinese: 80, english: 80, program: 80}), 80, 320);
        let cl = new Class(320, 320, 1).addStuScore(stu);
        let allcls = [cl];

        let findcl = allcls.find(cl => cl.findClass(stu));
        findcl.addStuScore();
        expect(findcl).toEqual(cl);
    })

    it('should return average', function () {
        let stu = new StuScore(new Student({name: 'Tom', stuno:1, nation:'han', classno: 1, math: 80, chinese: 80, english: 80, program: 80}), 80, 320);
        let cl = new Class(320, 320, 1).addStuScore(stu);
        let allcls = [cl];

        let stu1 = new StuScore(new Student({name: 'Jerry', stuno:2, nation: 'han', classno: 1, math: 85, chinese: 85, english: 85, program: 85}), 85, 340);
        let findcl = allcls.find(cl => cl.findClass(stu1));

        let avarage = findcl.calAverage(stu1);
        expect(avarage).toEqual(330);
    })

    it('should return middle when arr length is even', function () {
        let stu = new StuScore(new Student({name: 'Tom', stuno:1, nation:'han', classno: 1, math: 80, chinese: 80, english: 80, program: 80}), 80, 320);
        let cl = new Class(320, 320, 1).addStuScore(stu);
        let allcls = [cl];

        let stu1 = new StuScore(new Student({name: 'Jerry', stuno:2, nation: 'han', classno: 1, math: 85, chinese: 85, english: 85, program: 85}), 85, 340);
        let findcl = allcls.find(cl => cl.findClass(stu1));

        let avarage = findcl.calMiddle(stu1);
        expect(avarage).toEqual(330);
    })

    it('should return middle when arr length is odd', function () {
        let stu = new StuScore(new Student({name: 'Tom', stuno:1, nation:'han', classno: 1, math: 80, chinese: 80, english: 80, program: 80}), 80, 320);
        let stu2 = new StuScore(new Student({name: 'Hello', stuno: 3, nation: 'han', classno: 1, math: 81, chinese: 81, english: 81, program: 81}), 81, 324);
        let cl = new Class(320, 320, 1);
        cl.addStuScore(stu);
        cl.addStuScore(stu2);

        let allcls = [cl];

        let stu1 = new StuScore(new Student({name: 'Jerry', stuno:2, nation: 'han', classno: 1, math: 85, chinese: 85, english: 85, program: 85}), 85, 340);
        let findcl = allcls.find(cl => cl.findClass(stu1));
        let middle = findcl.calMiddle(stu1);
        expect(middle).toEqual(324);
    })

    it('should update class', function () {
        let stu = new StuScore(new Student({name: 'Tom', stuno:1, nation:'han', classno: 1, math: 80, chinese: 80, english: 80, program: 80}), 80, 320);
        let cl = new Class(320, 320, 1).addStuScore(stu);
        let allcls = [cl];

        let stu1 = new StuScore(new Student({name: 'Jerry', stuno:2, nation: 'han', classno: 1, math: 85, chinese: 85, english: 85, program: 85}), 85, 340);
        let findcl = allcls.find(cl => cl.findClass(stu1));

        let avarage = findcl.calMiddle(stu1);
        let middle = findcl.calMiddle(stu1);
        findcl.updateClass(stu1, avarage, middle);
        expect(findcl.average).toEqual(330);
        expect(findcl.stuScore.length).toEqual(2);
    })

    it('should return student array', function () {
        let input = '1';
        let result = [1];
        let test = studentScore.resolveStudId(input);
        expect(test).toEqual(result);
    })

    // it('shoule return string wnationhen input wrong format', function () {
    //     let input = 'we';
    //     let res = studentScore.resolveStudId(input);
    //     expect(res).toEqual('请按正确的格式输入要打印的学生的学号：(格式：学号，学号，...)');
    // })

    it('should get class info include query studentno', function () {
        let stuno = 1;
        let stu = new StuScore(new Student({name: 'Tom', stuno:1, nation:'han', classno: 1, math: 80, chinese: 80, english: 80, program: 80}), 80, 320);
        let cl = new Class(320, 320, 1).addStuScore(stu);
        let allcls = [cl];

        let findstu = null;
        findstu = allcls.find(cl => cl.findStuScore(stuno));
        expect(findstu).toEqual(cl);
    })

    it('shoule update new class info when first add', function () {
        let stuno = '1';
        let stu = new StuScore(new Student({name: 'Tom', stuno:1, nation:'han', classno: 1, math: 80, chinese: 80, english: 80, program: 80}), 80, 320);
        let cl = new Class(320, 320, 1).addStuScore(stu);
        let allcls = [cl];

        let findcl = allcls.find(cl => cl.findStuScore(stuno));;
        let newcl = findcl.updateNewClass([]);

        expect(newcl).toEqual(allcls);
    })

    it('shoule update new class info when classinfo isExit', function () {
        let stuno = '1';
        let stu = new StuScore(new Student({name: 'Tom', stuno:1, nation:'han', classno: 1, math: 80, chinese: 80, english: 80, program: 80}), 80, 320);
        let stu1 = new StuScore(new Student({name: 'Jerry', stuno:2, nation:'han', classno: 1, math: 90, chinese: 90, english: 90, program: 90}), 90, 360);
        let cl = new Class(320, 320, 1).addStuScore(stu);
        let allcls = [cl];

        let findcl = allcls.filter(cl => cl.findStuScore(stuno));;
        let newcl = findcl[0].updateNewClass([new Class(360, 360, 1).addStuScore(stu1)]);

        expect(newcl.length).toEqual(1);
        expect(newcl[0].stuScore.length).toEqual(2);
    })


    it('shoule update new class info when classinfo not exit', function () {
        let stuno = '1';
        let stu = new StuScore(new Student({name: 'Tom', stuno:1, nation:'han', classno: 1, math: 80, chinese: 80, english: 80, program: 80}), 80, 320);
        let stu1 = new StuScore(new Student({name: 'Jerry', stuno:2, nation:'han', classno: 1, math: 90, chinese: 90, english: 90, program: 90}), 90, 360);
        let cl = new Class(320, 320, 1).addStuScore(stu);
        let allcls = [cl];

        let findcl = allcls.filter(cl => cl.findStuScore(stuno));;
        let newcl = findcl[0].updateNewClass([new Class(360, 360, 2).addStuScore(stu1)]);

        expect(newcl.length).toEqual(2);
        expect(newcl[0].stuScore.length).toEqual(1);
        expect(newcl[1].stuScore.length).toEqual(1);
    })
    it('should return class string', function () {
        let stuno = '1';
        let stu = new StuScore(new Student({name: 'Tom', stuno:1, nation:'han', classno: 1, math: 80, chinese: 80, english: 80, program: 80}), 80, 320);
        let stu1 = new StuScore(new Student({name: 'Jerry', stuno:2, nation:'han', classno: 1, math: 90, chinese: 90, english: 90, program: 90}), 90, 360);
        let cl = new Class(320, 320, 1).addStuScore(stu);
        let allcls = [cl];

        let findcl = allcls.filter(cl => cl.findStuScore(stuno));;
        let newcl = findcl[0].updateNewClass([new Class(360, 360, 2).addStuScore(stu1)]);
        let res = studentScore.printStuScore(newcl);
        expect(res).toEqual('成绩单\n姓名|数学|语文|英语|编程|平均分|总分\n' +
                            '========================\n'+
                            'Jerry|90|90|90|90|90|360\n'+
                            '========================\n'+
                            '全班总分平均分:360\n'+
                            '全班总分中位数:360\n'+
                            '成绩单\n姓名|数学|语文|英语|编程|平均分|总分\n'+
                            '========================\n'+
                            'Tom|80|80|80|80|80|320\n'+
                            '========================\n'+
                            '全班总分平均分:320\n'+
                            '全班总分中位数:320\n');
    })
})
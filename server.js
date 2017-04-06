let express = require('express');
var bodyParser = require('body-parser');
let System = require('./lib/student_score/System');
let Student = require('./lib/student_score/Student');

let app = express();
let system = new System();
app.use(bodyParser.urlencoded({ extended: false }));
//let path = require('path');
// app.get('/', function(req, res) {
//
//     res.sendFile(path.join(__dirname, './index.html'));
// })
app.set("view engine", 'ejs');

app.set('views', __dirname + '/lib/student_score/view');

app.get("/", function(req, res) {
    res.render('index.ejs', {});
});

app.get('/addStudent', function (req, res) {
    res.render('addStudent.ejs', {});
})

app.post('/addStudentPage', function (req, res) {
    let {name, stuNo, nation, classNo, math, chinese, english, program} = req.body;
    let stuInfo = new Student({
        name,
        stuNo: parseInt(stuNo),
        nation,
        classNo: parseInt(classNo),
        math: parseInt(math),
        chinese: parseInt(chinese),
        english: parseInt(english),
        program: parseInt(program)
    })
    let msg = system.handAddStudentInfo(stuInfo);
    res.render('addStudentPage.ejs', {msg: msg.substring(0, 7)});
});

app.get('/printScore', function (req, res) {
    res.render('printScore.ejs', {});
})

app.get('/printScorePage', function (req, res) {
    let stuNos = req.query.stuNos;
    let str = system.printStudentInfo(stuNos);
    res.render('printScorePage.ejs', {stuStr: str});
})

app.get('/exit', function (req, res) {
    res.render('exit.ejs');
})

app.listen(3000, function () {
    console.log('listen...');

})
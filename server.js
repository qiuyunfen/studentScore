let express = require('express');
let System = require('./lib/student_score/System');

let app = express();

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

app.get('/printScore', function (req, res) {
    res.render('printScore.ejs', {});
})

app.get('/printScorePage', function (req, res) {
    let stuNos = req.query.stuNos;
    let str = new System().printStudentInfo(stuNos);
    res.render('printScorePage.ejs', {stuStr: str});
})

app.listen(3000, function () {
    console.log('listen...');

})
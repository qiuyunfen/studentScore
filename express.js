/**
 * Created by qiuyf on 17-4-7.
 */
let express = require('express');
var bodyParser = require('body-parser');
let System = require('./lib/student_score/System');
let Student = require('./lib/student_score/Student');

let app = express();
let system = new System();
app.use(bodyParser.urlencoded({ extended: true }));
let path = require('path');
// app.get('/', function(req, res) {
//
//     res.sendFile(path.join(__dirname, './index.html'));
// })
app.use(express.static(__dirname + '/node_modules'));
app.set("view engine", 'ejs');
app.set('views', __dirname + '/lib/student_score/view');

app.get("/", function(req, res) {
    res.render('index.ejs', {});
});

app.get('/addStudent', function (req, res) {
    res.sendFile(path.join(__dirname, './lib/student_score/ajax/addStudent.html'));
})

app.post('/addStudent', function (req, res) {
    let msg = system.handAddStudent(req.body.inputStr.toString());
    res.json({msg});
});

app.listen(3000, function () {
    console.log('system listen...');

})
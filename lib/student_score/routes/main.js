let express = require('express');
let router = express.Router();
let path = require('path');

let StudentService = require('../StudentService');

let system = new StudentService();

router.get('/', function(req, res) {
    res.render('index.ejs', {key: '/home'});
})

router.get('/addStudent', function (req, res) {
    res.render('addStudent', {});
    //res.sendFile(path.join(__dirname, '../ajax/addStudent.html'));
})

router.post('/addStudent', function (req, res) {
    let msg = system.handAddStudent(req.body);
    res.json(msg);
});

router.get('/printScore', function (req, res) {
    res.render('printScore', {});
})

router.get('/printAllStudentScore', function (req, res) {
    let allCls = system.getAllClass();
    res.json(allCls);
})

router.post('/printStudentScore', function (req, res) {
    let newCls = system.printStudentInfo(req.body.stuNos);
    res.json(newCls);
})

router.get('/exit', function (req, res) {
    res.render('exit');
})

module.exports = router;
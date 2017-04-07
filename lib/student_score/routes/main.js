let express = require('express');
let router = express.Router();
let path = require('path');

let StudentService = require('../StudentService');

let system = new StudentService();

router.get('/', function(req, res) {
    res.render('index.ejs', {});
})

router.get('/addStudent', function (req, res) {
    res.render('addStudent', {});
    //res.sendFile(path.join(__dirname, '../ajax/addStudent.html'));
})

router.post('/addStudent', function (req, res) {
    let msg = system.handAddStudent(req.body.inputStr.toString());
    res.json(msg);
});

module.exports = router;
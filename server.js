let express = require('express');
let app = express();
let path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './index.html'));
})

app.use('/addStudent', function (req, res) {
    res.sendFile(path.join(__dirname, './addStudent.html'))
})

app.listen(3000, function () {
    console.log('listen...');

})
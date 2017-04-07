let express = require('express');
let bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(__dirname + '/public'));
app.set("view engine", 'ejs');
app.set('views', __dirname + '/lib/student_score/view');

app.use('/', require('./lib/student_score/routes/main'));

app.listen(3000, function () {
    console.log('system listen...');

})
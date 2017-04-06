let express = require('express');
let app = express();

app.get('/', (req, res) => {
    res.send('index.html');
})

app.listen(3000, () => {
    console.log('listen...');
})
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// rl.on('line', (input) => {
//     console.log('line'+input);
//
// })
//
// rl.on('line', input => {
//     console.log('line1'+input);
// })


//
// rl.question('test', answer => {
//     console.log(answer);
// })
// rl.question('test2', answer => {
//     console.log(answer);
// })


// rl.on('line', (input) => {
//     console.log('line'+input);
// })
// rl.question('test', answer => {
//     console.log(answer);
// })


rl.question('test', answer => {
    console.log(answer);
})
rl.on('line', (input) => {
    console.log('line'+input);
})


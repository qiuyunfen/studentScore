let System = require('./System');

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let system = new System();

function entry(output) {
    rl.question(output, input => {
        let msg = system.handInput(input);
        if(msg === '系统退出') process.exit(1);
        entry(msg);
    })
}

entry('1.添加学生\n2.生成成绩单\n3.退出\n请输入你的选择(1-3)');

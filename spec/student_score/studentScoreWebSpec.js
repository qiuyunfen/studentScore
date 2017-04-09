const request = require('supertest');
const express = require('express');

describe('studentScore system', function() {
    const app = express();

    it('should return add success msg', function(done) {
        var body = {
            name: 'tom',
            stuNo: '7',
            nation: 'han',
            classNo: '1',
            math: '98',
            chinese: '100',
            english: '97',
            program: '87'
        };
        request(app)
            .post('/addStudent')
            .send(body)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.status).toEqual('1');
                expect(res.body.msg).toEqual('添加学生成功');
                done();
            });
    });

})

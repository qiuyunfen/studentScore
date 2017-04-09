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
                expect(res.body.status).toEqual(1);
                expect(res.body.msg).toEqual('添加学生成功');
                done();
            });
    });

    it('should return add success msg', function(done) {
        var body = {
            name: 'tom',
            stuNo: '7',
            nation: 'han',
            classNo: '1',
            math: '98',
            chinese: '100',
            english: '97',
            program: ''
        };
        request(app)
            .post('/addStudent')
            .send(body)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.status).toEqual(0);
                expect(res.body.msg).toEqual('请按正确的格式输入（格式：学号，学号，...）');
                done();
            });
    });

    it('should return student 7 of class score', function(done) {
        request(app)
            .post('/printScore')
            .send({stuNos: '7'})
            .expect('Content-Type', /json/)
            .expect(function(res) {
                res.body[0].stuScore.student.name = 'tom';
            })
            .expect(200, {
                name: 'tom',
            }, done);
    });

    it('should return student 8 of class score when student is not exit', function(done) {
        request(app)
            .post('/printScore')
            .send({stuNos: '8'})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.length).toEqual(0);
                done();
            });
    });

    it('should return wrong message when stuNo is wrong format', function(done) {
        request(app)
            .post('/printScore')
            .send({stuNos: 'yu'})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.status).toEqual(0);
                done();
            });
    });
})

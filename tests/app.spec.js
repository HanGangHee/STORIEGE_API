import request from 'supertest'
import { expect } from 'chai'
import app from '../app'


suite('GET /', () => {
    test('should respond with text message "Hello World"', (done) => {
        request(app.listen())
            .get('/')
            .expect(200)
            .end((err, res) => {
                if(err){
                    done(err)
                    return
                }
                expect(res.text).to.equal('Hello World')
                done()
            })
    })
})

suite('GET /user/auth', () => {
    test('should respond with text message user "gksrkdgml"', (done) => {
        request(app.listen())
            .post('/user/auth')
            .send({ userID: "test", pwd: "1234"})
            .expect(200)
            .end((err, res) => {
                if(err){
                    done(err)
                    return
                }
                console.log(res.text)
                let result = JSON.parse(res.text)
                expect(result['userID']).to.equal('test')
                expect(result['pwd']).to.equal('1234')
                expect(result['name']).to.equal('한강희')
                expect(result['sex']).to.equal('남')
                done()
            })
    })
})


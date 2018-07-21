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

suite('GET /user/login', () => {
    test('should respond with text message user "gksrkdgml"', (done) => {
        request(app.listen())
            .get('/user/login')
            .expect(200)
            .end((err, res) => {
                if(err){
                    done(err)
                    return
                }
                let result = JSON.parse(res.text)
                expect(result['userID']).to.equal('gksrkdmgl')
                expect(result['pwd']).to.equal('qewr')
                expect(result['name']).to.equal('한강희')
                expect(result['sex']).to.equal('남')
                done()
            })
    })
})


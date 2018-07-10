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
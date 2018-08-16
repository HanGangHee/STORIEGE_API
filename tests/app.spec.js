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


//
// suite('GET /auth/join', () => {
//     test('should respond with text message "ok"', (done) => {
//         request(app.listen())
//             .post('/auth/join')
//             .send({ id: "test", pwd: "sdfasdf", nickname: "한강희", age: 10, sex:"남", thema: 'A'})
//             .expect(200)
//             .end((err, res) => {
//                 if(err){
//                     done(err)
//                     return
//                 }
//                 let result = res.body
//                 console.log(result)
//                 expect(result["message"]).to.equal('ok')
//                 done()
//             })
//     })
// })
//

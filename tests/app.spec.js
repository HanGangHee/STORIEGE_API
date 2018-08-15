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

suite('POST /auth/login', () => {
    test('should respond with text message  "logged in successfully"', (done) => {
        request(app.listen())
            .post('/auth/login')
            .send({ id: "test", pwd: "sdfasdf"})
            .expect(200)
            .end((err, res) => {
                if(err){
                    done(err)
                    return
                }
                let result = res.body
                expect(result['message']).to.equal('ok')
                // expect(result['pwd']).to.equal('1234')
                // expect(result['name']).to.equal('한강희')
                // expect(result['sex']).to.equal('남')
                done()
            })
    })
})



suite('GET /auth/check', () => {
    const getToken = new Promise(
        (resolve, reject) => {
            request(app.listen())
                .post('/auth/login')
                .send({ id: "test", pwd: "sdfasdf"})
                .expect(200)
                .end((err, res) => {
                    if(err){
                        reject(err)
                    }
                    let token = res.body.token
                    resolve(token)
                })
        }
    )
    test('should respond with auth Data', (done) => {
        getToken.then(token => {
            let url = `/auth/check/?token=${token}`
            request(app.listen())
                .get(url)
                .expect(200)
                .end((err, res) => {
                    if(err){
                        done(err)
                        return
                    }
                    let result = res.body.user
                    expect(result['id']).to.equal('test')
                    done()
                })
        }).catch(error => {
            console.error("TEST ERROR !")
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

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

suite('POST /users/login', () => {
    test('should respond with text message  "logged in successfully"', (done) => {
        request(app.listen())
            .post('/users/login')
            .send({ userID: "test", pwd: "1234"})
            .expect(200)
            .end((err, res) => {
                if(err){
                    done(err)
                    return
                }
                let result = res.body
                expect(result['message']).to.equal('logged in successfully')
                // expect(result['pwd']).to.equal('1234')
                // expect(result['name']).to.equal('한강희')
                // expect(result['sex']).to.equal('남')
                done()
            })
    })
})



suite('GET /users/check', () => {
    const getToken = new Promise(
        (resolve, reject) => {
            request(app.listen())
                .post('/users/login')
                .send({ userID: "test", pwd: "1234"})
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
    test('should respond with users Data', (done) => {
        getToken.then(token => {
            let url = `/user/check/?token=${token}`
            console.log(url)
            request(app.listen())
                .get(url)
                .expect(200)
                .end((err, res) => {
                    if(err){
                        done(err)
                        return
                    }
                    let result = res.body.user
                    expect(result['userID']).to.equal('test')
                    expect(result['pwd']).to.equal('1234')
                    done()
                })
        })
    })

})
//
// suite('GET /users/join', () => {
//     test('should respond with text message "ok"', (done) => {
//         request(app.listen())
//             .post('/users/join')
//             .send({ userID: "test6", pwd: "1234", name: "조잔형", sex:"남"})
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


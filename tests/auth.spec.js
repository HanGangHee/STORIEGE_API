import {expect} from "chai"
import app from "../app"
import request from "supertest"

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
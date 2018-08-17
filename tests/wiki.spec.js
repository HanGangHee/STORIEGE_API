import {expect} from "chai"
import app from "../app"
import request from "supertest"

suite('POST /api/wiki', () => {
    test('should respond with text message  "ok"', (done) => {
        request(app.listen())
            .post('/api/wiki')
            .send({
                title: "test1",
                content: "sdfasdf",
                user_id: "test1",
                parent_num: 0,
                tags: "#한강희 #태그 #taG asdfasdf"
            })
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



suite('POST /api/wiki', () => {
    test('should respond with text message  "ok"', (done) => {
        request(app.listen())
            .post('/api/wiki/0')
            .send({
                title: "test1",
                content: "sdfasdf",
                user_id: "test1",
                parent_num: 0,
                tags: "#한강희 #태그 #taG asdfasdf"
            })
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
const getToken = new Promise(
    (resolve, reject) => {
        request(app.listen())
            .post('/auth/login')
            .send({ id: "test1", pwd: "sdfasdf"})
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
suite('GET /api/wiki', () => {
    test('GET /api/wiki/0  should respond with text message  "ok"', (done) => {
        getToken.then((token) => {
            request(app.listen())
                .get(`/api/wiki/0?token=${token}`)
                .expect(200)
                .end((err, res) => {
                    if(err){
                        done(err)
                        return
                    }
                    let result = res.body
                    console.log("==================")
                    console.dir(result)
                    expect(result['message']).to.equal('ok')
                    done()
                })
        })
    })
    test('GET /api/wiki/1  should respond with text message  "ok"', (done) => {
        getToken.then((token) => {
            request(app.listen())
                .get(`/api/wiki/1?token=${token}`)
                .expect(200)
                .end((err, res) => {
                    if(err){
                        done(err)
                        return
                    }
                    let result = res.body
                    console.log("==================")
                    console.dir(result)
                    expect(result['message']).to.equal('ok')
                    done()
                })
        })
    })

})
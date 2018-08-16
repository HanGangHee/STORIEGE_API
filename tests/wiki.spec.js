import {expect} from "chai"
import app from "../app"
import request from "supertest"

suite.only('POST /api/wiki', () => {
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
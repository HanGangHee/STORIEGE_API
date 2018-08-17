/*
POST /auth/join
{
    id
    pwd
    name
    sex
}
 */
import mariaDB from "../../services/mariaDB"
import bcrypt from 'bcrypt-nodejs'

exports.join = (req, res) => {
    if(req.body === undefined){
        console.log("[POST /auth/join] req.body is Empty")
        return
    }
    const {id, pwd, nickname, age, sex, thema} = req.body

    const is_duplicated = (connection) => {
        let sql = `select id from users where id=? limit 1`
        connection.query(sql, [id], (err, rows) => {
            console.log(rows[0])
            if(err || rows.length !== 0){
                throw err
            }
        })
        return connection
    }

    const insert = (connection) => {
        return new Promise (
            (resolve, reject) => {
                bcrypt.hash(pwd, null, null, (err, hash) => {
                    var sql = {id, pwd :hash, nickname, age, sex, thema} // 입력받은 평문을 hash로 바꿔서 넣어준다
                    console.log(hash)
                    connection.query('insert into users set ?', sql, function (err, rows) {
                        if(err){
                            reject('fail')
                            return
                        }
                        resolve('ok')
                        connection.release // connection pool에 release
                    })
                })
            })
    }
    const result = (message) => {
        res.json({message})
    }

    const onError = (error) => {
        console.error(error)
        res.status(409).json({
                message : error
            })
    }

    const join = new Promise(
        (resolve, reject) => {
            mariaDB.getConnection((err, connection) => {
                if(err){
                    reject(err)
                    return
                }
                resolve(connection)
            })
        }
    )

    join.then(is_duplicated)
        .then(insert)
        .then(result)
        .catch(onError)
}
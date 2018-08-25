
/*
POST /auth/auth/
{
    userID,
    pwd,
}
 */
import jwt from 'jsonwebtoken'
import mariaDB from "../../services/mariaDB"
import bcrypt from 'bcrypt-nodejs'

exports.login = (req, res) => {
    if(!req.body){
        res.status(409).json({
            message : 'error'
        })
        return
    }
    const {id, pwd} = req.body
    const SECRET = req.app.get('jwt-secret')

    const checkUser = (connection) => {
        return new Promise(
            (resolve, reject) => {
                let sql = `select * from users where id=? limit 1`
                connection.query(sql, [id],  (err, rows) => {
                    if(err){
                        reject('Query error')
                    }
                    if(rows.length === 0){
                        reject('ID is not founded !')
                    }
                    let hash = rows[0].pwd
                    bcrypt.compare(pwd, hash, function(err, res) { // "keyword"와 hash(해싱된 코드)를 비교하여 같으면 true 아니면 false를 반환합니다
                        if(err || !res){
                            reject('fail')
                            return
                        }
                        let user = rows[0]
                        delete user.pwd
                        resolve(user)
                        connection.release //mariadb connection pool에 release
                    })
                })
            }
        )
    }

    const createToken = (user) => {
        return jwt.sign({user}, SECRET, {
            algorithm: 'HS256',
            expiresIn: 60 * 60 * 24 * 7
        })
    }
    const respond = (token) => {
        res.json({
            message:'ok',
            token
        })
    }
    const onError = (error) => {
        console.error(error)
        res.status(409).json({
            message : error
        })
    }


    const auth = new Promise((resolve, reject) => {
        mariaDB.getConnection((err, connection) => {
                if(err){
                    reject(err)
                    return
                }
                resolve(connection)
            })
        }
    )

    // 인증 및 user_check
    auth.then(checkUser)
        .then(createToken)
        .then(respond)
        .catch(onError)

}
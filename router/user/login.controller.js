
/*
POST /user/auth/
{
    userID,
    pwd,
}
 */
import jwt from 'jsonwebtoken'
import db from "../../config/mariaDB"

exports.login = (req, res) => {
    if(!req.body){
        res.status(409).json({
            message : 'error'
        })
        return
    }
    const {userID, pwd} = req.body
    const SECRET = req.app.get('jwt-secret')

    const checkUser = (connection) => {
        let sql = `select * from user where userID="${userID}" AND pwd="${pwd}"`
        return new Promise(
            (resolve, reject) => {
                connection.query(sql, (err, rows) => {
                    if(err){
                        reject('Query error')
                    }
                    if(rows.length === 0){
                        reject('Login failed !')
                    }
                    let user = rows[0]
                    return resolve(user)
                })
                connection.release //mariadb connection pool에 release
            }
        )
    }

    const createToken = (user) => {
        console.log("user " + user.userID)
        return jwt.sign({user}, SECRET, {
            algorithm: 'HS256',
            expiresIn: 60 * 60 * 24 * 7
        })
    }
    const respond = (token) => {
        res.json({
            message:'logged in successfully',
            token
        })

    }
    const onError = (error) => {
        console.log(error)
        res.status(409).json({
            message : 'error'
        })
    }


    const auth = new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
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
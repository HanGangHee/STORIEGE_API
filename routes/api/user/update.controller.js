import mariaDB from '../../../services/mariaDB'
import bcrypt from 'bcrypt-nodejs'
/*
PUT /api/user
receive : user_info
 */

module.exports = (req, res) => {
    if(!req.body){
        res.json({message: "User Info Empty !"})
        return
    }
    let {pwd, nickname, age, sex, thema} = req.body

    const dbConnection = new Promise(
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
    const checkUser = (connection) => {
        let sql = `select * from users where nickname = ?`
        return new Promise(
            (resolve, reject) => {
                connection.query(sql, [id, nickname], (err, rows) => {
                    if(err){
                        reject(err)
                        return
                    }
                    if(rows){
                        reject('NickName Exists')
                        return
                    }
                    resolve(connection)
                })
            }
        )
    }
    const updateUser = (connection) => {
        let sql = `update users set id = ?, pwd = ?, nickname = ?, age = ?, sex = ?, thema = ? where id = ?`
        return new Promise(
            (resolve, reject) => {
                bcrypt.hash(pwd, null, null, (err, hash) => {
                    connection.query(sql, [id, hash, nickname, age, sex, thema, id], (err, rows) => {
                        if(err){
                            reject(err)
                            return
                        }
                        resolve('ok')
                    })
                })
            }
        )
    }

    const respond = (message) => {
        res.json({message})
    }

    const onError = (error) => {
        console.error(error)
        res.status(409).json({
            message : error
        })
    }

    dbConnection.
    then(updateUser).
    then(checkUser).
    then(respond).
    catch(onError)
}
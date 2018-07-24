/*
POST /user/join
{
    userID
    pwd
    name
    sex
}
 */
import db from "../../config/mariaDB"

exports.join = (req, res) => {
    if(req.body === undefined){
        console.log("[POST /user/join] req.body is Empty")
        return
    }
    const {userID, pwd, name, sex} = req.body

    const is_duplicated = (connection) => {
        let sql = `select userID from user where userID='${req.body.userID}'`
        connection.query(sql, (err, rows) => {
            console.log(rows[0])
            if(err){
                throw new Error('query error')
            }
            if(rows.length !== 0){
                throw new Error('userID exists')
            }
        })
        return connection
    }

    const insert = (connection) => {
        let sql = `insert into user values('${userID}', '${pwd}', '${name}', '${sex}')`
        connection.query(sql, (err, rows) => {
            if(err){
                throw new Error('Insert fail !!!')
            }
        })
        connection.release // connection pool에 release
        res.json({message : 'ok'})
    }

    const onError = (error) => {
        res.status(409).json({
                message : 'error'
            })
    }

    const join = new Promise(
        (resolve, reject) => {
            db.getConnection((err, connection) => {
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
        .catch(onError)
}
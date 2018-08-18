import mariaDB from '../../../services/mariaDB'

/*
Put /api/wiki
receive : {
    num
    title
    content
    user_id
    parent_num
}

 */

module.exports = (req, res) => {
    if(req.decoded.user.id != req.body.user_id){
        res.json({message : 'fail'})
        return
    }
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
    const upDateWiki = (connection) => {
        return new Promise(
            (resolve, reject) => {
                let sql
                if(num == 0){
                    sql = `select title from wikis where user_id = ? AND parent_num = ?`
                }
                else {
                    sql = 'select * from wikis where user_id = ? AND num = ?'
                }
                connection.query(sql, [user_id, num], (err, data) => {
                    if(err){
                        reject(err)
                        return
                    }
                    console.dir(data)
                    resolve({connection, data})
                })
            }
        )
    }

    const respond = (data) => {
        res.json(data)
    }
    const onError = (error) => {
        console.error(error)
        res.status(409).json({
            message : error
        })
    }

    dbConnection
        .then(respond)
        .catch(onError)

}
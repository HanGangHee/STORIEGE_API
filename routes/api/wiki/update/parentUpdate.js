import mariaDB from '../../../services/mariaDB'

/*
Put /api/wiki/parent/:num
receive : {
    parent_num:
    user_id:
}

 */

module.exports = (req, res) => {
    if(req.decoded.user.id != req.body.user_id && req.body.parent_num){
        res.json({message : 'fail'})
        return
    }
    let num = req.params.num
    let {parent_num} = req.body
    const dbConnection = new Promise(
        (resolve, reject) => {
            mariaDB.getConnection((err, connection) => {
                if(err){
                    reject(err)
                    return
                }
                resolve(connection)
                connection.release
            })
        }
    )
    const updateWiki = (connection) => {
        return new Promise(
            (resolve, reject) => {
                let sql = `update wikis set parent_num = ? where num = ?`
                connection.query(sql, [parent_num, num], (err, data) => {
                    if(err){
                        reject(err)
                        return
                    }
                    resolve('ok')
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

    dbConnection
        .then(updateWiki)
        .then(respond)
        .catch(onError)

}
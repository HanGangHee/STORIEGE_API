import mariaDB from '../../../services/mariaDB'

/*
Put /api/wiki/title/:num
receive : {
    title:
    user_id:
}

 */

module.exports = (req, res) => {
    if(req.decoded.user.id != req.body.user_id && req.body.parent_num){
        res.json({message : 'fail'})
        return
    }
    let num = req.params.num
    let {title} = req.body
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
    const updateWiki = (connection) => {
        return new Promise(
            (resolve, reject) => {
                let sql = `update wikis set title = ? where num = ?`
                connection.query(sql, [title, num], (err, data) => {
                    if(err){
                        reject(err)
                        return
                    }
                    resolve('ok')
                    connection.release
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
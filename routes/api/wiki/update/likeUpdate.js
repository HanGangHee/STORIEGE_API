import mariaDB from '../../../services/mariaDB'

/*
Put /api/wiki/like/:num
receive : {
    like     -1 or 1
    user_id
}

 */

module.exports = (req, res) => {
    if(req.decoded.user.id != req.body.user_id && req.body.like){
        res.json({message : 'fail'})
        return
    }
    let num = req.params.num
    let {like} = req.body
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
                let sql
                if(like == 1){
                    sql = `update wikis set likes = likes + 1 where num = ?`
                }
                else {
                    sql = `update wikis set dislikes = dislikes + 1 where num = ?`
                }
                connection.query(sql, [num], (err, data) => {
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
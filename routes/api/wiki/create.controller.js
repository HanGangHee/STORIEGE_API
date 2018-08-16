import mariaDB from '../../../services/mariaDB'
import Hashtag from '../../../schemas/hashtag'

/*
Post /api/wiki
receive : wiki_info

 */

module.exports = (req, res) => {
    if(!req.body){
        res.json({message: "Wiki_Info Empty"})
        return
    }
    let {title, content, user_id, parent_num, tags} = req.body
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
    const insertWiki = (connection) => {
        let sql = "insert into wikis(title, content, user_id, parent_num, tags) values(?, ?, ?, ?, ?)"
        return new Promise(
            (resolve, reject) => {
                connection(sql, [title, content, user_id, parent_num, tags], (err, rows) => {
                    if(err){
                        reject(err)
                        return
                    }
                    console.log("=========================" + rows[0] + "=========================")
                    resolve({num :rows[0].num});
                })
            }
        )
    }

    const insertHashtag = (num) => {
        if(tags === null){
            return 'ok'
        }
        let hashtags = tags.match(/#[^#\s,;]+/gm).slice(1).map((s) => s.toLowerCase())
        return Promise.all(hashtags.map(
            hashtag => Hashtag.updateOne({_id : hashtag}, {$set: {$push : {wikis: num}}}, {upsert: true})
        ))
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
            message : 'error'
        })
    }

    dbConnection
        .then(insertWiki)
        .then(insertHashtag)
        .then(respond)
        .catch(onError)

}
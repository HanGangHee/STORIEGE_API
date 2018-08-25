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
        let sql = "insert into wikis(title, content, user_id, parent_num) values(?, ?, ?, ?, ?)"
        return new Promise(
            (resolve, reject) => {
                connection.query(sql, [title, content, user_id, parent_num, tags], (err, row) => {
                    if(err){
                        reject(err)
                        return
                    }
                    resolve({num :row.insertId});
                })
            }
        )
    }

    const insertHashtag = (num) => {
        if(tags === null){  //해시태그를 설정하지 않으면 검색이 되지 않음
            return 'ok'
        }
        let hashtags = tags.match(/#[^#\s,;]+/gm).map((s) => s.slice(1).toLowerCase())
        return Promise.all(hashtags.map(
            hashtag => Hashtag.updateOne({_id : hashtag}, {$push : {wikis: num}}, {upsert: true})
        )).then(v => 'ok')
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
        .then(insertWiki)
        .then(insertHashtag)
        .then(respond)
        .catch(onError)
}
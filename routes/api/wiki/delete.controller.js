import mariaDB from '../../../services/mariaDB'
import Hashtag from '../../../schemas/hashtag'

/*
delete /api/wiki
receive : wiki_NUM

 */

module.exports = (req, res) => {
    if(!req.body && req.decoded.user.id !== req.body.user_id){
        res.json({message: "fail"})
        return
    }
    let {num, user_id} = req.body

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
    const getWikiGroupByUserID = (connection) => {
        let sql = `select num, parent_num from wikis where user_id = ?`
        return new Promise(
            (resolve, reject) => {
                connection.query(sql, [user_id], (err, rows) => {
                    if(err){
                        reject(err)
                        return
                    }
                    let groups = new Map()
                    rows.forEach(row => {result.set(row.num, row.parent_num)})
                    resolve(connection, groups)
                })
            }
        )
    }
    const getDeleteGroup = (connection, groups) => {
        return new Promise(
            (resolve, reject) => {
                let wikiArr = []
                groups.forEach(
                    (v ,k) => {
                        let curNum = k
                        while(curNum != 0){
                            if(curNum === num){
                                wikiArr.push(k)
                                break
                            }
                            curNum = groups.get(curNum)
                        }
                    })
                resolve(connection, wikiArr)
            }
        )
    }
    const deleteWiki = (connection, wikiArr) => {
        let sql = `delete from wikis where num in (?)`
        return new Promise(
            (resolve, reject) => {
                connection.query(sql, [wikiArr], (err, row) => {
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
            message : 'error'
        })
    }

    dbConnection
        .then(getWikiGroupByUserID)
        .then(getDeleteGroup)
        .then(deleteWiki)
        .then(respond)
        .catch(onError)
}
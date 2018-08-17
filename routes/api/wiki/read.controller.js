import mariaDB from '../../../services/mariaDB'

/*
Get /api/wiki/:num


case 1 : num === 0
file의 root경로로 parent_num = 0인 파일들의 목록(title 만)가져온다.

{
    message:'ok',
    data : [
        {title :}
        {title :}
        {title :}
        {title :}
        ....
    ]
}


case 2 : num != 0
file을 직접적으로 가져오는 경우로 wiki_num = num 과 함께 num의 서브위키에 해당하는 파일들의 title 목록을 추가로 준다.
{
    message:'ok',
    data : {
        num :
        title :
        content :
        parent_num :
        likes:
        dislikes:
        ....
        sub : [
            {title : }
            {title : }
            {title : }
            {title : }
        ]
    }

}


 */
module.exports = (req, res) => {
    let num = req.params.num
    let user_id = req.decoded.user.id
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
    const getWikis = (connection) => {
        return new Promise(
            (resolve, reject) => {
                let sql
                if(num == 0){
                    sql = `select title from wikis where user_id = ? AND parent_num = ?`
                }
                else {
                    sql = 'select * from wikis where user_id = ? AND num = ?'
                }
                console.log("sql :::::" + sql)
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
    const getSubWiki = (obj) => {
        let {connection, data} = obj
        if(num == 0){
            connection.release
            return {message : 'ok', data: data}
        }
        return new Promise(
            (resolve, reject) => {
                let sql = `select title from wikis where user_id = ? AND parent_num = ?`
                connection.query(sql, [user_id, num], (err, rows) => {
                    if(err){
                        reject(err)
                        return
                    }
                    resolve({message:'ok', data : data , sub : rows})
                    connection.release
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
        .then(getWikis)
        .then(getSubWiki)
        .then(respond)
        .catch(onError)
}
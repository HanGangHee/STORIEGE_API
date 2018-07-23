
/*
POST /user/auth/
{
    userID,
    pwd,
}
 */
import db from "../../config/mariaDB"

exports.auth = (req, res) => {
    db.getConnection((err , connection) => {
        if(err){
            console.log("[DB Connection Error]")
            return
        }
        if(!req.body){
            console.log("[UserData is EMPTY]")
            return
        }
        let sql = `select * from user where userID="${req.body.userID}" AND pwd="${req.body.pwd}"`
        connection.query(sql, (err, rows) => {
            if(err){
                console.log("[DB Connection Success but query Error]")
                return
            }
            console.log("[DB Connection Success] auth data size = ", rows.length)
            res.send(JSON.stringify(rows[0]))
        })
        connection.release //mariadb connection pool에 release


    })
}
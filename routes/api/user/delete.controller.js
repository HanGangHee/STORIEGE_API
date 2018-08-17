import mariaDB from '../../../services/mariaDB'

/*
DELETE /api/user
receive : user_id
 */

module.exports = (req, res) => {
        const user_id = req.body.id;
        if(!user_id){
            res.json({message: "User Info Empty !"})
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
        const deleteUser = (connection) => {
            let sql = `delete from users where id = ?`
            return new Promise(
                (resolve, reject) => {
                    connection.query(sql, [user_id], (err, rows) => {
                        if(err){
                            reject(err)
                            return
                        }
                        resolve(connection)
                    })
                }
            )
        }

        const deleteWikis = (connection) => {
            let sql = `delete from wikis where user_id = ?`
            return new Promise(
                (resolve, reject) => {
                    connection.query(sql, [user_id], (err, rows) => {
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
            .then(deleteUser)
            .then(deleteWikis)
            .then(respond)
            .catch(onError)
}
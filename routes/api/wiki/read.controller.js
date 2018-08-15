import mariaDB from '../../../services/mariaDB'

/*
Get /api/wiki/:user_id
 */

module.exports = (req, res) => {
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
}
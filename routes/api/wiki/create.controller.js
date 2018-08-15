import mariaDB from '../../../services/mariaDB'

/*
Post /api/wiki
receive : wiki_info

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
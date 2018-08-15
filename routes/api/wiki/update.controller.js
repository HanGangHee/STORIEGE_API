import mariaDB from '../../../services/mariaDB'

/*
Put /api/wiki
receive : wiki_num

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
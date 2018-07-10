import mysql from 'mysql'
import secret from '../credential'
exports.dbConnect = function(){
    try {
        var db = mysql.createConnection(secret)
        db.connect();
        console.log("mariaDB connect success!")
    }
    catch(e) {
        console.error(e.stack)
    }
    return db
}
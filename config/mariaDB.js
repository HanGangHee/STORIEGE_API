import mysql from 'mysql'
import {dbConfig} from '../credential'

let db
try {
    db = mysql.createPool(dbConfig)
    console.log("mariaDB pool create!")
}
catch(e) {
    console.error("mariaDB pool create fail  !!!!")
}

module.exports = db
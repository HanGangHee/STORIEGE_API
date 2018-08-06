import mysql from 'mysql'
import {mariaDB_config} from '../credential'

let db
try {
    db = mysql.createPool(mariaDB_config)
    console.log("mariaDB pool create!")
}
catch(e) {
    console.error("mariaDB pool create fail  !!!!")
}

module.exports = db
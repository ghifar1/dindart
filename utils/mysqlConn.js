const mysql = require("mysql");

const conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "rtdinda",
});

class MysqlConn {
	constructor() {
		this.connection = conn;
		this.connection.connect();
		this.sql = '';
	}

	async query(qry, value) {
		const qryPromise = new Promise((resolve, reject) => {
			const res = this.connection.query(qry, value, (error, result, fields)=>{
                if(error) reject(error)
                resolve({result, fields})
            });
		});

		return qryPromise;
	}
}

module.exports = new MysqlConn();

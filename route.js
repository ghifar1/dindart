const Cryptor = require("./utils/Cryptor");
const mysqlConn = require("./utils/mysqlConn");
const router = require("express").Router();

router.get("/", (req, res) => {
	return res.render("welcome", {
		biskuit: req.cookies,
	});
});

router.get("/home", (req, res) => {
	if (!req.cookies.login) {
		return res.redirect("/login");
	}
	return res.render("home", {
		biskuit: req.cookies,
	});
});

router.get("/cari", (req, res) => {
	if (!req.cookies.login) {
		return res.redirect("/login");
	}
	return res.render("search", {
		biskuit: req.cookies,
	});
});

router.post("/cari", async (req, res) => {
	if (!req.cookies.login) {
		return res.redirect("/login");
	}
	let data = await mysqlConn.query("SELECT * FROM penduduk WHERE nik = ?", [
		req.body.nik,
	]);
	return res.render("search", {
		data: data.result,
		biskuit: req.cookies,
	});
});

router.get("/data", async (req, res) => {
	if (!req.cookies.login) {
		return res.redirect("/login");
	}
	try {
		let data = await mysqlConn.query("SELECT * FROM penduduk");
		return res.render("data", {
			dataPenduduk: data.result,
			biskuit: req.cookies,
		});
	} catch (e) {
		console.log(e);
	}
});

router.get("/edit/:id", async (req, res) => {
	if (!req.cookies.login) {
		return res.redirect("/login");
	}
	try {
		let data = await mysqlConn.query(
			"select * FROM penduduk WHERE id = ?",
			[req.params.id]
		);
		return res.render("data", {
			dataPenduduk: data.result ?? [],
			dataEdit: data.result[0] ?? "",
			biskuit: req.cookies,
		});
	} catch (error) {}
});

router.post("/data", async (req, res) => {
	if (!req.cookies.login) {
		return res.redirect("/login");
	}
	const date = new Date();
	try {
		if (req.body.edit) {
			await mysqlConn.query(
				`UPDATE penduduk SET nama = ?, nik = ?, jenis_kelamin = ?, tanggal_lahir = ?, agama = ?, 
				pendidikan = ?, jenis_pekerjaan = ?, golongan_darah = ?, alamat = ?, created_at = ?
				WHERE id = ?
				`,
				[
					req.body.nama,
					req.body.nik,
					req.body.jenis_kelamin,
					req.body.tanggal_lahir,
					req.body.agama,
					req.body.pendidikan,
					req.body.jenis_pekerjaan,
					req.body.golongan_darah,
					req.body.alamat,
					date.toISOString().split("T")[0],
					req.body.edit,
				]
			);
			return res.redirect("/data");
		}

		await mysqlConn.query(
			`INSERT INTO penduduk (nama, nik, jenis_kelamin, tanggal_lahir, agama, pendidikan, jenis_pekerjaan, golongan_darah, alamat, created_at)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				req.body.nama,
				req.body.nik,
				req.body.jenis_kelamin,
				req.body.tanggal_lahir,
				req.body.agama,
				req.body.pendidikan,
				req.body.jenis_pekerjaan,
				req.body.golongan_darah,
				req.body.alamat,
				date.toISOString().split("T")[0],
			]
		);
		return res.redirect("/data");
	} catch (e) {
		console.log(e);
	}
});

router.post("/data/delete", async (req, res) => {
	if (!req.cookies.login) {
		return res.redirect("/login");
	}
	try {
		await mysqlConn.query(`DELETE FROM penduduk WHERE id = ?`, [
			req.body.id,
		]);
		return res.redirect("/data");
	} catch (error) {
		console.error(error);
	}
});

router.get("/test", (req, res) => {
	let test = Cryptor.hash("hello").toString();
	mysqlConn
		.query(
			"INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
			["ghifari", test, "ketua RT"]
		)
		.then((res) => {
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		});
	return res.send(test);
});

router.get("/login", (req, res) => {
	if (req.cookies.login) {
		return res.redirect("/home");
	}
	return res.render("login", {
		biskuit: req.cookies,
	});
});

router.post("/login", async (req, res) => {
	try {
		let record = await mysqlConn.query(
			`SELECT username, password FROM users WHERE username = ? LIMIT 1`,
			[req.body.username]
		);
		const checkPass = Cryptor.attempt(
			record?.result[0]?.password,
			req.body.password
		);

		if (checkPass) {
			if (!req.cookies.login) {
				res.cookie("login", "OK");
			}
		}

		res.header("Content-Type: application/json");
		return res.redirect("/home");
	} catch (err) {
		console.log(err);
	}
});

router.get("/logout", (req,res)=>{
	res.clearCookie('login');
	return res.redirect('/login')
})

module.exports = router;

let express = require("express");
let router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
let jwt = require("jsonwebtoken");
const { appendFile } = require("fs");

router.post("/register", async (req, res) => {
  const { email, name, mobile, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      parseInt(mobile),
    ]);
    if (user.rows.length > 0) {
      return res.status(401), res.send("User alredy exsit..");
    } else {
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);

      let newUser = await pool.query(
        "INSERT INTO users (name, email,mobile,password) VALUES ($1, $2, $3,$4) RETURNING *",
        [name, email, parseInt(mobile), bcryptPassword]
      );
      res.status(200);
      res.json({
        name: name,
        email: email,
        mobile: mobile,
        password: bcryptPassword,
      });
    }
  } catch (err) {
    res.send("User alredy exsit..");
  }
});

router.post("/login", async (req, res) => {
  const { mobile, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE mobile = $1", [
      mobile,
    ]);

    if (user.rows.length === 0) {
  
      return res.send("Not found");
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.send("password invalid");
    } else {
      const jwtToken = jwt.sign(user.rows[0].name, "secret", (err, token) => {
        res.json({
          token: token,
          user: user.rows[0].name,
          mobile: user.rows[0].mobile,
        });
        res.status(200);
      });
    }
  } catch (err) {
    res.status(500).send("Not found");
  }
});

router.post("/getdoctordetails", async (req, res) => {
  const { category, date } = req.body;

  try {
    const doctor = await pool.query(
      "SELECT * FROM doctor WHERE (doctor_category)= $1",
      [category]
    );

    if (doctor.rows.length > 0) {
      let sendData = [];
      console.log(doctor.rows)
      doctor.rows.map((item) => {
        if (item.doctor_availabledate.includes(date)) {
          sendData.push(item);
        }
      });
      if (sendData.length > 0) {
        res.send(sendData);
      } else {
        res.send("Not available");
      }
    }
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/savedetails", async (req, res) => {
  const { name, email, doctor, date, time, mobile } = req.body;

  let newDetails = await pool.query(
    "INSERT INTO userscheduling (email,doctor,time,name,date,mobile) VALUES ($1,$2, $3,$4,$5,$6) RETURNING *",
    [email, doctor, time, name, date, mobile]
  );

  if (newDetails) {
    res.send("Success");
  }
});

router.post("/getdetails", async (req, res) => {
  const { mobile } = req.body;

  let datas = await pool.query(
    "SELECT * FROM userscheduling WHERE (mobile)=$1",
    [mobile]
  );

  if (datas.rows.length > 0) {
    res.send(datas.rows);
  }
});

module.exports = router;

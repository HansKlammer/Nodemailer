const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("yo");
});

let myMail = process.env.MAIL_HOST;
let recieverMail = process.env.MAIL_RECIEVER;
let passMail = process.env.MAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: myMail,
    pass: passMail
  }
});

const mailOptions = {
  from: myMail,
  to: recieverMail,
  subject: `Business Application from`,
  html: `
    <button>Click me</button> 
    `
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});

app.listen(5000, () => console.log("Server started..."));

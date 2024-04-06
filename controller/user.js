require("dotenv").config();

const userSchema = require("../model/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const productSchema = require("../model/product");
const product = require("../model/product");

async function handleCreate(req, res) {
  const { name, email, password } = req.body;
  const existUser = await userSchema.findOne({ email });
  if (existUser) {
    return res.status(400).json({ message: "user already exist" });
  }
  await userSchema.create({
    name,
    email,
    password,
  });
  return res.status(200).json({ message: "user created" });
}
async function handleLogin(req, res) {
  const { email, password } = req.body;
  const loginUser = await userSchema.findOne({ email, password });
  if (!loginUser) return res.json({ message: "user not found!!" });

  // jwt token
  const accessToken = jwt.sign(
    { id: loginUser.id, email: loginUser.email, name: loginUser.name },
    process.env.ACCESS_TOKEN_SECRET
  );
  res.cookie("token", accessToken, { httpOnly: true, maxAge: 360000 });

  res.status(200).json({
    message: "user logedIn",
    username: loginUser.name,
  });
}

// coming soon
async function handleForgot(req, res) {
  const { email } = req.body;
  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.json({
        message: "No account found",
      });
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "youremail@gmail.com",
        pass: "yourpassword",
      },
    });

    const mailOptions = {
      from: "youremail@gmail.com",
      to: "myfriend@yahoo.com",
      subject: "Sending Email using Node.js",
      text: " forgotten password!",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log("error aaa gyo ", error);
  }
}

async function handleLogout(req, res) {
  res.clearCookie("token");
  return res.json({ status: 200, message: "loggingOut" });
}

async function handleDashboard(req, res) {
  const token = req.cookies?.token;
  if (!token) return res.json({ status: 404, message: "Nobody are loggedin" });
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return res.json({
    status: 200,
    userEmail: decoded.email,
    userName: decoded.name,
  });
}
async function handleAddToCart(req, res) {
  const token = req.cookies?.token;
  const { clickedItem, name } = req.body;
  if (!token) return res.json({ status: 404, message: "login first" });
  await productSchema.create({
    id: clickedItem.id,
    title: clickedItem.title,
    price: clickedItem.price,
    description: clickedItem.description,
    category: clickedItem.category,
    image: clickedItem.image,
    rating: clickedItem.rating,
    user: name,
  });
  return res.json({ status: 200, message: "Added to cart" });
}

async function handleAllCart(req, res) {
  const { username } = req.body;
  const userCart = await productSchema.find({ user: username });
  return res.status(200).json(userCart);
}

module.exports = {
  handleCreate,
  handleLogin,
  handleDashboard,
  handleForgot,
  handleLogout,
  handleAddToCart,
  handleAllCart,
};

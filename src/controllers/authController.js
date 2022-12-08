const { Router } = require("express");

const router = Router();

const jwt = require("jsonwebtoken");
const config = require("../config");
const verifyToken = require("./verifyToken");
const User = require("../models/user");

router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = new User({
    username: username,
    email: email,
    password: password,
  });
  user.password = await user.encryptPassword(user.password);
  console.log(user);

  await user.save(); // Guardar en la bd
  const token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: 60 * 60 * 24, // Expira en 2 día
  });

  res.json({
    auth: true,
    token,
  });
});

router.get("/me", verifyToken, async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(404).send("Not found");
  }

  res.json(user);
});

router.get("/dashboard", verifyToken, async (req, res, next) => {
  res.json("dashboard");
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).send("Not found");
  }

  const passwordValid = await user.validatePassword(password);

  if (!passwordValid) {
    return res.status(401).json({ auth: false, token: null });
  }

  const token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: 60 * 60 * 24,
  });
  console.log(passwordValid);
  res.json({ auth: true, token: token });
});

module.exports = router;

const User = require("./user.model");
const bcrypt = require("bcryptjs");
const { json } = require("express");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign(
    { id: user._id, email: user.email },
    "c070d9702c223541d1fd48136407555f4f1da99a6e92dc53ddb74d1965f27762",
    {
      expiresIn: "1h",
    }
  );
  return {
    token,
    user,
  };
};

exports.register = async (req, res) => {
  const { email, password } = req.body;

  //checking to see if email already exists
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(400).json({ error: "Email already in used" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({ ...req.body, password: hashedPassword });

  // generate token
  const token = generateToken(user);

  res.status(201).json({ token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }
  // generate token
  const token = generateToken(user);

  res.status(200).json({ token});
};

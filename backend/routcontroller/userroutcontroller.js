const { User } = require("../Models/userModels.js");
const bcrypt = require("bcryptjs");
const { jwtToken } = require("../utils/jwtwebToken.js");

const userRegister = async (req, res) => {
  try {
    const { fullname, username, email, gender, password, profilepic } = req.body;

    const user = await User.findOne({ username ,  email });
    if (user) {
      return res.status(500).send({ success: false, message: "Username or Email already exists" });
    }

    const hashpassword = bcrypt.hashSync(password, 10);
    const profileBoy = profilepic || `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const profileGirl = profilepic || `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const profilepicUrl = gender === 'male' ? profileBoy : profileGirl;

    const newUser = new User({
      fullname,
      username,
      email,
      gender,
      password: hashpassword,
      profilepic: profilepicUrl
    });

    if (newUser) {
      await newUser.save();
      jwtToken(newUser._id, res);
    } else {
      return res.status(500).send({ success: false, message: "Invalid User Data" });
    }

    res.status(201).send({
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      email: newUser.email,
      profilepic: newUser.profilepic
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
    console.log(error);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ success: false, message: "Email doesn't exist. Please register." });
    }

    const comparePass = bcrypt.compareSync(password, user.password || "");

    if (!comparePass) {
      return res.status(401).send({ success: false, message: "Incorrect email or password." });
    }

    jwtToken(user._id, res);
    res.status(200).send({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      profilepic: user.profilepic,
      message: "Login successfully!"
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
    console.log(error);
  }
};

const userLogout = async (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).send({ message: "User logged out!" });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
    console.log(error);
  }
};

module.exports = { userRegister, userLogin, userLogout };

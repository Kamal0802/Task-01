const userModel = require("./data-model");

const jwt = require("jsonwebtoken");

const bc = require("bcrypt");

const signup = async (req, res, next) => {
  try {
    const newUser = new userModel(req.body);

    await newUser.save();

    console.log(newUser._id);

    const token = jwt.sign({ id: newUser._id }, "sdjha-123jdj-qwe21", {
      expiresIn: 100000,
    });

    console.log(token);

    res.status(201).json({
      status: "succsess",
      token,
      newUser:{
       userName:newUser.userName,
       _id:newUser._id 
      },
      messege: "user created",
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, Password } = req.body;

    console.log(email, Password);

    const user = await userModel.findOne({ email }).select("+Password");

    if (!user) {
      return res
        .status(404)
        .json({ status: "failure", message: "User not found" });
    }

    const isPasswordCorrect = await bc.compare(Password, user.Password);

    if (isPasswordCorrect) {
      const token = jwt.sign({ id: user._id }, "sdjha-123jdj-qwe21", {
        expiresIn: 100000,
      });

      res.status(200).json({
        status: "success",
        token,
        newUser:{
          userName:user.userName,
          _id:user._id 
         }
      });
    } else {
      res
        .status(401)
        .json({ status: "failure", message: "Incorrect password" });
    }
  } catch (err) {
    res.status(400).json({ status: "failure", message: err.message });
  }
};

module.exports = {
  signup,
  login,
};

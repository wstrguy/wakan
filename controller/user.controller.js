const User = require("../models/user.model");
const bcrypt = require("bcrypt"); // bcryptjs or argon2
const Wallet = require("../models/wallet.model");
const jwt = require("jsonwebtoken");

exports.userSignup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    // Check if user already exists
    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    //create wallerId
    const uniqueId = Math.floor(Math.random() * 100000000)
      .toString()
      .substring(0, 10);
    const WalletId = "45" + uniqueId; // TODO: resolve 9 and 10 digit walletId

    // create wallet
    const wallet = await Wallet.create({
      userId: user._id,
      walletId: WalletId,
    });

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};


exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // check if user exists
        const userExistInDb = await User.findOne({ email });

        console.log(userExistInDb);

        if (!userExistInDb) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // match password
        const isPasswordValid = await bcrypt.compare(password, userExistInDb.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        // tokenize payload
        const token = await jwt.sign({
            email: userExistInDb.email,
            id: userExistInDb._id,
            firstname: userExistInDb.firstname,
        },
            process.env.JWT_SECRET,
            {
                expiresIn: "3m",
            }
        );

        res.cookie("token",  {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 3, // 3 minutes

        })

        return res.status(200).json({
            message: "Login successful",
            token,
        });



        

    } catch (error) {
         return res.status(500).json({
           message: "Something went wrong",
           error: error.message,
         });
    }
}

exports.userLogout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            message: "Logout successful",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
}
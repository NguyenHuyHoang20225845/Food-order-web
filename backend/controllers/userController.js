import userModel from "../modals/userModel.js";
import jwt from 'jsonwebtoken';
import bycrypt from 'bcryptjs';
import validator from 'validator';

// LOGIN USER
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User Doesn't Exist" })
        }

        const isMatch = await bycrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }

        const token = createToken(user);
        res.json({ success: true, token, role: user.role, email: user.email })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const createToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET
    )
}

// REGISTER USER
const registerUser = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        // CHECKING IS USER ALREADY EXISTS
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User Already Exists" })
        }

        // VALIDATING EMAIL FORMAT AND STRONG PASSWORD
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please Enter A Valid Email" })
        }

        // PASSWORD IS STRONG
        if (password.length < 8) {
            return res.json({ success: false, message: "Please Enter A Strong Password" })
        }

        // HASING USER PASSWORD
        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password, salt);

        const newUser = new userModel({
            username: username,
            email: email,
            password: hashedPassword
        })
        const user = await newUser.save()

        const token = createToken(user)
        res.json({ success: true, token, role: user.role, email: user.email })

    }

    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { loginUser, registerUser };

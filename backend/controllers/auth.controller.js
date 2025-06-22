import bcrypt from 'bcryptjs'
import User from "../models/user.model.js";
import generatewebtoken from "../Utils/generatewebtoken.js";


export const signup = async (req, res) => {
    try {
        const { name, email, password, ConfirmPassword, gender } = req.body;
   
        if (password !== ConfirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

       
        const user = await User.findOne({ email });
    
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

       
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            gender,
        });

        await newUser.save();
        const token = generatewebtoken(newUser._id, res);
        
        
        return res.status(201).json({
            name: newUser.name,
            email: newUser.email,
            gender: newUser.gender,
        });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ error: "Server error during signup" });
    }
};

export const login =async(req,res)=>{
       
   const {email, password}=req.body;
    const user=await User.findOne({email});
    const ispasswordcorrect=await bcrypt.compare(password,user?.password || "");

    if(user && ispasswordcorrect){
       const token= generatewebtoken(user._id, res);
        
            return res.status(200).json({
                name: user.name,
                email: user.email,
                gender: user.gender,
            });
    }
    else {
        return res.status(400).json({error:"invalid credential"});
    }
}
export const logout = (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "strict",
        });
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


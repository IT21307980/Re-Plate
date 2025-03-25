const User = require('../models/userModels');
const jwt = require('jsonwebtoken');

//temporary enryption key
 JWT_SECRET = 'k12'

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// Register User
const registerUser = async (req, res) => {
    const { name, contact, location, email, password } = req.body;
   // console.log("Data arrived")

    try {
       const userExists = await User.findOne({ email });

        if (userExists) {
            console.log("User already exists");
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const user = await User.create({ name, contact, location, email, password });
        console.log(user);

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                //token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                contact: user.contact,
                location: user.location,
                //token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    const { _id, name, contact, location, email } = req.body;

    try{
        const user = await User.findOne({ _id });

        // Update user fields
        if (name) user.name = name;
        if (contact) user.contact = contact;
        if (location) user.location = location;
        if (email) user.email = email;

        await user.save();

        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            contact: user.contact,
            location: user.location,
            //token: generateToken(user._id),
        });
    }
    catch(err){
        res.status(500).json({message: "Invalid data update"})
    }
}


module.exports = { registerUser, loginUser, updateUser };

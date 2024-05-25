
import User from "../models/User";
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        return next(err);
    }

    if (!users) {
        return res.status(500).json({ message: "Unexpected error occured" });
    }
    return res.status(200).json({ users });

};
export const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name && name.trim() == "" &&
        !email && email.trim == "" &&
        !password && password.trim == "") {
        return res.status(422).json({ message: "Invalid Inputs" });
    }
    let user;
    try {
        user = new User({ name, email, password: bcrypt.hashSync(password) });
        user = await user.save();
    } catch (err) {
        return next(err);
    }
    if (!user) {
        return res.status(500).json({ message: "user AllReady exist" });
    }
    return res.status(200).json({id:user._id})
}

export const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    if (
        name && name.trim === "" &&
        email && email.trim() === "" &&
        password && password.trim() === ""
    ) {
        return res.status(422).json({ message: "Invalid Inputs" });
    }
    let user;
    const hashedPassword = bcrypt.hashSync(password);
    try {
        user = await User.findByIdAndUpdate(id,
            {
                name,
                email,
                password: hashedPassword
            });
    } catch (err) {
        return console.log(err);
    }
    if (!user) {
        return res.status(500).json({ message: "something went wrong" });
    }
    return res.status(200).json({ message: "update success" });
};


export const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!(email && password)) {
       return res.status(400).json({message:"All input is required"});
    }
    let user;
    try {
        user = await User.findOne({ email });
    } catch (error) {
        return error
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        return res.status(400).json({message:"something went wrong "});
    }
    if (!user) {
        return res.status(500).json({ message: "something went wrong" });
    }
    return res.status(200).json(user);
};



export const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findByIdAndDelete(id);

    } catch (err) {
        return console.log(err);
    }
    if (!user) {
        return res.status(500).json({ message: "something went wrong" })
    }
    return res.status(200).json({ message: "deleted sucessfully !!" })
}


// Create a route to get a user by ID.
export const getUser = async (req, res) => {
    const id = req.params.id;
  
    const user = await User.findById(id);
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    // Return the user.
    res.json(user);
  };



import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createdAccessToken } from '../libs/jwt.js'
export const register = async (req, res) => {
    const { email, password, username } = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            email,
            password: passwordHash,
            username,
        })
        const userSaved = await newUser.save();
        const token = await createdAccessToken({ id: userSaved._id });
        res.cookie('token', token)
        res.json({
            id: userSaved._id,
            email: userSaved.email,
            username: userSaved.username,
            createdAt: userSaved.createdAt,
            updateAt: userSaved.updateAt,
        });
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
};

export const login = async(req, res) => {
    const { email, password } = req.body;

    try {

        const  UserFound = await User.findOne({ email})

        if (!UserFound) return   res.status(404).json({message: 'User not found'})

        const isMatch = await bcrypt.compare(password, UserFound.password);
        if (!isMatch) res.status(404).json({message: 'unauthorized'})

     
        const token = await createdAccessToken({ id: UserFound._id });
        res.cookie('token', token)
        res.json({
            id: UserFound._id,
            email: UserFound.email,
            username: UserFound.username,
            createdAt: UserFound.createdAt,
            updateAt: UserFound.updateAt,
        });
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
};


export const logout = (req, res)  => {
    res.cookie('token', "", { expires: new Date(0)});
    return res.sendStatus(200);
};

export const profile =  async (req, res) => {
  const userFound = await User.findById(req.user.id)

  if(!userFound) return res.status(400).json({message: 'User not found'});

  return res.json({
    id: userFound._id,
    email: userFound.email,
    username: userFound.username,
    createdAt: userFound.createdAt,
    updateAt: userFound.updateAt,
});
 
    
};
import generateResponseMessage from '../global/index.js';
import { generateAccessToken } from '../middleware/auth.js';
import UserModel from '../models/User.js';
import { config } from 'dotenv';
import crypto from 'crypto';

config();

const userCtrl = {
    async register(req, res){
        const { email } = req.body;

        const isEmailExists = await UserModel.findOne({ email });
        if (isEmailExists) {
            return res.status(409).json(generateResponseMessage(409, 'User email already exists', null));
        }
    
        const newUser = await UserModel(req.body);
        await newUser.save();
    
        res.status(201).json( generateResponseMessage(201, "New user has been created", newUser) );
    
    },
    async login(req, res) {
        const { email, password } = req.body;
        const hashedPassword = crypto
            .pbkdf2Sync(password, process.env.SECRET_SALT, 100000, 64, 'sha512')
            .toString('hex'); 
    
        const user = await UserModel.findOne( { email, password: hashedPassword});
    
        if ( user ) {
            const { password, ...userRestData } = user.toObject();
            const token = generateAccessToken(userRestData);
            return res.status(200).json( generateResponseMessage(200, "Access token generated", token) );
        }
    
        res.status(409).json( generateResponseMessage(409, 'Atuhentication Error', null) );     
    },
    async changeUserInfo(req, res) {
        await UserModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json( generateResponseMessage(200, "User info updated", null));
    }
}

export default userCtrl;
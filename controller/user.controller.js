import generateResponseMessage from '../global/index.js';
import { generateAccessToken } from '../middleware/auth.js';
import UserModel from '../models/User.js';
import { config } from 'dotenv';
import crypto from 'crypto';

config();

const userCtrl = {
    async register(req, res){
        const { firstName, lastName, gender, birthDate, phone, email, password, isAdmin } = req.body;
        const { path } = req.file;
        const isEmailExists = await UserModel.findOne({ email });
        if (isEmailExists) {
            return res.status(409).json(generateResponseMessage(409, 'User email already exists', null));
        }

        const isPhoneExists = await UserModel.findOne({ phone });
        if (isPhoneExists) {
            return res.status(409).json(generateResponseMessage(409, 'This phone number already exists', null));
        }
    
        const newUser = await UserModel({
            firstName,
            lastName,
            profilePicture: path,
            gender,
            birthDate, 
            phone,
            email,
            password,
            isAdmin
        });
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
        const { email, phone } = req.body;
        
        if (email) {
            const users = await UserModel.findOne({ email });
            if (users) return res.status(409).json(generateResponseMessage(409, 'User email already exists', null));
        }

        if (phone) {
            const usersPhone = await UserModel.findOne({ phone });
            if (usersPhone) return res.status(409).json(generateResponseMessage(409, 'User phone already exists', null));
        }

        if (req.file) {
            await UserModel.findByIdAndUpdate(req.params.id, {
                profilePicture: req.file.path,
                ...req.body,
            });
        }else {
            await UserModel.findByIdAndUpdate(req.params.id, req.body);
        }

        res.status(200).json( generateResponseMessage(200, "User info updated", null));
    },
    async deleteUser(req, res) {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        if (user){ 
            res.status(204).json( generateResponseMessage(204, 'User deleted successfully', null));
        }
        else {
            res.status(404).json( generateResponseMessage(404, 'User not found', null));
        }
    },
}

export default userCtrl;
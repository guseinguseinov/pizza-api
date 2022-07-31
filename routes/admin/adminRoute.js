import express from "express";
import { admin } from "../../controller/user.controller.js";
import { authenticateToken } from "../../middleware/auth.js";

const adminRoute = express.Router();

adminRoute.post('/admin/login', admin.login);
adminRoute.get('/users', authenticateToken ,admin.getAllusers);
adminRoute.get('/users/:id', authenticateToken, admin.getUser);
adminRoute.patch('/users/:id', authenticateToken, admin.changeUserInfo);
adminRoute.delete('/users/:id', authenticateToken, admin.deleteUser);


export default adminRoute;
import bcrypt from "bcrypt";
import { User } from "../models/User.mjs";

export function loginUserController(req, res) {
    const {username, password} = req.body;
    User.findOne({username: username}, (error, user) => {
        if(user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if(same) { 
                    req.session.userId = user._id;
                    res.redirect("/");
                } else {
                    req.flash("validationErrors", "Invalid Password");  
                    req.flash("data", req.body);
                    res.redirect("/auth/login");
                }
            });
        } else {
            req.flash("validationErrors", "Invalid Username");
            req.flash("data", req.body);
            res.redirect("/auth/login");
        }
    })
}
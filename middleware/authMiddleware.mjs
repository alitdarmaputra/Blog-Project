import { User } from "../models/User.mjs";

export async function authMiddleware(req, res, next) {
    User.findById(req.session.userId, (error, user) => {
        if(error || !user) {
            return res.redirect("/");
        }
        next();
    });
}
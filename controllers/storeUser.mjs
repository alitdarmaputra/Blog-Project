import { User } from "../models/User.mjs";

export async function storeUserController (req, res) {
    await User.create(req.body, (error, user) => {
        if(error) {
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
            req.flash("validationErrors", validationErrors);
            req.flash("data", req.body);
            res.redirect("/auth/register");
        } else {
            res.redirect("/");
        }
    });
};
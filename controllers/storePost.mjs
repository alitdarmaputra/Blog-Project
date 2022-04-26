import path from "path";
import { BlogPost } from "../models/BlogPost.mjs";
import { User } from "../models/User.mjs";

export async function storePostController(req, res) {
    const __dirname = path.resolve();

    const user = await User.findById(req.session.userId);
    let image = req.files.image;
    image.mv(path.resolve(__dirname, "public/img", image.name));

    BlogPost.create({
        ...req.body,
        image: "/img/" + image.name,
        userid: req.session.userId
    }, (error, post) => {
        if(error) {
            console.log(error);
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
            req.flash("validationErrors", validationErrors);
            req.flash("data", req.body);
            return res.redirect("/post/new");
        } else {
            return res.redirect("/");
        }
    })
}
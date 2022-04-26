import { BlogPost } from "../models/BlogPost.mjs";

export async function homeController (req, res) {
    const blogposts = await BlogPost.find({}).populate("userid");
    console.log(req.session);

    return res.render("index", { 
        blogposts
    });
};
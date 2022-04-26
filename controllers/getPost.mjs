import { BlogPost } from "../models/BlogPost.mjs";

export async function getPostController (req, res) {
    const blogpost = await BlogPost.findById(req.params.id).populate("userid");
    return res.render("post", {
        blogpost
    });
};
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: [true, "please provide title"]
    },
    body: {
        type: "String",
        required: [true, "please provide body"]
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    datePosted:{ /* can declare property type with an object like this because we need 'default' */
        type: Date,
        default: new Date()
    },
    image: String
});

export const BlogPost = mongoose.model("BlogPost", BlogPostSchema);


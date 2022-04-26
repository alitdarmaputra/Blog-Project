import mongoose from "mongoose";
import bcrypt from "bcrypt";
import uniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Please provide username"]
    },
    password: {
        type: String,
        required: [true, "Please provide password"]
    } 
});

UsersSchema.plugin(uniqueValidator);

UsersSchema.pre("save", function(next) {
    const user = this;
    
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next();
    });
});

export const User = mongoose.model("User", UsersSchema);
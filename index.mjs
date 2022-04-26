import express from "express";
import ejs from "ejs";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import exspressSession from "express-session";
// Controller
import { newPostController } from "./controllers/newPost.mjs";
import { homeController } from "./controllers/home.mjs";
import { getPostController } from "./controllers/getPost.mjs";
import { storePostController } from "./controllers/storePost.mjs";
import { newUserController } from "./controllers/newUser.mjs";
import { storeUserController } from "./controllers/storeUser.mjs";
import { loginController } from "./controllers/login.mjs";
import { loginUserController } from "./controllers/loginUser.mjs";
import { logoutController } from "./controllers/logout.mjs";

// Middleware
import { validateMiddleWare } from "./middleware/validationMiddleware.mjs";
import { authMiddleware } from "./middleware/authMiddleware.mjs";
import { redirectAuthMiddleware } from "./middleware/redirectIfAuthenticatedMiddleware.mjs";
import flash from "connect-flash";

mongoose.connect("mongodb+srv://alitdarmaputra:denpasar05042002@cluster0.djtbx.mongodb.net/my_database", {useNewUrlParser: true});

const app = new express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(fileUpload());
app.use("/posts/store/",validateMiddleWare);
app.set("view engine", "ejs");

app.use(exspressSession({
    secret: "kelinci putih",
    resave: true,
    saveUninitialized: true    
}));

app.use(flash());

global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

let port = process.env.PORT;
if(port == null || port == "") {
    port = 4000;
}

app.listen(port, () => {
    console.info("App listening on port 4000");
});

app.get("/", homeController);
app.get("/post/new", authMiddleware, newPostController);
app.post("/posts/store", authMiddleware, storePostController);
app.get("/post/:id", getPostController);
app.get("/auth/register", redirectAuthMiddleware, newUserController);
app.post("/users/register", redirectAuthMiddleware, storeUserController);
app.get("/auth/login", redirectAuthMiddleware, loginController);
app.post("/users/login", redirectAuthMiddleware, loginUserController);
app.get("/auth/logout", logoutController);
app.use((req, res) => res.render("notfound"));
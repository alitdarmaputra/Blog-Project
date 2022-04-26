export function newPostController(req, res) {
    if(req.session.userId) {
        let title = "";
        let body = "";
        const data = req.flash("data")[0];

        if(typeof data != "undefined") {
            title = data.title,
            body = data.body
        }

        res.render("create", {
            errors : req.flash("validationErrors"),
            title : title,
            body: body,
            CreatePost: true
        });
    } else {
        res.redirect("/auth/login");
    }
}
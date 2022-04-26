export function logoutController(req, res) {
    req.session.destroy(() => {
        res.redirect("/");
    });
}
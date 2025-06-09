import passport from "passport"

export const googleAuth = passport.authenticate('google', {
    scope: ['profile', 'email']
})


export const googleCallBack = passport.authenticate('google', {
    failureRedirect: '/',
    session: true
})


export const dashboard = async (req, res) => {
    try {
        if (!req.user) return res.redirect("/")
        res.send(`<h1>Welcome ${req.user.name}</h1><img src="${req.user.avatar}" style="width:100px"/>`);
    } catch (error) {
        console.log("error while going to dashboard", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }
}


export const logout = async (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).send("Error logging out");
        }
        res.redirect("/"); // Redirect to home or login page after logout
    });
}
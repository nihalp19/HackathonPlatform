

export const  adminRoute = (req, res, next) => {
    if (!req.user || !req.user.roles === "admin") {
        return res.status(400).json({ success: false, message: "not authorized" })
    }
    next()
}
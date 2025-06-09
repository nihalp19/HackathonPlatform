export const protectRoute = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next(); // User is logged in, proceed to the route
    }
    return res.status(401).json({ message: "Unauthorized" });
};

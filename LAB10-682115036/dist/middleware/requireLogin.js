"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireLogin = void 0;
// Step 4: Protect routes with middleware 
const requireLogin = (req, res, next) => {
    // Check if session has a userId
    if (!req.session || !req.session.userId) {
        return res.redirect("/");
    }
    // User is logged in, proceed to the next middleware or route handler
    next();
};
exports.requireLogin = requireLogin;

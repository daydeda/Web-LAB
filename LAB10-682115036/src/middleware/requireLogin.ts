import { Request, Response, NextFunction } from "express";

// Step 4: Protect routes with middleware 
export const requireLogin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session || !req.session.userId) {
    return res.redirect("/?q=need-login");
  }
  next();
};

import { Router } from "express";
import passport from "passport";

const router = Router();

// GET the user from the session
router.get("/", (req, res) => {
  if (req.user) {
    res.status(200).json({
      user: req.user,
      success: true,
    });
  } else {
    res.status(401).json({
      success: false,
    });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.FRONTEND_URL || "http://localhost:3000");
});

// Google OAuth
router.get("/google", (req, res) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })(req, res);
});

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL || "http://localhost:3000",
    failureFlash: true,
    failureRedirect: "/login",
  })
);

export default router;

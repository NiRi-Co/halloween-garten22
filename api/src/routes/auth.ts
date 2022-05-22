import { Router } from "express";
import * as utils from "../lib/utils"
import { Document } from "mongoose";
import passport from "passport";
import User from "../models/User";

const router = Router()

router.post("/login", (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then((user) => {

            if (!user) {
                return res.status(401).json({ success: false, msg: "could not find user" });
            }

            // Function defined at bottom of app.js
            const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

            if (isValid) {

                const tokenObject = utils.issueJWT(user);

                res.status(200).json({ success: true, user: user, token: tokenObject.token, expiresIn: tokenObject.expires });

            } else {

                res.status(401).json({ success: false, msg: "you entered the wrong password" });

            }

        })
        .catch((err) => {
            next(err);
        });
})

router.post("/register", async (req, res, next) => {

    const tempUser = await User.findOne({ username: req.body.username })

    if (tempUser) {
        return res.status(400).json({ message: "Username already in use" });
    }

    const saltHash = utils.genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;


    const newUser = new User({
        username: req.body.username,
        hash: hash,
        salt: salt
    });

    try {

        newUser.save()
            .then((user: Document) => {
                const jwt = utils.issueJWT(user)

                res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires });
            });

    } catch (err) {

        res.json({ success: false, msg: err });

    }

})

router.get("/protected", passport.authenticate("jwt", { session: false }), (req, res, next) => {
    res.json({ message: "success", user: req.user })
})



export default router
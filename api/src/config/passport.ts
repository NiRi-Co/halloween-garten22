import fs from "fs";
import path from "path";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { models } from "mongoose";

const User = models.User

const pathToKey = path.join(__dirname, "../..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf-8");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
};

const strategy = new JwtStrategy(options, (payload, done) => {
    User.findOne({_id: payload.sub})
        .then((user) => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch(err => done(err, null));
})

export default (passport: any) => {
    passport.use(strategy)
}
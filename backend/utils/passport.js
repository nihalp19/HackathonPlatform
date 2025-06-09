import USER from "../models/user.model.js";
import passport from "passport"

import { Strategy as GoogleStrategy } from "passport-google-oauth20"

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const user = await USER.findById(id)
    done(null, user)
})



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},async (accessToken,refreshToken,profile,done) => {
    try {
        let user = await USER.findOne({googleId : profile.id})


        if(!user){
            user = await USER.create({
                googleId : profile.id,
                name : profile.displayName,
                email : profile.emails[0].value,
                avatar : profile.photos[0].value
            })
        }

        done(null,user)
    } catch (err) {
     done(err,null)   
    }
}))
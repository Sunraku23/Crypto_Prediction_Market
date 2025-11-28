const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('🔐 Google Profile:', profile.displayName);

    // Cari user by googleId
    let user = await User.findOne({ googleId: profile.id });
    if (user) return done(null, user);

    // Cari user by email
    const email = profile.emails?.[0]?.value;
    if (email) {
      user = await User.findOne({ email: email });
      if (user) {
        user.googleId = profile.id;
        user.avatar = profile.photos?.[0]?.value || '';
        user.isVerified = true;
        await user.save();
        return done(null, user);
      }
    }

    // Buat user baru
    user = await User.create({
      googleId: profile.id,
      name: profile.displayName,
      email: email || `google_${profile.id}@temp.com`,
      avatar: profile.photos?.[0]?.value || '',
      isVerified: true
    });

    console.log('✅ New Google user:', user.email);
    return done(null, user);

  } catch (error) {
    console.error('❌ Google OAuth Error:', error);
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
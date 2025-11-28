// const passport = require('passport');
// const generateToken = require('../utils/generateToken');

// // Initiate Google OAuth
// const googleAuth = passport.authenticate('google', {
//   scope: ['profile', 'email']
// });

// // Google OAuth callback - SIMPLIFIED
// const googleCallback = async (req, res, next) => {
//   passport.authenticate('google', { session: false }, (err, user) => {
//     if (err) {
//       console.error('❌ Google OAuth callback error:', err);
//       return res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
//     }

//     if (!user) {
//       console.error('❌ No user returned from Google OAuth');
//       return res.redirect(`${process.env.CLIENT_URL}/login?error=user_not_found`);
//     }

//     try {
//       // Generate JWT token
//       const token = generateToken(user._id);
      
//       console.log('✅ Google OAuth Success for user:', user.email);
//       console.log('🔐 Token generated successfully');
      
//       // Redirect ke frontend dengan token dan user data
//       const userData = encodeURIComponent(JSON.stringify({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         avatar: user.avatar,
//         role: user.role
//       }));
      
//       res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}&user=${userData}`);
      
//     } catch (error) {
//       console.error('❌ Token generation error:', error);
//       res.redirect(`${process.env.CLIENT_URL}/login?error=token_error`);
//     }
//   })(req, res, next);
// };

// module.exports = {
//   googleAuth,
//   googleCallback
// };
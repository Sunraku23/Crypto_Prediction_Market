const express = require('express');
const passport = require('passport');
const generateToken = require('../utils/generateToken');
const User = require('../models/User');

const router = express.Router();

// @desc    Initiate Google OAuth
// @route   GET /api/auth/google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// @desc    Google OAuth callback
// @route   GET /api/auth/google/callback
router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', { session: false }, async (err, user) => {
    if (err) {
      console.error('❌ Google OAuth callback error:', err);
      return res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
    }

    if (!user) {
      console.error('❌ No user returned from Google OAuth');
      return res.redirect(`${process.env.CLIENT_URL}/login?error=user_not_found`);
    }

    try {
      // Generate JWT token dengan error handling
      let token;
      try {
        token = generateToken(user._id);
        console.log('✅ Token generated successfully');
      } catch (tokenError) {
        console.error('❌ Token generation failed:', tokenError);
        return res.redirect(`${process.env.CLIENT_URL}/login?error=token_failed`);
      }
      
      console.log('✅ Google OAuth Success for user:', user.email);
      
      // Encode user data untuk URL
      const userData = encodeURIComponent(JSON.stringify({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      }));
      
      // Redirect ke frontend dengan token
      res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}&user=${userData}`);
      
    } catch (error) {
      console.error('❌ General error in OAuth callback:', error);
      res.redirect(`${process.env.CLIENT_URL}/login?error=server_error`);
    }
  })(req, res, next);
});

// @desc    Get OAuth user data
// @route   GET /api/auth/google/user/:userId
router.get('/google/user/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Get OAuth user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
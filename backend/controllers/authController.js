import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// 👉 Send OTP
export const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  // Simple 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // ⚠️ In real apps, store & expire OTP
  res.json({ otp });
};

// 👉 Register User (after OTP verified)
export const registerUser = async (req, res) => {
  const { name, email, password, branch, batch, hostel ,mobile } = req.body;

  if (!name || !email || !password || !branch || !batch || !hostel||!mobile) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      branch,
      batch,
      hostel,
      mobile,
    });

    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
};

// 👉 Login User with JWT
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request:', email, password);

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    if (!user.password) {
      return res.status(400).json({ message: 'Password not set for this account' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({userId: user._id, email: user.email}, process.env.JWT_SECRET || 'your_jwt_secret', {
      expiresIn: '1d',
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { email } = req.user; // Decoded from JWT
    const user = await User.findOne({ email }).select('-password'); // exclude password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};



export const searchUsers = async (req, res) => {
  const { name, email, batch } = req.body;
  // console.log(".askjdnfkwndawknwakdknnndakjndk.jwndekj.wendkj");
  console.log(req.body);

  try {
    const query = {
      $or: [
        name ? { name: { $regex: name, $options: 'i' } } : null,
        email ? { email: { $regex: email, $options: 'i' } } : null,
        batch ? { batch: { $regex: batch, $options: 'i' } } : null
      ].filter(Boolean) 
    };

    if (query.$or.length === 0) {
      return res.status(400).json({ success: false, message: 'Please enter at least one search field.' });
    }

    const users = await User.find(query);

    res.status(200).json({
      success: true,
      users
    });

  } catch (error) {
    console.error('Search Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while searching users.'
    });
  }
};

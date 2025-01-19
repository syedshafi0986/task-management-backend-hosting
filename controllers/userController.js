import bcrypt from 'bcrypt';
import User from '../schema/userSchema.js';
import jwt from 'jsonwebtoken';

// Function to create a JWT token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

// Register a new user
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input fields
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all the fields' });
  }

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user (password hashing is done by the pre-save middleware)
    user = new User({ name, email, password });
    await user.save();

    // Create a token
    const token = createToken(user._id);

    // Respond with success message and token
    res.status(201).json({ msg: 'User registered successfully', token });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Login a user
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email is registered
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create a token
    const token = createToken(existingUser._id);

    // Respond with the token and success message
    res.status(200).json({ token, msg: 'User logged in successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};



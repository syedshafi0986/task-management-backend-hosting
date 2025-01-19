import jwt from 'jsonwebtoken';
import User from '../schema/userSchema.js'; // Ensure this path is correct

// Middleware to require authentication
const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    const secret = 'abcdsdfklhugysfajdkhfye'; // Ensure your JWT secret is stored in the .env file

    // Check if the authorization header is present
    if (!authorization) {
        return res.status(401).json({ message: "Authorization token is required" });
    }

    // Extract the token from the authorization header
    const token = authorization.split(' ')[1];

    try {
        // Verify the token using the secret
        const { _id } = jwt.verify(token, secret);
        
        // Find the user by ID and attach it to the request object
        req.user = await User.findById(_id).select('_id'); // Attach the user role if needed

        // If user not found, return an error
        if (!req.user) {
            return res.status(401).json({ message: "User not found, request is not authorized" });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (e) {
        return res.status(401).json({ message: "Request is not authorized", error: e.message });
    }
};

export { requireAuth };

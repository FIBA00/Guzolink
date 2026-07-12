import "./env.config.js";
import jwt from "jsonwebtoken";

const SECRET = process.env.JW_SECRET || process.env.JWT_SECRET;

export default function GenerateToken(user) {
	if (!SECRET) {
		throw new Error(
			"JWT secret is missing. Set JW_SECRET in your .env file.",
		);
	}
	return jwt.sign(
		{
			id: user._id,
			email: user.email,
			role: user.role,
		},
		SECRET,
		{
			expiresIn: '2h', // Token expires in 2 hours
		},
	);
}

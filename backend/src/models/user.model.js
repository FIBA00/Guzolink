import mongoose from "../utils/mongoose.util.js";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			default: "user",
		},
		profileimage: {
			type: String,
			default: "",
		},
		shop:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Shop"
		}
	},
	{
		timestamps: true,
	},
);

UserSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;

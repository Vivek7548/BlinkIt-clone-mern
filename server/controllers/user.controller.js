import UserModel from "./../model/user.model";
import bcryptjs from "bcryptjs";

export async function registerUserController(request, response) {
    try {
        const { name, email, password } = request.body;

        if (!name || !email || !password) {
            return response.status(400).json({
                message: "Please enter name, email and password",
                error: true,
                success: false,
            });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const payload = {
            name,
            email,
            password: hashPassword,
        };

        const newUser = new UserModel(payload);
        const save = await newUser.save();

        // if user email already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return response.json({
                message: "Email already exists",
                error: true,
                success: false,
            });
        }
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}
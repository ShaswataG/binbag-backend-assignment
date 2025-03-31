import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        address: { type: String, required: true },
        bio: { type: String },
        profilePicture: { type: String },
        resetPasswordToken: { type: String },
        resetPasswordExpire: { type: Date }
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.pre("updateOne", async function (next) {
    if (!this.isModified("resetPasswordToken")) return next();
    this.resetPasswordToken = await bcrypt.hash(this.resetPasswordToken, 10);
    next();
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;

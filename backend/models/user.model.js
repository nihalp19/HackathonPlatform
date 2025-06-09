import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple users without googleId
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId; // Password is required only for local signups
    }
  },
  avatar: {
    type: String,
  },
  collegeName: {
    type: String,
  },
  graduationYear: {
    type: String,
  },
  roles : {
    type : String,
    enum : ["user","admin"],
    default : "user"
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;

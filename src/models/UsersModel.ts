// Import necessary modules
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an Email!"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid Email!"]
    },
    password: {
        type: String,
        required: [true, 'Password must be provided!'],
        minLength: [6, 'minimum password length is 6 characters!']
    }
}, { timestamps: true });

// Middleware to hash password before saving to database
// userSchema.pre('save', async function (next: () => void){
    
//     const salt = await bcrypt.genSalt();
//     await bcrypt.hash(this.password, salt);
//     next();
// })

// userSchema.statics.login = async function (email: any, password: any){
//     const user = await this.findOne({ email });
//     if (user){
//         const auth = await bcrypt.compare(password, this.password);

//         if (auth){
//             return user;
//         }
//         throw Error("Incorrect Password!");
//     }
//     throw Error("Incorrect Email!");
// }

// Export user model
module.exports = mongoose.model('User', userSchema);

import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

// ============ PASSWORD ENCRYPTION ============
userSchema.pre('save', async function() {
    if(this.isModified('password') || this.isNew){
        const salt = await bcryptjs.genSalt();
        const hash = await bcryptjs.hash(this.password, salt);
        this.password = hash;
    }
})


export default mongoose.model('User', userSchema);
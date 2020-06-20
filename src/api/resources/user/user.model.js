import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    local : {
        email: String,
        password: String
    },
    google : {
        id: String,
        email : String,
        displayName: String,
        token: String
    },
    facebook : {
        id: String,
        displayName: String,
        token: String
    }
});



export default mongoose.model('User', userSchema);
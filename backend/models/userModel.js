import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true //converts email to lowercase incase uppercase character is accidentally used
  },

  password: {
    type: String,
    required: true
  }
},
  {timestamps: true} //creates createdAt and updatedAt fields 
)

const User = mongoose.model('User', userSchema);
export default User;
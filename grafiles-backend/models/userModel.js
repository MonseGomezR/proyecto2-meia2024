const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  _id: String,
  name: { type: String, required: true },
  password: { type: String, required: true },
  rol: { type: String, required: true },
  usuario: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

async function generateCustomId(rol) {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const pref = rol === 'empleado' ? 'EMP' : 'ADM';
  const prefix = `${pref}${year}${month}`;
  console.log(prefix);
  const count = await mongoose.model('User').countDocuments({ _id: { $regex: `^${prefix}` } });
  const newId = `${prefix}${(count + 1).toString().padStart(3, '0')}`;
  console.log(newId);
  return newId;
}

userSchema.pre('save', async function (next) {
  if (!this._id) {
    this._id = await generateCustomId(this.rol);
  }
  if (!this.created_at) {
    this.created_at = new Date().toISOString();
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

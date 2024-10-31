const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    _id: String,
    name: { type: String, required: true },
    dir_id: { type: String, required: true },
    size: Number,
    content: Buffer ,
    tipo: String ,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

async function generateCustomId(rol) {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const pref = 'F'
    const prefix = `${pref}${year}${month}`;
    console.log(prefix);
    const count = await mongoose.model('File').countDocuments({ _id: { $regex: `^${prefix}` } });
    const newId = `${prefix}${(count + 1).toString().padStart(3, '0')}`;
    console.log(newId);
    return newId;
}

fileSchema.pre('save', async function (next) {
    if (!this._id) {
        this._id = await generateCustomId(this.rol);
    }
    console.log(this.tipo)
    if(this.tipo === 'text/plain') {
        this.tipo = 'txt';
    }else if(this.tipo === 'image/png' || this.tipo === 'image/jpeg') {
        this.tipo = 'img';
    }
    next();
});

module.exports = mongoose.model('File', fileSchema);
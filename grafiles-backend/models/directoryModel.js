const mongoose = require('mongoose');

const directorySchema = new mongoose.Schema({
    _id: String,
    owner_id: { type: String, required: true },
    parent_id: { type: String, default: null },
    name: { type: String, required: true },
    created_at: Date,
    updated_at: Date,
});


async function generateCustomId() {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const pref = 'DIR'
    const prefix = `${pref}${year}${month}`;
    console.log(prefix);
    const count = await mongoose.model('Directory').countDocuments({ _id: { $regex: `^${prefix}` } });
    const newId = `${prefix}${(count + 1).toString().padStart(3, '0')}`;
    console.log(newId);
    return newId;
}

directorySchema.pre('save', async function (next) {
    if (!this._id) {
        this._id = await generateCustomId();
    }
    if (!this.created_at) {
        this.created_at = new Date().toISOString();
    }
    if (!this.updated_at) {
        this.created_at = new Date().toISOString();
    }
    next();
});


module.exports = mongoose.model('Directory', directorySchema);
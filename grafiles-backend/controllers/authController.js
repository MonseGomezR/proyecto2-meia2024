const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, password, usuario, rol } = req.body;
  
  try {
    const user = new User({ name, password, rol, usuario });
    await user.save();

    const token = jwt.sign(user.toJSON(), 'abc', { expiresIn: '2h' });
    
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.login = async (req, res) => {
  const { usuario, password } = req.body;
  const user = await User.findOne({ usuario });
  if (!user) {
    return res.status(400).send('Usuario no encontrado');
  }
  if (password != user.password) {
    return res.status(400).send('Contraseña incorrecta');
  }

  user.password = '';

  const token = jwt.sign({ id: user._id }, 'abc', { expiresIn: '1h' });
  res.json({ 
    token,
    usuario: user,
  });
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  users.forEach(user => {
    user.password = ''
  });
  res.status(201).json({ users });
}
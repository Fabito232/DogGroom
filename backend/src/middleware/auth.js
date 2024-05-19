import jwt from 'jsonwebtoken';
import { SECRET } from '../config.js';

export const generarToken = (datos) => {
    return jwt.sign(datos, SECRET, { expiresIn: '1h' });
}

export const verificarToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      console.error('Error al verificar token:', err);
      return res.status(401).json({ message: 'Token inválido' });
    }
    req.empleado = decoded;

    console.log(decoded)
    next();
  });
};
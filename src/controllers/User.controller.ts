import User from '../models/User.model';
import {decrypt} from '../utils/encrypt';
import {jwt} from '../utils/token';
import createLogin from './services/auth/login.service';
import updatePassword from './services/realestate/updatePassword.service';
import createUser from './services/user/createUser.service';
import deleteUser from './services/user/deleteUser.service';
import getAllUsers from './services/user/getAllUsers.service';
import getUserById from './services/user/getUserById.service';
import updateUser from './services/user/updateUser.service';

// 1. pega todos os clientes

const getAll = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// 2. pega somente um cliente pelo id recebido no token

const getById = async (req, res) => {
  const token = jwt.decode(req);
  const {id} = token;
  try {
    const user = await getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

// 3. cria um usuário

const create = async (req, res) => {
  const userData = req.body;

  try {
    const user = await createUser(userData);
    const {id, role} = user;
    const payload = {id, role};
    const token = jwt.encode(payload);
    res.status(201).json({message: 'Created', token});
  } catch (error) {
    res.status(409).json(error.message);
  }
};

// 4. atualiza dados de usuário

const updateAll = async (req, res) => {
  const token = jwt.decode(req);
  const {id} = token;
  const userData = req.body;
  try {
    await updateUser(id, userData);
    res.status(200).json({message: 'Successfully updated'});
  } catch (error) {
    res.status(401).json(error.message);
  }
};

// 5. atualiza senha de usuário

const passwordUpdate = async (req, res) => {
  const {oldPassword, newPassword} = req.body;
  const token = jwt.decode(req);
  const {id} = token;

  try {
    await updatePassword(id, oldPassword, newPassword);
    res.status(202).json('Password updated successfully');
  } catch (error) {
    res.status(409).json(error.message);
  }
};

// 6. deleta um usuário

const deleteOne = async (req, res) => {
  const token = jwt.decode(req);
  const {id} = token;

  try {
    await deleteUser(id);
    res.status(200).json({message: 'Successfully deleted'});
  } catch (error) {
    res.status(404).json(error.message);
  }
};

// 7. login

const login = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await createLogin(email, password);
    const payload = {id: user.id, role: user.role};
    const token = jwt.encode(payload);
    res.status(200).json({user, token});
  } catch (error) {
    res.status(400).json(error);
  }
};

export const UserController = {
  getAll,
  getById,
  create,
  updateAll,
  passwordUpdate,
  deleteOne,
  login,
};

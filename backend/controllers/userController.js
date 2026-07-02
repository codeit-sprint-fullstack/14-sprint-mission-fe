import * as userService from '../services/userService.js';

export const getUsers = async (req, res) => {
    const result = await userService.getUsers();

    res.send(result);
};

export const getUserById = async (req, res) => {
    const {id} = req.params;
    const result = await userService.getUserById(id);

    res.send(result);
};

export const createUser = async (req, res) => {
    const result = await userService.createUser(req.body);

    res.status(201).send(result);
};
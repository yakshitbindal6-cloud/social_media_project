import { get_user, delete_user, modify_user, create_user } from "../services/user.service.js";
import { sendSuccess } from "../utils/api_response.js";

export async function register_user(req, res) {
    const user = await create_user(req.body);
    return sendSuccess(res, user, "User successfully created", 201);
}

export async function find_user(req, res) {
    const id = req.params.id;
    const user = await get_user(id);
    return sendSuccess(res, user);
}

export async function modifyUser(req, res) {
    const user_id = req.params.id;
    const user = await modify_user(user_id, req.body);
    return sendSuccess(res, user, "User successfully updated");
}

export async function deleteUser(req, res) {
    const user_id = req.params.id;
    const result = await delete_user(user_id);
    return sendSuccess(res, result, "User successfully deleted");
}
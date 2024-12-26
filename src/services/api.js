import axios from "axios";

export const baseUrl = "https://6710c326a85f4164ef2f2ff7.mockapi.io/api/v1"
export const onGetAllUser = async () => await axios.get(`${baseUrl}/users`);
export const onDeleteAUser = async (id) => await axios.delete(`${baseUrl}/users/${id}`);
export const onAddUser = async (newUser) => await axios.post(`${baseUrl}/users`, newUser)


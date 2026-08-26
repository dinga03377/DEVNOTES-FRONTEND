import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const getConfig = () => {
const token = localStorage.getItem("token") ||  sessionStorage.getItem("token");
return {
headers: {
Authorization: token ? `Bearer ${token}` : "",
}
};
};

// Auth
export const registerUser = async (user) => {
const res = await API.post("/auth/register", user);
return res.data;
};

export const loginUser = async (user) => {
const res = await API.post("/auth/login", user);
return res.data;
};

export const forgotPassword = async (email) => {

  const res = await API.post(
    "/auth/forgot-password",
    { email }
  );

  return res.data;
};

// Notes CRUD
export const getNotes = async () => {
const res = await API.get("/notes", getConfig());
return res.data;
};

export const getOneNotes = async (id) => {
const res = await API.get(`/notes/${id}`, getConfig());
return res.data;
};

export const getProfile = async () => {
const res = await API.get("/auth/profile", getConfig());
return res.data;
};

export const uploadProfileImage = async (formData) => {
const res = await API.post(
"/auth/profile-image",
formData,
{
...getConfig(),
headers: {
...getConfig().headers,
"Content-Type": "multipart/form-data"
}
}
);
return res.data;
};

export const resetPassword = async (token, password) => {
  const res = await API.post(
    `/auth/reset-password/${token}`,
    { password }
  );
  return res.data;
};

export const createNotes = async (note) => {
const res = await API.post("/notes", note, getConfig());
return res.data;
};

export const updateNotes = async (id, note) => {
const res = await API.put(`/notes/${id}`, note, getConfig());
return res.data;
};

export const pinNote = async (id) => {

  const res = await API.patch(
    `/notes/${id}/pin`,
    {},
    getConfig()
  );

  return res.data;
};

export const delateNotes = async (id) => {
const res = await API.delete(`/notes/${id}`, getConfig());
return res.data;
};
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

// Authentication API calls with error handling
const authAPI = {
  register: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/RegisterPage`, data);
      console.log(response)
      return response.data;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  },
  login: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/LoginPage`, data);
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  },
  logout: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/LoggedOut`);
      return response.data;
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  },
  authenticate: async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth`);
      return response.data;
    } catch (error) {
      console.error("Error during authentication:", error);
      throw error;
    }
  },
  userAccess: async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/user`);
      return response.data;
    } catch (error) {
      console.error("Error during user access:", error);
      throw error;
    }
  },
  adminAccess: async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/admin`);
      return response.data;
    } catch (error) {
      console.error("Error during admin access:", error);
      throw error;
    }
  },
};

// Blog API calls with error handling
const blogAPI = {
  createBlog: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/createBlog`, data);
      return response.data;
    } catch (error) {
      console.error("Error creating blog:", error);
      throw error;
    }
  },
  getAllBlogs: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Blog`);
      return response.data; // Correctly awaiting response
    } catch (error) {
      console.error("Error fetching all blogs:", error);
      throw error;
    }
  },
  getSingleBlog: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Single-post-data/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching single blog:", error);
      throw error;
    }
  },
  deleteBlog: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/Delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting blog:", error);
      throw error;
    }
  },
  updateBlog: async (id, data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/update-post/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating blog:", error);
      throw error;
    }
  },
  getMyBlogs: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/my-blogs`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user blogs:", error);
      throw error;
    }
  },
};

export { authAPI, blogAPI };

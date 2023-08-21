import axios from "axios";

const BASE_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";

export async function fetchTickets() {
  try {
    const response = await axios.get(`${BASE_URL}/tickets`);
    return response.data;
  } catch (error) {
    // Handle errors here, e.g., log the error or display a message to the user.
    console.error("Error fetching tickets:", error);
    throw error; // Optionally rethrow the error for further handling in components.
  }
}

export async function fetchUsers() {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    // Handle errors here, e.g., log the error or display a message to the user.
    console.error("Error fetching users:", error);
    throw error; // Optionally rethrow the error for further handling in components.
  }
}

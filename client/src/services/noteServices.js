import axios from "axios";

const API_URL = "http://localhost:3001/api/notes";

const fetchNotes = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const createNote = async note => {
  try {
    await axios.post(API_URL, note);
  } catch (err) {
    console.log(err);
  }
};

const removeNote = async id => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (err) {
    console.log(err);
  }
};

export { fetchNotes, createNote, removeNote };

import axios from "axios";

export const getAllCart = async () => {
  const res = await axios.get("http://localhost:8080/carts");
  return res.data;
};

export const updateCartItem = async (id, product) => {
  const res = await axios.put(`http://localhost:8080/carts/${id}`, product);
  return res.data;
};

export const deleteCartItem = async (id) => {
  const res = await axios.delete(`http://localhost:8080/carts/${id}`);
  return res.data;
};

import axios from "axios";

export const getAllProduct = async () => {
  const res = await axios.get("http://localhost:8080/products");
  return res.data;
};

export const addToCart = async (product) => {
  const res = await axios.post("http://localhost:8080/carts", product);
  return res.data;
};

import { deleteCartItem, getAllCart, updateCartItem } from "@/api/cart";
import { addToCart, getAllProduct } from "@/api/product";

const product = {
  state: {
    products: [],
    cart: [],
  },
  getters: {
    allProducts: (state) => state.products,
    cartItems: (state) => state.cart,
    cartTotal: (state) => {
      return state.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
  actions: {
    async getAllProduct({ commit }) {
      try {
        const products = await getAllProduct();
        commit("setProducts", products);
      } catch (error) {
        console.log(error);
      }
    },
    async addToCart({ commit, state }, product) {
      const existingItem = state.cart.find((item) => item.id === product.id);

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        await updateCartItem(existingItem.id, updatedItem);
        commit("updateCartItem", updatedItem);
      } else {
        const newItem = { ...product, quantity: 1 };
        const response = await addToCart(newItem);
        commit("addCartItem", response);
      }
    },
    async getAllCart({ commit }) {
      try {
        const cart = await getAllCart();
        commit("setCart", cart);
      } catch (error) {
        console.log(error);
      }
    },
    async updateCartItem({ commit }, { id, product }) {
      try {
        const updatedProduct = await updateCartItem(id, product);
        commit("updateCartItem", { id, product: updatedProduct });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCartItem({ commit }, id) {
      try {
        await deleteCartItem(id);
        commit("removeCartItem", id);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    setProducts: (state, products) => (state.products = products),
    setCart: (state, cart) => (state.cart = cart),
    addCartItem: (state, cartItem) => state.cart.push(cartItem),
    updateCartItem: (state, updatedItem) => {
      const index = state.cart.findIndex((item) => item.id === updatedItem.id);
      if (index !== -1) {
        state.cart.splice(index, 1, updatedItem);
      }
    },
    removeCartItem: (state, id) => {
      state.cart = state.cart.filter((item) => item.id !== id);
    },
  },
};

export default product;

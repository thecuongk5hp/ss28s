<template>
  <div>
    <h2>Shopping Cart</h2>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cartItems" :key="item.id">
          <td>{{ item.name }}</td>
          <td>
            <input
              v-model.number="item.quantity"
              @change="updateItem(item)"
              type="number"
              min="1"
              style="width: 40px"
            />
          </td>
          <td>{{ item.price }}</td>
          <td>
            <button class="btn btn-danger" @click="removeFromCart(item.id)">
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-between">
      <h4>Subtotal</h4>
      <h4>${{ cartTotal }}</h4>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const cartItems = computed(() => store.getters.cartItems);
const cartTotal = computed(() => store.getters.cartTotal);

const updateItem = (item) => {
  store.dispatch("updateCartItem", { id: item.id, product: item });
};

const removeFromCart = (id) => {
  store.dispatch("deleteCartItem", id);
};

store.dispatch("getAllCart");
</script>

<style></style>

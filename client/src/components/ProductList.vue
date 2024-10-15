<template>
  <div class="product-list">
    <h2>Products</h2>
    <div class="d-flex" v-for="product in products" :key="product.id">
      <img :src="product.image" :alt="product.name" />
      <div>
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>total: {{ product.total }}</p>
      </div>
      <div>
        <p>Price: ${{ product.price }}</p>
        <button class="btn btn-primary" @click="addToCart(product)">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const products = computed(() => store.getters.allProducts);

const addToCart = (product) => {
  store.dispatch("addToCart", product);
};

store.dispatch("getAllProduct");
</script>

<style>
img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>

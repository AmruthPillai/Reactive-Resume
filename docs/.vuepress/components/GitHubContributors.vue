<template>
  <div class="contributors">
    <div v-for="i in items">
      <a :href="i.html_url" target="_blank" rel="noopener noreferrer">
        <img :src="i.avatar_url" />
      </a>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
const repo = 'AmruthPillai/Reactive-Resume';

export default {
  data() {
    return {
      items: [],
    };
  },
  beforeMount() {
    axios
      .get(`https://api.github.com/repos/${repo}/contributors`)
      .then(response => {
        this.$data.items = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
};
</script>

<style>
.contributors {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  gap: 1rem;
}
</style>

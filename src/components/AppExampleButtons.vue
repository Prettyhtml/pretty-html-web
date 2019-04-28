<template>
  <div class="text-sm">
    <button
      @click="example('html')"
      class="bg-grey-lighter text-grey-darker font-medium text-xs p-2 mx-0 lg:mx-1 my-1 lg:my-0 hover:bg-grey-darker hover:text-white rounded focus:outline-none focus:shadow-outline"
    >
      HTML5
    </button>
    <button
      @click="example('vue')"
      class="bg-grey-lighter text-grey-darker font-medium text-xs p-2 mx-0 lg:mx-1 my-1 lg:my-0 hover:bg-grey-darker hover:text-white rounded focus:outline-none focus:shadow-outline"
    >
      VUE
    </button>
    <button
      @click="example('angular')"
      class="bg-grey-lighter text-grey-darker font-medium text-xs p-2 mx-0 lg:mx-1 my-1 lg:my-0 hover:bg-grey-darker hover:text-white rounded focus:outline-none focus:shadow-outline"
    >
      ANGULAR
    </button>
    <button
      @click="example('svelte')"
      class="bg-grey-lighter text-grey-darker font-medium text-xs p-2 mx-0 lg:mx-1 my-1 lg:my-0 hover:bg-grey-darker hover:text-white rounded focus:outline-none focus:shadow-outline"
    >
      SVELTE
    </button>
  </div>
</template>
<script>
import EventBus from "../EventBus.js";
export default {
  methods: {
    example(name) {
      EventBus.$emit("example", name);
    },
  },
};
</script>

<template>
  <div class="text-sm">
    <div class="m-auto flex flex-no-wrap">
      <span class="text-xs text-grey-dark font-medium uppercase p-2">
        Examples
      </span>
      <button
        @click="example('html');"
        class="bg-grey-lighter text-grey-darker font-medium text-xs p-2 hover:bg-grey-darker hover:text-white rounded mx-1 focus:outline-none focus:shadow-outline"
      >
        HTML5
      </button>
      <button
        @click="example('vue');"
        class="bg-grey-lighter text-grey-darker font-medium text-xs p-2 hover:bg-grey-darker hover:text-white rounded mx-1 focus:outline-none focus:shadow-outline"
      >
        VUE
      </button>
      <button
        @click="example('angular');"
        class="bg-grey-lighter text-grey-darker font-medium text-xs p-2 hover:bg-grey-darker hover:text-white rounded mx-1 focus:outline-none focus:shadow-outline"
      >
        ANGULAR
      </button>
      <button
        @click="example('svelte');"
        class="bg-grey-lighter text-grey-darker font-medium text-xs p-2 hover:bg-grey-darker hover:text-white rounded mx-1 focus:outline-none focus:shadow-outline"
      >
        SVELTE
      </button>
    </div>
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

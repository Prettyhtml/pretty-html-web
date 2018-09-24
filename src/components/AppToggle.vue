<template>
  <div
    class="toggle rounded-full overflow-hidden focus:outline-none focus:shadow-outline"
    tabindex="0"
    @click="toggle"
    :style="styleObj"
  >
    <span :class="classObj" class="toggle-input flex items-center w-10 p-1">
      <span class="rounded-full w-4 h-4 shadow-inner bg-grey-lighter shadow"></span>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    styleObj() {
      return this.disabled
        ? { opacity: ".5", cursor: "not-allowed" }
        : { opacity: "1", cursor: "pointer" };
    },
    classObj() {
      const bgColor = this.value ? "bg-green-dark" : "bg-grey-darker";
      const position = this.value ? "justify-end" : "justify-start";
      return {
        [bgColor]: true,
        [position]: true
      };
    }
  },
  methods: {
    toggle() {
      if (this.disabled) return;
      this.$emit("input", !this.value);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.toggle-input {
  transition: 0.3s all;
}
</style>

<template>
  <div
    class="toggle overflow-hidden flex items-center h-8 w-8 relative focus:outline-none"
    tabindex="0"
    @click="toggle"
    :style="styleObj"
  >
    <span
      :class="underlayClasses"
      class="bg-grey rounded-full toggle-input w-8 h-2"
    ></span>
    <span
      :class="thumbClasses"
      class="absolute rounded-full w-4 h-4 bg-black focus:bg-grey"
    ></span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    styleObj() {
      return this.disabled
        ? { opacity: ".5", cursor: "not-allowed" }
        : { opacity: "1", cursor: "pointer" };
    },
    underlayClasses() {
      const classes = this.value ? "bg-purple-light" : "bg-grey";
      return [classes];
    },
    thumbClasses() {
      const classes = this.value
        ? "bg-purple border border-purple-dark pin-r"
        : "bg-white border border-grey pin-l";
      return [classes];
    },
  },
  methods: {
    toggle() {
      if (this.disabled) return;
      this.$emit("input", !this.value);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.toggle-input {
  transition: 0.3s all;
}
</style>

<template>
  <div class="toggle rounded-full overflow-hidden focus:outline-none focus:shadow-outline" tabindex="0" @click="toggle" :style="styleObj">
    <span
      class="toggle-input flex items-center w-10 p-1"
      :class="classObj"
    >
      <span
        class="rounded-full w-4 h-4 shadow-inner bg-grey-lighter shadow"
      ></span>
    </span>
  </div>
</template>

<script>
export default {
  computed: {
    valueModel: {
      get() {
        return this.value;
      },
      set() {
        this.toggle();
      }
    },
    styleObj() {
      return this.disabled === true
        ? { opacity: ".5", cursor: "not-allowed" }
        : { opacity: "1", cursor: "pointer" };
    },
    classObj() {
      const bgColor = this.value === true ? "bg-green-dark" : "bg-grey-darker";
      const position = this.value === true ? "justify-end" : "justify-start";
      return {
        [bgColor]: true,
        [position]: true
      };
    }
  },
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

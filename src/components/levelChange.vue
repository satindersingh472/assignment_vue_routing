<template>
<!-- div buttons will put the buttons for difFICULTY -->
  <div class="buttons">
      <!-- click event will trigger select level and send the `level` with it  -->
    <button
      @click="select_level(level, $event)"
      v-for="level in levels"
      :key="level[`id`]"
    >
      {{ level[`type`] }}
    </button>
  </div>
</template>

<script>
import Cookies from "vue-cookies";
export default {
  methods: {
    // select level will get triggered by buttons in page header
    select_level(level) {
      // following line store the id of clicked button into number
      this.number = level[`id`];
      // level cookies will get set for purpose of using afterwards
      Cookies.set(`level`, this.number);
      // global event will get emitted and send the number to other components
      this.$root.$emit(`send_number`, this.number);
    },
  },
  data() {
    return {
      number: undefined,
      button: undefined,
      levels: [
        {
          type: `Easy`,
          id: 1,
        },
        {
          type: `Medium`,
          id: 2,
        },
        {
          type: `Hard`,
          id: 3,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.buttons {
  display: grid;
  grid-auto-flow: column;
  button {
    &:hover {
      background-color: blue;
    }
  }
}
</style>

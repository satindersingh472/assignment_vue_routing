<template>
  <div>
    <form>
      <label for="levels">Difficulty:</label>
      <select name="levels" id="levels">
        <option v-for="level in levels" :key="level[`id`]">
          <button class="change_level">{{ level[`type`] }}</button>
        </option>
      </select>
    </form>
  </div>
</template>

<script>
export default {
  mounted () {
    this.button = document.querySelectorAll(`.change_level`);
    this.button.addEventListener(`click`,this.select_level);
  },
  methods: {
    select_level() {},
  },
  data() {
    return {
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

<style scoped></style>

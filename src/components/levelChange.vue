<template>
  <div>
    <form>
      <label for="levels">Difficulty:</label>
      <select name="levels" id="levels">
        <option v-for="level in levels" :key="level[`id`]">
          <button @click="select_level">{{ level[`type`] }}</button>
        </option>
      </select>
    </form>
  </div>
</template>

<script>
export default {
 
  methods: {
    select_level(details) {
      details
    },
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

<template>
  <div class="delete-nodes-modal">
    <h2>Удалить {{ selectedNodes.length }} узлов?</h2>
    <div class="col-2">
      <div>
        <p>
          Вы действительно хотите удалить {{ selectedNodes.length }}
          узлов?
        </p>
      </div>
      <div>
        <button @click="deleteNodes">
          <font-awesome icon="times" />
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedSession: null,
    };
  },
  props: {
    props: Array,
  },
  computed: {
    selectedNodes() {
      return this.$store.getters.selectedNodeIds;
    },
  },
  methods: {
    deleteNodes() {
      this.$store.dispatch('deleteNodes');
    },
  },
};
</script>

<style lang="scss">
  .delete-nodes-modal {
    .col-2 {
      display: flex;

      > div:nth-child(1) {
        flex: 1;
      }

      > div:nth-child(2) {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 2rem;

        button {
          font-size: 1.5rem;
          padding: 1rem 2rem;
          background: $red;
        }
      }
    }
  }
</style>

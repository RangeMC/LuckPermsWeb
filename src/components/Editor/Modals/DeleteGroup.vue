<template>
<div class="delete-group">
  <h2>
    Вы действительно хотите удалить группу:
    <code>{{ props.groupId }}</code>
  </h2>
  <p class="lighter">
    Все {{ permissions.length }} узлов и прав будут удалены.
    Данное действите необратимо.
  </p>
  <div>
    <button type="button" @click="deleteGroup">
      <font-awesome icon="check" />
      Удалить
    </button>
    <button type="button" class="red" @click="$emit('close')">
      <font-awesome icon="times" />
      Отменить
    </button>
  </div>
</div>
</template>

<script>
export default {
  name: 'DeleteGroup',
  props: {
    props: Object,
  },
  computed: {
    permissions() {
      return this.$store.getters.allNodes.filter(node => node.sessionId === this.props.groupId);
    },
  },
  methods: {
    deleteGroup() {
      this.$store.commit('deleteSession', this.props.groupId);
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss">
  .delete-group {
    > div {
      display: flex;
    }
  }
</style>

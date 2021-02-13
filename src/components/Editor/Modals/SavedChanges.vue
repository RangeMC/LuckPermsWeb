<template>
<div class="saved-changes">
  <h2>Данные были сохранены!</h2>

  <p>
    Выполните данную команду на сервере для применения настроек:
  </p>

  <div class="command">
    <code class="apply-edits" @click="copyCommand" title="Скопировать команду">
      /{{ metaData.commandAlias }} applyedits {{ props }}
    </code>
    <span class="command-copied" v-if="commandCopied">
    Команда скопирована в буфер обмена
    </span>
  </div>

  <p>
    <strong>Примечание:</strong> после выполнения команды <code>applyedits</code>, вам необходимо будет сгенерировать новую ссылку для вебредактора, чтобы продолжить редактирование прав.
  </p>
</div>
</template>

<script>
export default {
  name: 'SavedChanges',

  data() {
    return {
      commandCopied: false,
    };
  },

  props: {
    props: String,
  },

  computed: {
    metaData() {
      return this.$store.getters.metaData;
    },
  },

  methods: {
    async copyCommand() {
      await this.$copyText(`/${this.metaData.commandAlias} applyedits ${this.props}`);
      this.commandCopied = true;
    },
  },
};
</script>

<style lang="scss">
  .saved-changes {
    .apply-edits {
      font-size: 1.5rem;
      cursor: pointer;

      &:hover {
        opacity: .8;
      }
    }

    .command {
      position: relative;
      padding-bottom: 2rem;
      margin-bottom: 2rem;

      .command-copied {
        position: absolute;
        bottom: 0;
        left: 0;
        display: block;
        color: $brand-color;
      }
    }
  }
</style>

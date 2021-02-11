<template>
  <div class="container">
    <div class="row" v-for="(teamsRow, index) in teamsToRender" :key="index" :teamsRow="teamsRow">
      <ListItem v-for="(team, i) in teamsRow" :key="i" :team="team" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ListResults',
    components: {
      'ListItem': () => import('./ListItem.vue')
    },
    props: {
      teamsToRender: Array
    }
  }
</script>

<style scoped>
  .col {
    margin: 8px;
  }
</style>
<template>
  <div class="container">
    <Search :teams="teams" v-on:handleChange="handleChange"></Search>
    <div class="row">
      <ListResults v-bind:teamsToRender="teamsToRender"></ListResults>
    </div>
  </div>
</template>

<script>
import lodash from 'lodash'

export default {
  name: 'Home',
  components: {
    ListResults: () => import('@/components/ListResults.vue'),
    Search: () => import('@/components/Search.vue')
  },
  data() {
    return {
      teams:[],
      teamsToRender:[]
    }
  },
  mounted() {
    this.getFavouriteTeams();
    this.teamsToRender = lodash.chunk(this.teams, 4);
  },
  methods: {
    getFavouriteTeams() {
        this.teams = (localStorage.teams) ? JSON.parse(localStorage.teams) : [];
    },
    handleChange(event) {
        this.teamsToRender = event;
    }
  }
}
</script>


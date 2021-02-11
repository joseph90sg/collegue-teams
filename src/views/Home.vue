<template>
  <div class="container">
    <div class="row">
      <Search :teams="teams" v-on:handleChange="handleChange"></Search>
    </div>
    <div class="row">
      <ListResults v-bind:teamsToRender="teamsToRender"></ListResults>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import lodash from 'lodash'

export default {
  name: 'Home',
  components: {
    ListResults: () => import('@/components/ListResults.vue'),
    Search: () => import('@/components/Search.vue'),
    Sort: () => import('@/components/Sort.vue')
  },
  data() {
    return {
      teams:null,
      teamsToRender: []
    }
  },
  mounted() {
      this.getTeams();
  },
  methods: {
    getTeams() {
        axios.get("https://api.collegefootballdata.com/teams")
          .then( response => {
            this.teams = response.data;
            this.teamsToRender = lodash.chunk(this.teams, 4);
          })
          .catch( error => {
            console.log(error);
          });
    },
    handleChange(event) {
        while(this.teamsToRender.length) { this.teamsToRender.pop(); }
        this.teamsToRender = event;
    }
  }
}
</script>
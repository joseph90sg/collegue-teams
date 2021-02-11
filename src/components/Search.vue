<template>
    <div class="col col-md-2">
    <div class="input-group rounded">
        <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
        aria-describedby="search-addon" v-model="query" />
        <span class="input-group-text border-0" id="search-addon">
        <img src="../assets/icons/search-24px.svg" />
        </span>
    </div>
    </div>
</template>
<script>
import lodash from 'lodash'

export default {
    name: 'Search',
    data() {
        return {
            query: '',
            teamsFiltered: []
        }
    },
    props: {
        teams: Array
    },
    methods: {
        filterTeams() {
            let nameSearch = this.query;
            if(nameSearch) {
                this.teamsFiltered = lodash.filter(this.teams, function(team) { return typeof(team.school) !== "undefined" && team.school.toLowerCase().search(nameSearch.toLowerCase()) > -1 });
                this.teamsFiltered = lodash.chunk(this.teamsFiltered, 4);
            } else {
                this.teamsFiltered = lodash.chunk(this.teams, 4);
            }
        }
    },
    watch: {
        query: function() {
            this.filterTeams();
            this.$emit('handleChange', this.teamsFiltered)
        }
    }
}

</script>
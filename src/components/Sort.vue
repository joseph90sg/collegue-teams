<template>
    <div class="col col-md-1">
        <button class="btn btn-outline-secondary" @click="sort"><img src='../assets/icons/sort_by_alpha-24px.svg' /></button>
    </div>
</template>
<script>
import lodash from 'lodash'

export default {
    name: 'Sort',
    data() {
        return {
            teamsSorted: [],
            direction: 'asc'
        }
    },
    props: {
        teams: Array
    },
    methods: {
        sort() {
            this.teamsSorted = lodash.sortBy(this.teams, function(team) { return team.school }, this.direction);
            this.teamsSorted = lodash.chunk(this.teamsSorted, 4);
            this.changeDirection();
            this.$emit('handleChange', this.teamsSorted);
        },
        changeDirection() {
            this.direction == 'asc' ? this.direction = 'desc' : this.direction = 'asc'
        }
    }
}

</script>
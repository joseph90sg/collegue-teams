<template>
    <div id="detalles" class="container" style="width: 30rem;">
        <h1> Detalles del equipo</h1>
        <div class="card text-center">
            <img class="card-img-top mx-auto" :src="team.logos[0]" />
            <div class="card-body">
                <h4 class="card-title">School:</h4> <label for="mascot"> {{ team.school }}</label>
                <h4 class="card-text">Mascot:</h4> <label for="mascot"> {{ team.mascot }}</label>
                <h4 class="card-text">Abbreviation:</h4> <label for="abbreviation"> {{ team.abbreviation }}</label>
                <h4 class="card-text">Alternative names:</h4> 
                    <p v-for="(altName, index) in altNames" :key="index" :altName="altName">
                        <label for="alt_names" >{{ altName }}</label>
                    </p>
                <h4 class="card-text">Conference:</h4> <label for="conference"> {{ team.conference }}</label>
                <h4 class="card-text">Division:</h4> <label for="division"> {{ team.division }}</label>
                <h4 class="card-text">Color:</h4> <label for="color" class="currentColor" v-bind:style="{ 'background-color':color }"></label>
                <h4 v-if="altColor != null" class="card-text">Alternative color:</h4> <label for="alt_color" class="currentColor" v-bind:style="{ 'background-color':altColor }"></label>
            </div>
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'TeamDetails',
    data() {
        return {
            team: null,
            color: null,
            altColor: null,
            altNames: []
        }
    },
    created() {
        this.team = this.$route.params,
        this.color = this.team.color,
        this.altColor = this.team.alt_color
        this.addAltName();
    },
    methods: {
        addAltName() {
            if(this.team.alt_name1 != null) {
                this.altNames.push(this.team.alt_name1);
            }
            if(this.team.alt_name2 != null) {
                this.altNames.push(this.team.alt_name2);
            }
            if(this.team.alt_name3 != null) {
                this.altNames.push(this.team.alt_name3);
            }
        }
    }
}
</script>

<style scoped>
    .card-img-top {
        height: 250px;
        width: 250px;
    }
    .currentColor {
        height: 15px;
        width: 100px;
    }
</style>
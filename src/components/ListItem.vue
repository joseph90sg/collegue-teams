<template>
  <div class="col">
    <div class="card" v-bind:style="{ 'border-color':bgColor}" style="border-style: solid; border-width: thick; min-height: 250px">
      
      <img class="card-img-top" :src="team.logos[0]" @error="setAltImg"/>
      
      <div class="card-body" v-bind:style="{ 'background-color':bgColor, 'color':textColor}">
        <h5 class="card-title">School: {{ team.school }}</h5>
        <p class="card-text">Color: <label for="color" class="currentColor" v-bind:style="{ 'background-color':bgColor }"></label></p>
        <div class="btn-group m-1">
            <button class="btn myButton btn-sm m-1" @click="details">Detalles</button>
            <button :class="btnClass" @click="clickFavBtn"><img :src="imgIconFav" /></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import img from '../assets/images/image-not-available.png'
import imgNoFav from '../assets/icons/favorite_border-24px.svg'
import imgFav from '../assets/icons/favorite-24px.svg'
import lodash from 'lodash'

  export default {
    name: 'ListItem',
    props: {
      team: Object
    },
    data() {
      return {
        id: this.team.id,
        bgColor: this.team.color,
        textColor: null,
        btnClass: 'btn btn-success bt-sm m-1',
        imgIconFav: '../assets/icons/favorite_border-24px.svg',
        favouriteTeams: []
      }
    },
    methods: {
      details() {
        this.$router.push({
          name: 'teamDetails',
          params: this.team
        })
      },
      setAltImg(e){
        e.target.src = img
      },
      addFavourite() {
        this.deleteTeam();
        this.favouriteTeams.push(this.team);
        this.saveTeams();
      },
      saveTeams() {
        localStorage.setItem('teams', JSON.stringify(this.favouriteTeams));
      },
      deleteTeam() {
        let idTeam = this.id;
        if(this.favouriteTeams) {
          lodash.remove(this.favouriteTeams, function(teamRem) {return teamRem.id == idTeam});
        }
        this.saveTeams();
      },
      clickFavBtn() {
        if(this.team.fav) {
          this.deleteTeam();
          this.team.fav = false;
        } else {
          this.addFavourite();
          this.team.fav = true;
        }
        this.toggleBtnClass();
      },
      toggleBtnClass() {
        if(this.team.fav) {
          this.btnClass = "btn btn-danger bt-sm m-1";
          this.imgIconFav = imgFav;
        } else {
          this.btnClass = "btn btn-success bt-sm m-1";
          this.imgIconFav = imgNoFav;
        } 
      },
      invertHex() {
          var color = this.team.color;
          color = color.substring(1); 
          color = parseInt(color, 16); 
          color = 0xFFFFFF ^ color; 
          color = color.toString(16); 
          color = ("000000" + color).slice(-6); 
          color = "#" + color; 
          this.textColor = color;
      }
    },
    mounted() {
      //calculo color de equipo opuesto para contrastar texto con color de equipo
      this.invertHex();
      //inicializo array
      this.favouriteTeams = (localStorage.teams) ? JSON.parse(localStorage.teams) : [];
      //agrego nuevo atributo al objeto
      let idTeam = this.id;
      this.team['fav'] = (lodash.some(this.favouriteTeams, ['id', idTeam]));
      this.toggleBtnClass();
    }
  }
</script>

<style scoped>
  .currentColor {
    height: 15px;
    width: 100px;
    border-color: white;
    border-style: solid;
  }
  .myButton {
	box-shadow:inset 0px 1px 0px 0px #ffffff;
	background:linear-gradient(to bottom, #ededed 5%, #dfdfdf 100%);
	background-color:#ededed;
	border-radius:6px;
	border:1px solid #dcdcdc;
	display:inline-block;
	cursor:pointer;
	color:#777777;
	font-family:Arial;
	font-weight:bold;
	text-decoration:none;
	text-shadow:0px 1px 0px #ffffff;

}
.myButton:hover {
	background:linear-gradient(to bottom, #dfdfdf 5%, #ededed 100%);
	background-color:#dfdfdf;
}
.myButton:active {
	position:relative;
}
</style>
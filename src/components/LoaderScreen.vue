<template>
    <div v-if="launched" ref="loader" class="loading">
        <div ref="logoContainer" class="logo__container">
            <img ref="logo" id="logo" class="logo" src="@/assets/img/logo.png" alt=""> 
        </div>
    </div>    
  </template>
  
  <script>
    import { animate } from "motion"


    export default {
      name: 'LoaderScreen',
      data(){
        return{
            launched:true
        }
      },
      methods:{
        animationLogo(){
            const targetLogo = this.$refs.logo
            const targetLoader = this.$refs.loader
            const targetLogoContainer = this.$refs.logoContainer
            const vm = this
            
            animate(targetLogo, {scale:[0.6, 1.2]},{duration: 2.5, easing :"ease-out", delay: 0.2}).finished.then(() => {
              animate(targetLoader, {opacity:0},{duration: 1, easing :"ease-out", delay: 1}).finished.then(() => {
                vm.launched = false
              })
            })
            
            animate(targetLogoContainer, {opacity:1},{duration: 1.5, easing :"ease-out", delay: 0.2})
        }
      },
      mounted(){
        document.addEventListener('DOMContentLoaded', this.animationLogo(), false);
      }
    }
  </script>
  
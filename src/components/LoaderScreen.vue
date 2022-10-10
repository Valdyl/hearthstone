<template>
    <div v-if="launched" ref="loader" class="loading">
        <div ref="logoContainer" class="logo__container">
            <img ref="logo" id="logo" class="logo" src="@/assets/img/logo.png" alt=""> 
        </div>
    </div>    
  </template>
  
  <script>
    import anime from 'animejs'

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
            anime({
              targets:targetLogo,
              scale: [0.6, 1.2],
              duration: 3000,
              easing: 'easeOutQuad',
              delay: 200,
              complete: function(){
                anime({
                    targets:targetLoader,
                    opacity: 0,
                    duration: 1000,
                    easing: 'easeOutQuad',
                    delay: 1000,
                    complete: function(){
                        vm.launched = false
                    }
                })
              }
            })
            anime({
              targets:targetLogoContainer,
              opacity: 1,
              duration: 2000,
              easing: 'easeOutExpo',
              delay: 200
            })
        }
      },
      mounted(){
        document.addEventListener('DOMContentLoaded', this.animationLogo(), false);
        
      }
    }
  </script>
  
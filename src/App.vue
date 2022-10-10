<template>
  <LoaderScreen />
  <div class="container">
    <div class="container__left">
      <HeroContainer v-if="loaded" />
      <button class="button" ref="button" @click="launchCollection()">Collection</button>

    </div>
    <div class="container__right">
      <CardContainer v-if="loaded" />
    </div>
  </div>
  <Collection v-if="isVisible" />
</template>

<script>

import { mapState} from 'pinia'
import { mapActions} from 'pinia'
import {collectionCardsStore} from "@/stores/collectionCards"

import LoaderScreen from './components/LoaderScreen.vue'
import CardContainer from './components/CardContainer.vue'
import HeroContainer from './components/HeroContainer.vue'
import Collection from './components/Collection.vue'

import anime from 'animejs'

export default {
  name: 'App',
  components: {
    LoaderScreen,
    CardContainer,
    HeroContainer,
    Collection
  },
  data(){
    return{
      loaded:false
    }
  },
  computed:{
    ...mapState(collectionCardsStore,['isVisible']),
  },
  methods:{
    ...mapActions(collectionCardsStore,['showCollection']),


    launchCollection(){
      const targetButton = this.$refs.button
      anime({
        targets:targetButton,
        scale: .95,
        duration:100,
        complete: function() {
          anime({
            targets:targetButton,
            scale: 1,
            duration:100,
          })
        }
      })
      this.showCollection()
    }
  },
  mounted(){
    const vm = this
    document.addEventListener('DOMContentLoaded',function(){
        vm.loaded = true;
    }, false);

  }  
}
</script>


<template>
  <div class="card__container">
    <Card 
      v-for="(card,index) in cardPicked"
      :key="card.id"
      :index="index"
      :img="card.img"
      :rarity="card.rarity"
      :gold="card.gold"
      :sound="card.sound"
      :turnOver="card.turnOver"
      :itemId="card.id"
      :card ="card"
      customClass=""
    />
    
  </div>
  <button class="button" ref="button" v-if="packageLeft" @click="getnewPackage()">Nouveau paquet ({{Math.ceil(this.package / 5)}})</button>
</template>

<script>

import { animate } from "motion"

import { mapState} from 'pinia'
import { mapActions} from 'pinia'
import cardList from "../cardList.json"
import {collectionCardsStore} from "@/stores/collectionCards"
import Card from '@/components/Card.vue'

export default {
  name: 'CardContainer',  
  data(){
    return{
      cardCollection : cardList,
      cardPicked : [],
      cardUsed: [],
      package : cardList.length,
      packageLeft : true
    }
  },
  computed:{
      ...mapState(collectionCardsStore,['collectionArr' , 'isVisible'])
  },
  components: {
    Card
  },
  methods:{
    ...mapActions(collectionCardsStore,['addCardIntoCollection']),
    getRandomCards(arr){
      this.cardPicked = []
      for(let i=0 ; i < 5; i++ ){
        let random = this.generateRandomNumber(arr)
        this.cardPicked.push(arr[random])
      }
      if(this.cardUsed.length == this.cardCollection.length){
        this.packageLeft = false
      }else{
        this.package -= 5
      }
    },
    generateRandomNumber(arr){
      let usedArray = this.cardUsed
      let random = Math.floor(Math.random() * arr.length)
      if(!usedArray.includes(random)){
          usedArray.push(random)
          return random
      }
      return this.generateRandomNumber(arr)  
    },
    getnewPackage(){
      const targetButton = this.$refs.button
      animate(targetButton, {scale:.95},{duration: .1}).finished.then(() => {
        animate(targetButton, {scale:1},{duration: .1})
      })
      this.pushIntoCollection(this.cardPicked)
      this.getRandomCards(this.cardCollection)
    },
    pushIntoCollection(arr){
      let usedArray = this.collectionArr
      for(let i=0; i<arr.length ; i++){
        if(!usedArray.includes(arr[i])){
          usedArray.push(arr[i])
        }
      }
    },
  },
  mounted(){
    this.getRandomCards(this.cardCollection)
  }
}
</script>

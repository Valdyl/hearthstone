<template>
    <div :class="'card '+rarity+' '+ customClass" ref="card" @click="revealFront()">
        <img ref="cardFront"  class="card-img card-front" :src="require('@/assets/img/custom-content/' + img + '.png')" alt="">
        <img ref="cardBack" class="card-img card-back" src="@/assets/img/custom-content/card_back.png" alt="">
    </div>
</template>

<script>

import { animate } from "motion"
import {collectionCardsStore} from "@/stores/collectionCards"    
import {volumeStore} from "@/stores/volume"
import { mapState} from 'pinia'

import { mapActions} from 'pinia'

export default {

    name: 'Card',
    props:["img","rarity","gold","sound","customClass","itemId","card","turnOver"],
    computed:{
      ...mapState(volumeStore,['volumeValue'])
    },
    methods:{
        ...mapActions(collectionCardsStore,['addCardIntoCollection']),
        revealFront(){
            let audio = this.getSound();
            let audioReturn = new Audio(this.turnOver);
            if(!this.$refs.card.classList.contains("revealed")){
                if(audio != undefined){
                    audio.play()
                    audio.volume = this.volumeValue/100;
                }
                audioReturn.play()
                if(this.volumeValue > 0 && this.volumeValue < 25){
                    audioReturn.volume = 0.1;
                }else{
                    audioReturn.volume = (this.volumeValue/100)-0.2;
                }
                this.addCardIntoCollection(this.card)
            }
            this.$refs.card.classList.add("revealed")
        },
        getSound(){
            let random = 0
            if(this.sound.length > 1){
                random = Math.round(Math.random()*(this.sound.length-1))
                // random = 2
            }
            return new Audio(this.sound[random]);
        },
        animationCard(){
            const targetCard = this.$refs.card
            animate(targetCard, {opacity:[0,1]},{duration: .5, easing :"ease-out"})
        }
    },
    mounted(){
        this.animationCard()
    }
}
</script>


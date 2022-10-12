<template>
    <div :class="'card '+rarity+' '+ customClass" ref="card" @click="revealFront()">
        <img ref="cardFront"  class="card-img card-front" :src="require('@/assets/img/custom-content/' + img + '.png')" alt="">
        <img ref="cardBack" class="card-img card-back" src="@/assets/img/custom-content/card_back.png" alt="">
        <audio ref="sound"></audio>
    </div>
</template>

<script>

import { animate } from "motion"
import {collectionCardsStore} from "@/stores/collectionCards"
import { mapActions} from 'pinia'

export default {

    name: 'Card',
    props:["img","rarity","gold","sound","customClass","itemId","card"],
    methods:{
        ...mapActions(collectionCardsStore,['addCardIntoCollection']),

        revealFront(){
            let audio = this.getSound();
            let audioReturn = this.getTurnSound();
            if(!this.$refs.card.classList.contains("revealed")){
                if(audio != undefined){
                    audio.volume = 0.8;
                    audio.play()
                }
                audioReturn.volume = 0.6;
                audioReturn.play()
                this.addCardIntoCollection(this.card)
            }
            this.$refs.card.classList.add("revealed")
        },
        getSound(){
            // let random = Math.round(Math.random())*2 + 1
            let random = 3
            
            switch(this.sound){
                case 'rare':
                    if(this.gold == true){
                        return new Audio("./sound/gold/rareGold.mp3");
                    }else{
                        return new Audio("./sound/rare"+random+".mp3");
                    }
                case 'epic':
                    if(this.gold == true){
                        return new Audio("./sound/gold/epicGold.mp3");
                    }else{
                        return new Audio("./sound/epic"+random+".mp3");
                    }
                case 'legendaire':
                    if(this.gold == true){
                        return new Audio("./sound/gold/legendaireGold.mp3");
                    }else{
                        return new Audio("./sound/legendaire"+random+".mp3");
                    }
                default:
                    if(this.gold == true){
                        return new Audio("./sound/gold/gold.mp3");
                    }
                    return;
            }
        },
        getTurnSound(){
            switch(this.sound){
                case 'commune':
                    return new Audio("./sound/turnover/commune.mp3");
                case 'rare':
                        return new Audio("./sound/turnover/rare.mp3");
                case 'epic':
                    return new Audio("./sound/turnover/epic.mp3");
                case 'legendaire':
                    return new Audio("./sound/turnover/legendaire.mp3");
                default:
                    return;

            }
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


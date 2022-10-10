<template>
    <div :class="'card '+rarity+' '+ customClass" ref="card" @click="revealFront()">
        <img ref="cardFront"  class="card-img card-front" :src="require('@/assets/img/custom-content/' + img + '.png')" alt="">
        <img ref="cardBack" class="card-img card-back" src="@/assets/img/custom-content/card_back.png" alt="">
        <audio ref="sound"></audio>
    </div>
</template>

<script>

import { animate } from "motion"

import rare from '@/assets/sound/rare.mp3'
import epic from '@/assets/sound/epic.mp3'
import legendaire from '@/assets/sound/legendaire.mp3'
import {collectionCardsStore} from "@/stores/collectionCards"
import { mapActions} from 'pinia'

export default {

    name: 'Card',
    props:["img","rarity","gold","sound","customClass","itemId","card"],
    methods:{
        ...mapActions(collectionCardsStore,['addCardIntoCollection']),

        revealFront(){
            let audio = this.getSound();
            if(!this.$refs.card.classList.contains("revealed")){
                if(audio != undefined){
                    audio.play()
                }
                this.addCardIntoCollection(this.card)
            }
            this.$refs.card.classList.add("revealed")

        },
        getSound(){
            switch(this.sound){
                case 'rare':
                    return new Audio(rare);
                case 'epic':
                    return new Audio(epic);
                case 'legendaire':
                    return new Audio(legendaire);
                default:
                    console.log('oups');
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


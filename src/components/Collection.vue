<template>
    <div id="collection" class="collection">        
        <div class="collection__container" ref="card">
            <button class="button collection__button" @click="this.hideCollection">X</button>
            <a download class="button collection__link" href="https://valdyl.github.io/archives/Deck.zip">Télécharger</a>
            <Card 
            v-for="(card,index) in cardRevealed.sort(function(a, b){ return a.id - b.id;})"
            :key="card.id"
            :index="index"
            :img="card.img"
            :rarity="card.rarity"
            :gold="card.gold"
            :turnOver="card.turnOver"
            :sound="card.sound"
            :itemId="card.id"
            :card ="card"
            customClass="revealed big"
            />
        </div>
    </div>
</template>

<script>
import { mapState} from 'pinia'
import { mapActions} from 'pinia'

import {collectionCardsStore} from "@/stores/collectionCards"
import cardList from "../cardList.json"
import Card from '@/components/Card.vue'

export default {
    name: 'Collection',
    data(){
        return{
            cardListing : cardList,
            cardRevealed: []
        }
    },
    components: {
        Card,
    },

    computed:{
        ...mapState(collectionCardsStore,['collectionArr' , 'isVisible']),
    },
    methods:{
        ...mapActions(collectionCardsStore,['hideCollection']),

        updateRevelead(arr){
            for(let i=0; i<arr.length; i++){
                this.cardRevealed.push(arr[i])
            }
        }
    },
    mounted(){
        this.updateRevelead(this.collectionArr)
    },
}
</script>


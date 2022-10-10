import { defineStore } from "pinia"

export const collectionCardsStore = defineStore("collectionCards",{
    state:() => {
        return {
            collectionArr:[],
            isVisible: false
        }
    },
    actions : {
        addCardIntoCollection(cardId){
            this.collectionArr.push(cardId)
        },
        showCollection(){
            this.isVisible = true
        },
        hideCollection(){
            this.isVisible = false
        }

    }
})
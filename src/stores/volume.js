import { defineStore } from "pinia"

export const volumeStore = defineStore("volume",{
    state:() => {
        return {
            volumeValue: 75
        }
    },
    actions : {
        manageVolume(value){
            this.volumeValue = value
            const audioFiles = document.querySelectorAll("audio");
            if(audioFiles.length>0){
                console.log(audioFiles)
            }
        }
    }
})
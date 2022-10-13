<template>
    <div class="volume">
        <!-- <img class="volume__icon" src="@/assets/img/volume.png" alt="" /> -->
        <svg @click="handleMute(this.percent)" version="1.1" id="svg-volume" class="volume__icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 380 336" style="enable-background:new 0 0 380 336;" xml:space="preserve">
            <path id="base" fill="#0A0603" d="M70.8,95.9H23.9C10.7,95.9,0,106.6,0,119.8v96.3c0,13.2,10.7,23.9,23.9,23.9h46.9c6.6,0,13.1,2.3,18.2,6.4L196.9,333c8.5,6.8,21.1,0.8,21.1-10.1V13c0-10.9-12.6-16.9-21.1-10.1L89,89.5C83.8,93.7,77.4,95.9,70.8,95.9z"/>
            <g v-show="this.percent >0">
                    <path id="small" fill="#0A0603" d="M241.5,251.1c-3,0-6-1.2-8.1-3.6c-4.1-4.5-3.8-11.4,0.7-15.5c17.7-16.1,27.8-39.1,27.8-63
                    c0-23.9-10.1-46.9-27.8-63c-4.5-4.1-4.8-11.1-0.7-15.5c4.1-4.5,11.1-4.8,15.5-0.7c22.2,20.3,35,49.2,35,79.3s-12.8,59-35,79.3
                    C246.8,250.1,244.1,251.1,241.5,251.1z"/>
            </g>
            <g v-show="this.percent >50">
                    <path id="medium" fill="#0A0603" d="M280.8,278.3c-2.7,0-5.5-1-7.6-3c-4.4-4.2-4.6-11.2-0.4-15.6c24-25.1,37.1-57.3,37.1-90.8
                    c0-33.4-13.2-65.7-37.1-90.8c-4.2-4.4-4-11.4,0.4-15.6c4.4-4.2,11.4-4,15.6,0.4c27.9,29.2,43.2,66.8,43.2,106
                    c0,39.1-15.4,76.8-43.2,106C286.6,277.2,283.7,278.3,280.8,278.3z"/>
            </g>
            <g v-show="this.percent == 100">
                    <path id="large" fill="#0A0603" d="M320.5,297.4c-2.7,0-5.5-1-7.6-3c-4.4-4.2-4.6-11.2-0.4-15.6c29-30.4,45-69.4,45-109.9
                    c0-40.5-16-79.5-45-109.9c-4.2-4.4-4-11.4,0.4-15.6c4.4-4.2,11.4-4,15.6,0.4c32.9,34.5,51,78.9,51,125.1c0,46.2-18.1,90.6-51,125.1
                    C326.3,296.3,323.4,297.4,320.5,297.4z"/>
            </g>
        </svg>

        <input
        v-model="percent"
        ref="range"
        type="range"
        class="windowsSliderInput"
        min="0"
        max="100"
        @input="this.handleVolume"
      />
  
    </div>    
  </template>
  
  <script>
    import {volumeStore} from "@/stores/volume"
    import { mapActions} from 'pinia'

    export default {
        name: 'VolumeControle',
        data() {
            return {
                percent: 75,
                stockedPercent: 75 
            };
        },
        methods:{
            ...mapActions(volumeStore,['manageVolume']),
            handleVolume(){
                this.$refs.range.style.backgroundSize = this.percent + "% 100%"
                this.manageVolume(this.percent)
            },
            handleMute(originalValue){
                if(originalValue != 0){
                    this.stockedPercent = originalValue
                    this.percent = 0
                }else{
                    this.percent = this.stockedPercent
                }
                this.handleVolume()
            }
        }
    }
  </script>
  
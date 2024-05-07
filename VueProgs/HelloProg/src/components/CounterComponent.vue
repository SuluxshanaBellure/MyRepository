<template>
<div>
    <h3>{{ count }}</h3>
    <button v-on:click="incrementCount">Increment</button>
    <img src="https://wallpapers.com/images/featured/beautiful-scenery-wnxju2647uqrcccv.jpg" class="imageSize">
    <p v-on:click="colorChange" :style="{color:textColor}">CHANGE TEXT COLOR</p>
    {{counters}}
</div>
</template>

<script>
export default {
    name: 'CounterComponent',
    data() {
        return {
            count: 0,
            textColor:"black",
        };
    },
    methods: {
        incrementCount() {
            this.count++;
        },
        colorChange(){
            this.textColor=this.textColor==="black"?"red":"black";
        }
    },
    props:{
        counters:String
    }
}
</script>

<style>
.imageSize {
    width: 200px;
    height: 100px;
}
</style>

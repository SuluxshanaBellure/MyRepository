<template>
<form v-on:submit.prevent=submitItem>
    <input placeholder="enter item" type="text" v-model="itemName">
    <input placeholder="enter quantity" type="number" v-model="itemNumber">
    <button type="submit">Add</button>
</form>
</template>
<script>
export default {
    name:'Shopping',
    data(){
        return{
        itemName:'',
        itemNumber:null,
        }
    },
    methods:{
        submitItem(){
            console.log("item name : ",this.itemName,"item number : ",this.itemNumber);
        },
        }
}
</script>

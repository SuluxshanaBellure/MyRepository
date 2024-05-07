<template>
    <div>
        <ChildComponent title="child-component">
            this content is passed from parent to child component using the fallthrough 
        </ChildComponent>
    </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue'

export default {
    components:{
        ChildComponent
    }
}
</script>
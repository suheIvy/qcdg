<template>
    <div class="cake-list">
        <Topslider></Topslider>
        <CardList></CardList>
        <Gotop></Gotop>

    </div>
</template>
<style scoped="" lang="scss">
    .cake-list {
        padding-bottom: 50px;
    }
</style>
<script>
import Topslider from "../components/Swiper.vue";
import CardList from "../components/CardList.vue";
import Gotop from "../components/Gotop.vue";

export default {
    components: {
        Topslider,
        CardList,
        Gotop
    },
    created() {
        // console.log(this.$route)
        

    }

}
</script>
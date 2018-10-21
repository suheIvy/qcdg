<template>
    <div class="classify">
        <ul>
            <li v-for="(item, key) in classify" @click="changeRoute(item, key)">
                <img :src="item.img" alt="" >
                <p>{{item.type}}</p>
            </li>
        </ul>
        <Gotop></Gotop>
    </div>
</template>
<style lang="scss" scoped>
.classify {
    padding: 50px 10px;
    ul {
        padding-top: 4rem;
        li {
            text-align: center;
            margin-bottom: 8rem;
            width: 33%;
            float: left;
            img {
                width: 50%;
                border-radius: 50%;
            }
            p {

            }
        }
    }
}
</style>
<script>
import Gotop from "../components/Gotop.vue";
export default {
    components: {
        Gotop
    },
    data() {
        return {
            classify: []
        }
    },
    created() {
        this.$http.get("/data/classify.json")
            .then(({data}) => this.classify = data);
    },
    methods: {
        changeRoute(item, key) {
            // console.log("item222", item.childType[0].childtype, key);
            this.$router.push({
                name: "ClassifyList",
                query: {
                    type: item.id,
                    typeKey: item.childType[0].childtype,
                    pageNo: 0,
                    pageSize: 10,
                    key: key
                }
            })
        }
    }
}
</script>
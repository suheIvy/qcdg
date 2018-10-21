<template>
<div class="gotop">
    <div class="gotop-box" @click="gotop">
        <img src="https://m.dangao.com/Tpl/default/Public/images/scroll-to-top-icon.png" alt="">
    </div>
</div>
</template>
<style lang="scss" scoped>
    .gotop {
        .gotop-box {
            position: fixed;
            bottom: 5rem;
            right: 1rem;
            width: 3rem;
            height: 3rem;
            display: none;
            img {
                width: 100%;
            }
        }
    }
</style>
<script>
export default {
    mounted() {
        window.addEventListener("scroll", this.scrollTop)
    },
    methods: {
        gotop() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
       scrollTop() {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            const goTop = document.querySelector(".gotop-box");
            if (scrollTop > 400) {
                goTop.style.display = 'block'
            } else {
                goTop.style.display = 'none'
            }
        }
    }
}
</script>
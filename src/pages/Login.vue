<template>
<div class="login">
    <form action="">
        <input class="phoneNum" type="text" placeholder="请输入手机号">     
        <input class="password" type="password" placeholder="请输入密码"/>     
        <input type="text" placeholder="请输入验证码">  
    </form>
    <div class="miandeng"><span class="dui">✔</span><span class="text">一个月内免登陆</span><span class="tips"></span></div>
    <div class="button" @click="login">登 录</div>
    <div class="help">
        <a href="#/regist" class="regist">免费注册</a>
        <a href="" class="findPassword">找回密码</a>
    </div>
</div>
</template>
<style lang="scss" scoped>
    .login {
        padding: 60px 10px;
        background: #F8F8F8;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        form {
            input {
                width: 100%;
                height: 40px;
                margin: 10px 0;
                background: #fff;
                out-line: none;
                text-indent: 10px;
            }
        }
        .miandeng {
            .dui {
                display: inline-block;
                width: 18px;
                height: 18px;
                background: #F15352;
                border-radius: 50%;
                color: #fff;
                line-height: 18px;
                text-align: center;
                margin-right: 10px;
                font-size: 12px;
            }
            .text {
                font-size: 14px;
                color: #777;
            }
            .tips {
                color: red;
                font-size: 12px;
                margin-left: 20px;
            }

        }
        .button {
            line-height: 40px;
            background: #E2E2E2;
            color: #D0c2c2;
            text-align: center;
            margin-top: 20px;
        }
        .help {
            margin-top: 20px;
            font-size: 14px;
            a {
                display: inline-block;
                width: 50%;
                text-decoration: underline;
                color: #777;
            }
            .findPassword {
                text-align: right;
            }
        } 
    }
</style>
<script>
export default {
    methods: {
        login() {
            let phoneNum = document.getElementsByClassName("phoneNum")[0].value;
            let password = document.getElementsByClassName("password")[0].value;
            let tips = document.getElementsByClassName("tips")[0];
            let data = {
                phoneNum,
                password
            }
            // console.log(data)

            this.$http.post("http://localhost:8088/api/userApi/login", data)
                .then(({data}) => {
                    tips.innerHTML = data.msg
                    if(data.code === 0) {
                        this.$router.push("/me")
                        this.$store.state.user = true;
                    }
                })
        }
    }
}
</script>
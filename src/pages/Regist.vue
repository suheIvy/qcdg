<template>
<div class="regist">
    <form action="">
        <div class="picYzm">
             <!-- @blur="checkYzm" @focus="yzmOnFocus"  -->
            <input type="text" placeholder="请输入图片验证码" ref="picYzm" required="required"> 
            <div class="code" @click="refreshCode">
                <SIdentify :identifyCode="identifyCode"></SIdentify>
            </div>
        </div>
        <p class="msgYzm">
             <!-- @blur="checkNum" @focus="phNumFocus"  -->
            <input type="text" class="phoneNum" placeholder="请输入手机号" ref="phoneNum" required="required" maxlength=11/> 
            <span>获取短信验证码</span>
        </p>    
        <input type="text" placeholder="请输入短信验证码" ref="msgYzm" required="required"> 
         <!-- @blur="checkNi" @focus="nameFocus"  -->
        <input type="text" placeholder="请输入昵称(字母、数字、下划线)" ref="name" required="required" maxlength="16">  
        <!-- @blur="checkPassword" @focus="passwordFocus"  -->
        <input type="text" class="password" placeholder="请设置6-20位登录密码" ref="password" required="required">  
    </form>
    <div class="xieyi"><span class="agree">注册即视为同意</span><a href="#/Xieyi" class="name">《器材用户注册协议》</a></div>
    <div class="tips" ref="tips"></div>
    <div class="button" @click="regist" ref="button">注 册</div>
    <div class="gologin"><a href="#/login">已有账号？去登陆</a></div>
</div>
</template>
<style lang="scss" scoped>
    .regist {
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
                margin: 4px 0;
                background: #fff;
                outline: none;
                text-indent: 10px;
            }
            .picYzm {
                display: flex;
                input {
                    flex: 1;
                }
                .code {
                    margin-left: 10px;
                    margin-top: 6px;
                    height: 40px;
                    SIdentify {
                        width: 100%;
                    }
                }
            }
            .msgYzm {
                display: flex;
                input {
                    flex: 1;
                }
                span {
                    // display: inline-block;
                    width: 48%;
                    text-align: center;
                    background: #E2E2E2;
                    margin-left: 3%;
                    height: 40px;
                    line-height: 40px;
                    color: #888;
                    margin-top: 6px;
                }
            }
        }
        .xieyi {
            .agree {
                display: inline-block;
                line-height: 18px;
                font-size: 12px;
                color: #888;
            }
            .name {
                font-size: 12px;
                color: red;
            }

        }
        .tips {
            font-size: 14px;
            color: red;
            height: 14px;
            line-height: 14px;
            padding-left: 10px;
        }
        .button {
            line-height: 40px;
            background: #E2E2E2;
            color: #D0c2c2;
            text-align: center;
            margin-top: 20px;
        }
        .ready {
            background: #F25454;
            color: #fff;
        }
        .gologin {
            font-size: 14px;
            line-height: 30px;
        }
    }
</style>
<script>
import SIdentify from "../components/Yzm.vue";
export default {
    data() {
        return {

        }
    },
    methods: {
        regist() {

            let phoneNum = this.$refs.phoneNum.value;
            let password = this.$refs.password.value;
            let tips = this.$refs.tips;
            let picYzm = this.$refs.picYzm;// 获取验证码
            let name = this.$refs.name;// 获取昵称
            let msgYzm = this.$refs.msgYzm;// 获取短信验证码
            let button = this.$refs.button;// 获取注册按钮
            let data = {
                phoneNum,
                password
            }
            if (password) {
                button.className = "ready"
            }
            // 判断非空
            if (!picYzm.value) {
                tips.innerHTML = "请输入图片验证码";
                picYzm.style.outline = "1px solid red";
                return;
            } else if(picYzm.value !== this.identifyCode) {
                tips.innerHTML = "图片验证码错误";
                picYzm.style.outline = "1px solid red";
                return;
            } else {
                picYzm.style.outline = "none";
                if(!phoneNum) {
                    tips.innerHTML = "请输入手机号";
                    this.$refs.phoneNum.style.outline = "1px solid red";
                    return;
                } else {
                    let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
                    // console.log(phoneNum);
                    if(!reg.test(phoneNum)) {
                        tips.innerHTML = "手机号码错误";
                        this.$refs.phoneNum.style.outline = "1px solid red";
                        return;
                    } else {
                        this.$refs.phoneNum.style.outline = "none";
                        if (!msgYzm.value) {
                            tips.innerHTML = "请输入短信验证码";
                            msgYzm.style.outline = "1px solid red";
                            return;
                        } else {
                            msgYzm.style.outline = "none";
                            if (!name.value) {
                                tips.innerHTML = "请输入昵称";
                                name.style.outline = "1px solid red";
                            } else {
                                let reg = /^[\w\u4e00-\u9fa5]{2,16}$/;
                                if(!reg.test(name.value)) {
                                    tips.innerHTML = "昵称由汉字字母数字下划线组成，长度2~16位";
                                    name.style.outline = "1px solid red";
                                    return;
                                } else {
                                    name.style.outline = "none";
                                    if (!password) {
                                        tips.innerHTML = "请输入密码";
                                        this.$refs.password.style.outline = "1px solid red";
                                    } else {
                                        let reg = /^(\w){6,20}$/;
                                        if(!reg.test(password)) {
                                            tips.innerHTML = "密码格式不正确，由字母数字下划线（6~20）组成";
                                            this.$refs.password.style.outline = "1px solid red";
                                            return;
                                        } else {
                                            console.log("aaa")
                                            this.$refs.password.style.outline = "none";
                                            tips.innerHTML = "";
                                            this.$http.post("http://localhost:8088/api/userApi/regist", data)
                                                .then(({data}) => {
                                                    if(data.code == 1) {
                                                        alert(data.msg)
                                                    } else {
                                                        alert(data.msg)
                                                    }
                                                })
                                        }
                                    }
                                }
                            }
                        }
                    }

                }
            }
            



           


            /*else if (!phoneNum) {
                tips.innerHTML = "请输入电话号码"
                return false;
            } else if (!name.value) {
                tips.innerHTML = "请输入昵称"
                return false;
            } else if (!password) {
                tips.innerHTML = "请输入密码"
                return false;
            }
*/
           




            // if(this.checkYzm()&&this.checkNum()&&this.checkNi()&&this.checkPassword()) {
                /*this.$http.post("http://localhost:8088/api/userApi/regist", data)
                    .then(({data}) => {
                        if(data.code == 1) {
                            alert(data.msg)

                        } else {
                            alert(data.msg)

                        }
                    })*/
            // }
            
        },
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        refreshCode() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                ];
            }
            console.log(this.identifyCode);
        },
        /*checkYzm() {
            let picYzm = this.$refs.picYzm;
            // 判断非空
            if(!picYzm.value) {
                picYzm.value = "请输入验证码";
                return false;
            }
            if (picYzm.value === this.identifyCode) {
                return true;
            } else {
                picYzm.value = "验证码错误"
                return false;
            }
        },
        yzmOnFocus() {
            let picYzm = this.$refs.picYzm;
            picYzm.value = ""
        },
        checkNum() {
            let phoneNum = this.$refs.phoneNum;
            // 判断非空
            if(!phoneNum.value) {
                phoneNum.value = "请输入手机号";
                return;
            }
            // 手机号正则验证
            let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
            // console.log(phoneNum);
            if(reg.test(phoneNum.value)) {

            } else {
                phoneNum.value = "手机号码错误"
                return;
            }
        },
        phNumFocus() {
            let phoneNum = this.$refs.phoneNum;
            phoneNum.value = ""
        },
        checkNi() {
            let name = this.$refs.name;
            // 判断非空
            if(!name.value) {
                name.value = "请输入昵称";
                return;
            }
            // 汉字字母数字下划线 2-16位
            let reg = /^[\w\u4e00-\u9fa5]{2,16}$/;
            if(reg.test(name.value)) {

            } else {
                name.value="昵称由汉字字母数字下划线组成，长度2~16位"
                return;
            }

        },
        nameFocus() {
            let name = this.$refs.name;
            name.value = ""
        },
        checkPassword() {
            let password = this.$refs.password;
            // 判断非空
            if(!password.value) {
                password.value = "请输入密码";
                return;
            }
            // 字母数字下划线 6-20位
            let reg = /^(\w){6,20}$/;
            if(reg.test(password.value)) {

            } else {
                password.value = "密码格式不正确，由字母数字下划线（6~20）组成";
                return;
            }

        },
        passwordFocus() {
            let password = this.$refs.password;
            password.value = ""
        }*/
    },
    components: {
        SIdentify
    },
    name: "codetest",
    data() {
        return {
            identifyCodes: "1234567890",
            identifyCode: ""
        }
    },
    mounted() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
    }
}
</script>


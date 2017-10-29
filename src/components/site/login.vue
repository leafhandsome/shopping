<template>
  <div class="tmpl">
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/login.html">会员登录</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit">
            <a class="selected" href="javascript:;">账户登录</a>
            <i>|</i>
            <a href="/register.html">免费注册</a>
          </div>
          <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <div id="loginform" class="login-box">
            <div class="input-box">
              <input id="txtUserName" type="text" v-model="form.user_name" placeholder="用户名/手机/邮箱" maxlength="50">
            </div>
            <div class="input-box">
              <input id="txtPassword" type="password" v-model="form.password" placeholder="输入登录密码" maxlength="16">
            </div>
            <div class="btn-box">
              <input id="btnSubmit" type="button" @click='login' value="立即登录">
            </div>
            <div id="msgtips" class="tip-box"></div>
           
            <!--记住上一页网址-->
          </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import {vm} from '../../kits/vm.js'
  export default{
    data(){
      return{
        form:{
          user_name:'',
          password:''
        },
        rules:{
           user_name:[{ required: true, message: '请输入用户名', trigger: 'blur' },],  
           password:[{ required: true, message: '请输入密码', trigger: 'blur' },]  
      }
      }
    },
   
    methods:{
        login(){
            this.$http.post('/site/account/login',this.form).then(res=>{
              if(res.data.status==1){
                this.$message.error('请求失败')
              }
              var routerName=localStorage.getItem('routerName');
              console.log(routerName);
              localStorage.setItem('islogin',true)
              vm.$emit('changeshow')
             this.$router.push({name:routerName})
            })
        }
    }
  }
</script>
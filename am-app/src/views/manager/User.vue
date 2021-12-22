<!--
 * @Description: 我的tab
 * @Author: charles
 * @Date: 2021-12-14 20:42:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-22 10:28:13
-->

<template>
  <div class="user">
    <div class="header">
      <div class="photo">
        <img src="../../assets/mxc.jpg" alt=""/>
      </div>
      <div class="name">{{info.name}}</div>
    </div>
    <van-cell-group>
      <van-cell title="用户名" :value="userInfo.username" />
      <van-cell title="姓名" :value="userInfo.realname" />
      <van-cell title="性别"   :value="userInfo.gender=='male'?'男':'女'"/>
      <van-cell title="电话号码"  :value="userInfo.telephone"/>
      <van-cell title="出生日期"  :value="userInfo.birth | datefmt2('YYYY-MM-DD')"/>
    </van-cell-group>
    <van-cell title="所有订单" is-link to="/manager/order" />
    <div class="btn" @click="logoutHandler"> 退出登录 </div>
    <div class="btn" @click="logoutHandler"> 切换账号 </div>
  </div>
</template>
<script>
import {patch, get} from '../../http/axios';
import {mapState, mapActions} from 'vuex'
export default {
  data() {
    return {
      userInfo:{},
    }
    },
    created(){
      this.getUserInfo()
  },
  methods:{
    getUserInfo(){
    get("/user/getInfo").then(res =>{
      if(res && res.status==200 && res.data){
        this.userInfo = res.data
      }
    })
  },
    ...mapActions('user',['logout']),
    logoutHandler(){
      this.logout().then(()=>{
        this.$router.push({path:'/login'})
      });
    }
  },
  computed:{
    ...mapState("user",["info"])
  },
}
</script>

<style scoped>
.header {
  padding-top: 46px;
  text-align: center;
  background: #1659a0;
  margin-bottom: 2em;
}

.header .photo {
  margin: 0 auto;
  width: 20em;
  height: 20em;
  border-radius: 100%;
  box-sizing: border-box;
  border:5px solid #1659a0;
  overflow:hidden;
  padding: 1em;
}
.header .name {
  line-height: 3em;
  font-size: 16px;
  color: #ffffff;

}
.header .photo img {
 width: 100%;
 border-radius: 100%;
}

.btn {
  width: 90%;
  margin: 1em auto;
  line-height: 3em;
  text-align: center;
  border: 1px solid #16408f;
  border-radius: 1.5em;
  background: #5c95ce;
  color: rgb(36, 95, 75);
}

</style>

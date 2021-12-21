<!--
 * @Description: 我的tab
 * @Author: charles
 * @Date: 2021-12-14 20:42:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-21 14:17:09
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
      <van-cell title="昵称" value="花开富贵" />
      <van-cell title="性别" value="女"  />
      <van-cell title="电话号码" value="18410010086" />
      <van-cell title="选择出生日期" :value="date" @click="show = true" />
      <van-calendar v-model="show" @confirm="onConfirm" />
    </van-cell-group>
    <van-cell title="所有订单" is-link to="/manager/order" />
    <div class="btn" @click="logoutHandler"> 退出登录 </div>
    <div class="btn" @click="logoutHandler"> 切换账号 </div>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
  data() {
    return {
      date: '',
      show: false,
    };
  },
  methods:{
     formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
    },
    ...mapActions('user',['logout']),
    logoutHandler(){
      this.logout();
    }
  },
  computed:{
    ...mapState("user",["info"])
  }
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
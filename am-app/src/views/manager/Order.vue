<!--
 * @Description: 订单tab
 * @Author: charles
 * @Date: 2021-12-14 20:42:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-22 09:29:02
-->
<template>
  <div class="order">
    <van-nav-bar title="我的工单" />
    <van-tabs @click="tabClickHandler" v-model="active" color="#1659a0">
      <van-tab title="全部"></van-tab>
      <van-tab title="进行中"></van-tab> 
      <van-tab title="已完成"></van-tab> 
    </van-tabs>
    <!-- 订单 -->
    <div class="order_list">
      <div class="order" v-for="o in workOrderData.list" :key="o.id">
        <div class="time">{{o.create_time}}</div>
        <van-row>
          <van-col span="6" style="text-align:center;font-size:80px">
            <van-icon name="todo-list-o" />
          </van-col>
          
          <van-col span="18">
            <div>类型： {{o.type}} </div>
            <div>状态： {{o.status}} </div>
            <div>设备： {{o.device_name}} </div>
            <div>工程： {{o.engineer_name}} </div>
            <div>描述： {{o.bill_why}} </div>
          </van-col>
        </van-row>
        <div class="btns">
          <van-button 
            v-if="o.status === '进行中'" 
            plain hairline size="small" 
          icon="https://img01.yzcdn.cn/vant/user-active.png" type="info" @click="toCompeleteOrderHandler(o)">完成接单</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {get} from '../../http/axios'
export default {
  data(){
    return {
      active:0,
      orders:[],
      status:null,
      params:{
        page:1,
        pageSize:10,
      },
      workOrderData:{list:[]}
    }
  },
  computed:{
    ...mapState("user",["info"])
  },
  mounted() {
    this.loadWorkOrder();
  },
  methods:{
    // 完成工单
    toCompeleteOrderHandler(row){
      this.$router.push({
        path:'/manager/complete',
        query:row
      })
    },
    // 点击tab的时候执行的回调函数
    tabClickHandler(name,title){
      // 修改当前data中status的值； 重新加载订单
      this.params.status = title === "全部" ? null : title;
      this.loadWorkOrder();
    },
    // 加载当前用户的工单信息
    loadWorkOrder(){
      let url = "/workorder/pageQuery"
      // 绑定当前用户
      this.params.account_id = this.info.id;
      get(url,this.params).then(resp => {
        this.workOrderData = resp.data;
      })
    }
  }
}
</script>
<style scoped>
.order {
  font-size: 14px;
  color: #666;
  padding-bottom: 50px;
  background-color: #e7e7e7;
}
.order .order_list{
  padding: .5em;
}
.order .order_list > .order {
  background-color: rgb(241, 241, 241);
  margin-bottom: .5em;
  border-radius: 5px;
  padding:.5em
}
.order .order_list > .order > .time {
  line-height: 2.4em;
  border-left: em;
  border-bottom: 1px solid #f4f4f4;
  padding:.1em
}
.order .order_list > .order > .btns {
  padding: .5em;
  text-align: right;
}
</style>
<!--
 * @Description: 主页tab
 * @Author: charles
 * @Date: 2021-12-14 20:42:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-22 10:44:27
-->
<template>
  <div class="home">
    <van-nav-bar title="首页" />
    <div class="order_list">
      <div class="order" v-for="o in workOrderData.list" :key="o.id">
        <div class="time"> <strong> 申报时间：</strong> {{o.create_time|datefmt('YYYY-MM-DD HH:mm:ss')}} </div>
        <van-row>
          <van-col span="5" style="text-align:center;font-size:48px;position:bottom">
            <van-icon name="https://img01.yzcdn.cn/vant/logo.png" />
          </van-col>
          <van-col span="18">
            <div><strong>类型：</strong>  {{o.type}} </div>
            <div><strong>状态： </strong> {{o.status}} </div>
            <div><strong>设备： </strong> {{o.device_name}} </div>
            <div><strong>工程： </strong> {{o.engineer_name}} </div>
            <div><strong>创建时间:</strong>  {{o.create_time}} </div>
          </van-col>
        </van-row>
        <div class="btns">
          <van-button plain hairline size="mini" type="primary" @click="toTakeOrderHandler(o.id)">接单</van-button>
          <van-button plain hairline size="mini" type="primary" @click="toRefuseHandler(o.id)">拒绝接单</van-button>
        </div>
      </div>
    </div>
    <van-pagination
     :v-model="params.page"
     :total-items="workOrderData.total"
     :itwms-per-page="workOrderData.pageSize"
     @change="changePage"/>
  </div>
</template>
<script>
import {get} from '../../http/axios'
import {mapState} from 'vuex'
import {Toast} from 'vant'
export default {
  data(){
    return {
      currentPage: 1,
      params:{
        page:1,
        pageSize:10,
        status:'待接单'
      },
      workOrderData:{list:[]}
    }
  },
  computed: {
    ...mapState('user',['info'])
  },
  mounted() {
    this.loadWorkOrder();
  },
  methods:{
    //分页
    changePage(size){
        this.params.page= size,
        this.loadWorkOrder();
    },
    toRefuseHandler(id){
       // 1. 获取工单id和用户id
      let account_id = this.info.id;
      let params = {id,account_id}
      // 2. 调用拒绝接单
      let url = "/workorder/cancelOrder"
      get(url,params).then(resp => {
        // 3. 提示
        Toast.success(resp.message)
        this.loadWorkOrder();
      })
    },
    // 接单
    toTakeOrderHandler(id){
      // 1. 获取工单id和用户id
      let account_id = this.info.id;
      let params = {id,account_id}
      // 2. 调用接口完成接单
      let url = "/workorder/takeOrder"
      get(url,params).then(resp => {
        // 3. 提示
        Toast.success(resp.message)
        this.loadWorkOrder();
      })
    },
    loadWorkOrder(){
      let url = "/workorder/pageQuery"
      get(url,this.params).then(resp => {
        this.workOrderData = resp.data;
      })
    }
  }
}
</script>
<style scoped>
.home {
  font-size: 12px;
  color: #666;
  padding-bottom: 50px;
  background-color: #f5f3f3;
}
.home .order_list{
  padding: .5em;
}
.home .order_list > .order {
  background-color: rgb(163, 219, 228);
  margin-bottom: .5em;
  border-radius: 5px;
  padding:.5em
}
.home .order_list > .order > .time {
  line-height: 2.4em;
  border-bottom: 1px solid #f4f4f4;
}
.home .order_list > .order > .btns {
  padding: .5em;
  text-align: right;
}
</style>
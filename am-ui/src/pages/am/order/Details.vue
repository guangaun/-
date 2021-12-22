<!--
 * @Description: 工单详情
 * @Author: charles
 * @Date: 2021-12-14 22:10:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-22 10:47:33
-->
<template>
  <div class="engineer_details">
    <el-button type="primary" size="small" @click="backhandler">返回</el-button>
    <div class="engineer">
      <h3>工单信息</h3>
      <el-row>
        <el-col :span="12">
          <span class="label">工程名称</span>
          <span class="value">{{engineer.engineer_name}}</span>
        </el-col>       
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="label">设备名称</span>
          <span class="value">{{engineer.device_name}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="label">维修工</span>
          <span class="value">{{engineer.account_name}}</span>
        </el-col>        
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="label">报修原因</span>
          <span class="value">{{engineer.bill_why}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="label">完成记录</span>
          <span class="value">{{engineer.finish_note}}</span>
        </el-col>        
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="label">类型</span>
          <span class="value">{{engineer.type}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="label">状态</span>
          <span class="value">{{engineer.status}}</span>
        </el-col>
      </el-row>
    </div>  

  </div>
</template>
<script>
import {get} from '@/utils/request'
export default {
  data(){
    return {
      engineer:{},
      visible:false,
      form:{},
      devices:[],
      bindedDevices:[]
    }
  },
  mounted() {
    this.engineer = this.$route.query;
    // 查询所有未绑定的设备
    this.loadUnbindDevices();
    // 查询该工程上绑定的所有设备
    this.loadEngineerDevices();
  },
  methods:{
    
    // 加载该工程绑定的设备信息
    loadEngineerDevices(){
      let url = "/workorder/findById"
      let params = {page:1,pageSize:1000,engineer_id:this.engineer.id}
      get(url,params).then(resp => {
        this.bindedDevices = resp.data.list;
      })
    },
    loadUnbindDevices(){
      let url = "/device/pageQuery";
      let params = {page:1,pageSize:1000,bind_status:0}
      get(url,params).then(resp => {
        this.devices = resp.data.list;
      })
    },
    toBindHandler(){
      this.visible = true;
      this.form = {
        engineer_id:this.engineer.id
      }
    },
    submitHandler(){
      let url = "/engineer/bindService"
      get(url,this.form).then(resp => {
        this.$message({type:"success",message:resp.message});
        this.visible = false;
        this.loadEngineerDevices();
        this.loadUnbindDevices();
      })
    },
    backhandler(){
      this.$router.go(-1);
    }
  }
}
</script>
<style scoped>
.engineer_details .engineer .label{
  font-weight: bold;
  padding-right: 5px;
  line-height: 2.4em;
}
</style>
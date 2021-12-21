<!--
 * @Description: 
 * @Author: charles
 * @Date: 2021-12-14 22:15:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-21 10:27:29
-->
<template>
  <div class="engineer_pointinfo">
    <el-row>
      <el-col :span="6" style="padding-right:.5em;border-right:2px solid #f4f4f4">

        <el-tree :data="eds" :props="defaultProps" @node-click="handleNodeClick" ></el-tree>
      </el-col>
      <el-col :span="18">
        <div v-if="params.device_id"> 
        <div>
          {{enginnerdata}}
        </div>
        <div class="engineerinfo" >
          <h3>工程信息</h3>
      <el-row >
        <el-col :span="12">
          <span class="label" >工程名称</span>
          <span class="value">{{engineerinfo.name}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">工程编号</span>
          <span class="value">{{engineerinfo.serial_number}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="label">工程状态</span>
          <span class="value">{{engineerinfo.status}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">工程类型</span>
          <span class="value">{{engineerinfo.type}}</span>
        </el-col>
      </el-row>
         <el-row>
        <el-col :span="12">
          <span class="label">开始时间</span>
          <span class="value">{{engineerinfo.begin_time}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">结束时间</span>
          <span class="value">{{engineerinfo.end_time}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="label">地址</span>
          <span class="value">{{engineerinfo.address}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="label">工作负责人</span>
          <span class="value">{{engineerinfo.charge_name}}</span>
        </el-col>
      </el-row>
        </div>
           </div>
        <div v-else style="line-height:3em;color:red;text-align:center">请选择设备</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {get} from '@/utils/request'
export default {
  // 变量
  data(){
    return {
      engineerinfo:{},

      defaultProps:{
        
        children: 'children',
        label: 'name'
      },
      eds:[],
      params:{
        page:1,
        pageSize:10,
      },
      engineerdata:{list:[]},
    }
  },
  // 监听器
  watch:{
    params:{
      handler(){
        this.loadEngineer()
      },
      deep:true
    }
  },
  // 方法
  methods:{
    //加载数据
    loadEngineer(){
      let url="/engineer/pageQuery"
      get(url,this.params).then(resp=>{
        this.engineerdata=resp.data;
      })

    },

    handleNodeClick(node){
      if(node.engineer_id ){
        // 点击了设备
        this.$set(this.params,'engineer_id',node.engineer_id)
        this.$set(this.params,'device_id',node.id)
      }
    },
    // 加载工程设备树
    loadEngineerDevices(){
      let url = "/engineer/findEngineerDeviceTree"
      get(url).then(resp => {
        this.eds = resp.data;
      })
    }
  },

  // 页面加载完毕后执行
  mounted() {
    this.loadEngineerDevices(); 
    this.engineerinfo = this.$route.params;
   
  },
}
</script>
<style scoped>
.engineer_pointinfo .engineerinfo .label{
  font-weight: bold;
  padding-right: 5px;
  line-height: 2.4em;
}
</style>

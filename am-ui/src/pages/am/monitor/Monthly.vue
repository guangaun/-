<!--
 * @Description: 
 * @Author: charles
 * @Date: 2021-12-14 22:13:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-21 11:06:34
-->
<template>
  <div>
    <el-row>
      <el-col :span="6" style="padding-right:.5em;border-right:2px solid #f4f4f4">
   
        <el-tree :data="eds" :props="defaultProps" @node-click="handleNodeClick" ></el-tree>
      </el-col>
      <el-col :span="18">
        <div v-if="params.device_id"> 
          <div>
          </div>
    
          <el-table :data="mouthData" size="small">
          <el-table-column label="tsp" prop="tsp" width="60" align="center"></el-table-column>
          <el-table-column label="pm10" prop="pm10" width="60" align="center"></el-table-column>
          <el-table-column label="pm25" prop="pm25" width="60" align="center"></el-table-column>
          <el-table-column label="温度" prop="temperature" width="60" align="center"></el-table-column>
          <el-table-column label="湿度" prop="humidity" width="60" align="center"></el-table-column>
          <el-table-column label="噪音" prop="noise" width="60" align="center"></el-table-column>
          <el-table-column label="风速" prop="wind_speed" width="60" align="center"></el-table-column>
          <el-table-column label="风向" prop="wind_direction" width="60" align="center"></el-table-column>
          </el-table>
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

      defaultProps:{
        children: 'children',
        label: 'name'
      },
      eds:[],
      params:{
        page:1,
        pageSize:10
      },
      mouthData:{list:[]}
    }
  },
  // 监听器
  watch:{
    params:{
      handler(){
        this.loadMouth()
      },
      deep:true
    }
  },
  // 方法
  methods:{
    //加载数据
    loadMouth(){
      let url="/monitor/queryMouthData"
      get(url).then(resp=>{
        this.mouthData=resp.data;
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
  },
}
</script>

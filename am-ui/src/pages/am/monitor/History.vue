<!--
 * @Description: 历史数据
 * @Author: charles
 * @Date: 2021-12-14 22:07:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-22 21:26:47
-->


 * @LastEditTime: 2021-12-22 16:09:29
-->

<template>
  <div>
    <div></div>
    <el-row>
      <el-col :span="6" style="padding-right:.5em;border-right:2px solid #f4f4f4">
        <el-tree :data="eds" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :span="18">
        <div v-if="params.device_id"> </div>
      </el-col>
      <el-col :span="18">
        <div v-if="params.device_id">
          <el-table :data="historyData.list" size="small">
            <el-table-column label="tsp" prop="tsp" width="60" align="center"></el-table-column>
            <el-table-column label="pm10" prop="pm10" width="60" align="center"></el-table-column>
            <el-table-column label="pm2.5" prop="pm25" width="100" align="center"></el-table-column>
            <el-table-column label="温度" prop="temperature" width="60" align="center"></el-table-column>
            <el-table-column label="湿度" prop="humidity"  width="60" align="center"></el-table-column>
            <el-table-column label="噪音" prop="noise" align="center"></el-table-column>
            <el-table-column label="风速" prop="wind_speed" align="center"></el-table-column>
            <el-table-column label="风向" prop="wind_direction" align="center"></el-table-column>
          </el-table>  
          <el-pagination
            :current-page="+historyData.page"
            :page-size="+historyData.pageSize"
            :total="+historyData.total"
            @current-change="pageChangeHandler"
          ></el-pagination>
        </div>
        
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
        filterText: '',
      defaultProps:{
        children: 'children',
        label: 'name'
      },
      eds:[],
      params:{
        page:1,
        pageSize:10
      },
      historyData:{list:[]}
    }
  },
  // 监听器
  watch:{
       filterText(val) {
        this.$refs.tree.filter(val);
      },
    params:{
      handler(){
        this.loadHistory()
      },
      deep:true
    }
  },
  // 方法
  methods:{
      filterNode(value, eds) {
        if (!value) return true;
        return eds.name.indexOf(value) !== -1;
      },
    // 加载数据
    loadHistory(){
      let url = "/monitor/pageQuery"
      get(url,this.params).then(resp => {
        this.historyData = resp.data;
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
    },
    pageChangeHandler(page){
      this.params.page = page;
    }
  },
  // 页面加载完毕后执行
  mounted() {
    this.loadEngineerDevices();
  },
}
</script>

<template>
  <div class="engineer_pointinfo">
    <el-row>
      <el-col :span="6" style="padding-right:.5em;border-right:2px solid #f4f4f4">

        <el-tree :data="eds" :props="defaultProps" @node-click="handleNodeClick" ></el-tree>
      </el-col>
      <el-col :span="18">
        <div v-if="params.device_id"> 
        <div class="engineerinfo" >
          <!-- 工程信息 -->
          <h3 backgroung="#303133">工程信息</h3>
      <el-row >
        <el-col :span="12">
          <span class="label" >工程名称</span>
          <span class="value">{{pointinfo.engineer.name}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">工程编号</span>
          <span class="value">{{pointinfo.engineer.serial_number}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="label">工程状态</span>
          <span class="value">{{pointinfo.engineer.status}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">工程类型</span>
          <span class="value">{{pointinfo.engineer.type}}</span>
        </el-col>
      </el-row>
         <el-row>
        <el-col :span="12">
          <span class="label">开始时间</span>
          <span class="value">{{pointinfo.engineer.begin_time}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">结束时间</span>
          <span class="value">{{pointinfo.engineer.end_time}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="label">地址</span>
          <span class="value">{{pointinfo.engineer.address}}</span>
        </el-col>
      </el-row>
      <!-- /工程信息结束 -->
      <!-- 设备信息 -->
    
        <h3>设备信息</h3>
      <el-row >
        <el-col :span="12">
          <span class="label" >设备名称</span>
          <span class="value">{{pointinfo.name}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">设备编号</span>
          <span class="value">{{pointinfo.serial_number}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="label">绑定状态</span>
          <span >
            <el-tag size="mini" type="success" v-if="pointinfo.bind_status == 1">已绑定</el-tag>
          <el-tag size="mini" type="danger" v-else>未绑定</el-tag>
          </span>
        </el-col>
        <el-col :span="12">
          <span class="label">在线状态</span>
          <span>
          <el-tag size="mini" type="success" v-if="pointinfo.online_status == 1">已连接</el-tag>
          <el-tag size="mini" type="danger" v-else>未连接</el-tag>
          </span>
        </el-col>
      </el-row>
      <!-- /设备信息结束 -->
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
    

      defaultProps:{
        
        children: 'children',
        label: 'name'
      },
    
      eds:[],
      params:{},
      pointinfo:[],
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
      let url="/device/findDeviceDetail"
      get(url,{id:this.params.device_id}).then(resp=>{
        this.pointinfo=resp.data;
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
    this.engineerinfo = this.$route.query;
   
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

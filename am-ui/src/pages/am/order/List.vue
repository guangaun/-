<!--
 * @Description: 工单列表
 * @Author: charles
 * @Date: 2021-12-14 22:07:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-21 09:14:32
-->
<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-form :model="params" inline size="small">
          <el-form-item>
            <el-input v-model="params.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryHandler">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12" style="text-align:right">
      </el-col>
    </el-row>
   
    <el-table size="small" :data="workorderData.list">
      <el-table-column label="工程名称" prop="engineer_name" width="400" align="center"></el-table-column>
      <el-table-column label="设备名称" prop="device_name" width="180" align="center"></el-table-column>
      <el-table-column label="状态" prop="status" align="center"></el-table-column>
      <el-table-column label="工单类型" prop="type" width="120" align="center"></el-table-column>
      <el-table-column label="操作" width="130" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="toDetailsHandler(scope.row)">详情</el-button>
          <el-button type="text" size="small" @click="open(scope.row)">取消</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      hide-on-single-page
      :total="+workorderData.total"
      :current-page="+workorderData.page"
      :page-size="+workorderData.pageSize"
      @current-change="pageChangeHandler"
    ></el-pagination>
    
  </div>
</template>

<script>
import {get,postJSON} from '@/utils/request'
export default {
  data(){
    return {
      params:{
        page:1,
        pageSize:10
      },
      title:"",
      visible:false,
      form:{},
      workorderData:{list:[]}
    }
  },
  mounted() {
    this.loadWorkorders();
  },
  methods:{
     open(row) {
        this.$confirm('此操作将永久删除该工单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
    toDetailsHandler(row){
      this.$router.push({
        path:'/am/engineer/Details',
        query:row
      })
    },
    // 取消工单
    toCancelHandler(row){

    },
    queryHandler(){
      this.params.page = 1;
      this.loadWorkorders();
    },
    
    // 加载工单数据
    loadWorkorders(){
      let url = "/workorder/pageQuery";
      get(url,this.params).then(resp => {
        this.workorderData = resp.data;
      })
    },
    pageChangeHandler(page){
      this.params.page = page;
      this.loadWorkorders();
    }
  }
}
</script>
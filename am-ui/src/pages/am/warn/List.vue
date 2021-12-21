<!--
 * @Author: your name
 * @Date: 2021-12-21 14:51:59
 * @LastEditTime: 2021-12-21 16:19:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \group-2\am-ui\src\pages\am\worker\List.vue
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
        <el-button type="primary" size="small" @click="toAddHandler">录入</el-button>
      </el-col>
    </el-row>
   
    <el-table size="small">
      <el-table-column label="pm2.5超标" prop="" width="200" align="center"></el-table-column>
      <el-table-column label="pm10超标" prop="" width="200" align="center"></el-table-column>
      <el-table-column label="温度过高" prop="" width="200" align="center"></el-table-column>
      <el-table-column label="湿度过高" prop="" width="200" align="center"></el-table-column>
      <el-table-column label="操作"  align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="toEditHandler(scope.row)">s</el-button>
          <el-button type="text" size="small" @click="toBindHandler(scope.row)">绑定</el-button>
          <el-button type="text" size="small" @click="toEndHandler(scope.row)">结束</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      hide-on-single-page
      :total="+engineerData.total"
      :current-page="+engineerData.page"
      :page-size="+engineerData.pageSize"
      @current-change="pageChangeHandler"
    ></el-pagination>

    <el-dialog :title="title" :visible.sync="visible">
      <el-form :model="form" label-width="100px">
        <el-form-item label="姓名" >
          <el-select v-model="form.charge_id">
            <el-option 
              v-for="c in charges" 
              :key="c.id" 
              :label="c.realname" 
              :value="c.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工号" >
          <el-input v-model="form.serial_number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" >
          <el-select v-model="form.type">
            <el-option label="男" value=""></el-option>
            <el-option label="女" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="籍贯" >
          <el-select v-model="form.adress">
            <el-option label="甘肃" value="0"></el-option>
            <el-option label="上海" value="1"></el-option>
          </el-select>
          <el-select v-model="form.adress">
            <el-option label="兰州" value="0"></el-option>
            <el-option label="平凉" value="0"></el-option>
            <el-option label="苏州" value="1"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="家庭住址" >
          <el-input v-model="form.customer_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" >
          <el-input v-model="form.customer_telephone" autocomplete="off" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="visible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>
	label:before {
	  content: '* ';
    color: red;
  }
</style>
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
      engineerData:{list:[]},
      charges:[],
    }
  },
  mounted() {
    this.loadEngineers();
    this.queryCharges();
  },
  methods:{
    //结束工程
    toEndHandler(row){
        let url = "/engineer/finish"
        get(url,{id:row.id}).then(resp =>{
        this.$message({type:"success",message:resp.message});
        this.loadEngineers();
      })
    },
    // 绑定设备
    toBindHandler(row){
      this.$router.push({
        path:'/am/engineer/Details',
        query:row
      })
    },
    // 查询区域经理
    queryCharges(){
      let url = "/user/pageQuery"
      let params = {
        page:1,
        pageSize:100,
        role_id:3
      }
      get(url,params).then(resp => {
        this.charges = resp.data.list;
      })
    },
    queryHandler(){
      this.params.page = 1;
      this.loadEngineers();
    },
    submitHandler(){
      let url ="/engineer/saveOrUpdate"
      postJSON(url,this.form).then(resp => {
        this.$message({type:"success",message:resp.message})
        this.visible = false;
        this.loadEngineers();
      })
    },
    toEditHandler(row){
      this.form = row;
      this.title = "更改工程信息"
      this.visible = true;
    },
    // 加载工程数据
    loadEngineers(){
      let url = "/engineer/pageQuery";
      get(url,this.params).then(resp => {
        this.engineerData = resp.data;d
      })
    },
    pageChangeHandler(page){
      this.params.page = page;
      this.loadEngineers();
    },
    toAddHandler(){
      this.visible = true;
      this.title = "录入工人";
      this.form = {}
    }
  }
}
</script>
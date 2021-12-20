<!--
 * @Description: 
 * @Author: charles
 * @Date: 2021-05-05 22:02:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-20 20:39:37
-->
<template>
  <div ref="left2_container" style="height:95%"></div>
</template>
<script>
import { Pie } from '@antv/g2plot';//导入图标构造函数
import {get} from '../../../utils/request'
export default {
  data(){
    return{
      dd:[]
    }
  },
  async mounted() {    
    //查询数据
    await this.loadData();  
     //页面渲染的时候初始化图标
    this.initChart()
  },
  methods:{
   // 查询数据统计 ajax 异步的javascript和xml
    async loadData(){
      let url = "/dashboard/queryDeviceOnlineNumber"
      let resp = await get(url);
      this.dd = resp.data;
    },
    initChart(){    //初始化图表
      const data =this.dd;
      const piePlot = new Pie(this.$refs.left2_container, {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
         color: ['l(90) 0:#8589ea 1:#cfcefe', 'l(90) 0:#c3f7f9 1:#0ab6ee', 
                'l(90) 0:#0ac9c7 1:#7df3f2'],
        radius: 1,
          label: {
          formatter(v){
            return v.value+'个';
          },
          style:{
            fontSize: 16,
            type: 'outer',
            fill:'#fff'
           }
          },
        interactions: [{ type: 'element-active' }],
      });
      piePlot.render();
    }
  }
}
</script>
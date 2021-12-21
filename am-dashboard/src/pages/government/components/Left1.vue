<!--
 * @Description: 
 * @Author: charles
 * @Date: 2021-05-05 22:02:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-21 14:40:57
-->
<template>
  <div ref="left1_container" style="height:95%"></div>
</template>
<script>
import { Column } from '@antv/g2plot';
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
      let url = "/dashboard/queryMouthData"
      let resp = await get(url);
      this.dd = resp.data;
    },
    initChart(){    //初始化图表
      const data =this.dd;
       const columnPlot = new Column(this.$refs.left1_container, {
        data,
        xField: 'date',
        yField: 'value',
         color: 'l(90) 0:#0ac9c7 1:#7df3f2', 
        xAxis: {
          label: {
            style: {
              fill: "white",
              fontFamily: "TencentSans",
              fontSize: 10,
            },
          },
        },
         yAxis: {
          label: {
            style: {
              fill: "white",
              fontFamily: "TencentSans",
              fontSize: 10,
            },
          },
        },
      });

      columnPlot.render();
    }
  }
}
</script>
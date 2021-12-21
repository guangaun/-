<!--
 * @Description: 
 * @Author: charles
 * @Date: 2021-05-05 22:02:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-21 14:37:23
-->
<template>
  <div ref="right1_container" style="height:95%"></div>
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
      let url = "/dashboard/queryEngineerNumber"
      let resp = await get(url);
      this.dd = resp.data;
    },
    initChart(){    //初始化图表
      const data =this.dd;
       const columnPlot = new Column(this.$refs.right1_container, {
  data,
  xField: 'type',
  yField: 'value',
    color:'l(90) 0:#D1D1FF 1:#7C82EA',
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
  label: {
    // 可手动配置 label 数据标签位置
    position: 'middle', // 'top', 'bottom', 'middle',
    // 配置样式
    style: {
      fill: '#FFFFFF',
      opacity: 0.6,
    },
  },
  
  meta: {
    type: {
      alias: '状态',
    },
    sales: {
      alias: '数量',
    },
  },
});

columnPlot.render();
    }
  }
}
</script>
<!--
 * @Description: 
 * @Author: charles
 * @Date: 2021-05-05 22:02:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-20 23:04:22
-->
<template>
 <div ref="Right1_container" style="height:95%"></div>
</template>
<script>
import { Bar } from '@antv/g2plot';
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
      let url = "/dashboard/queryEngineerBindDeviceNumber"
      let resp = await get(url);
      this.dd = resp.data;
    },
    initChart(){    //初始化图表
      const data =this.dd;
      const bar = new Bar(this.$refs.Right1_container, {
  data,
  xField: 'value',
  yField: 'type',
   yAxis: {
          label: {
            style: {
              fill: "white",
              fontFamily: "TencentSans",
              fontSize: 8,
            },
          },
        },
  seriesField: 'value',
  legend: {
    position: 'top-left',
  },
});

bar.render();
    }
  }
}
</script>
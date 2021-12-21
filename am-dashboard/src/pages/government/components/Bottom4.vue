<!--
 * @Description: 
 * @Author: charles
 * @Date: 2021-05-05 22:02:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-21 20:55:07
-->
<template>
 <div ref="Bottom4_container" style="height:95%"></div>
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
      const bar = new Bar(this.$refs.Bottom4_container, {
  data,
  xField: 'value',
  yField: 'type',
   yAxis: {
          label: {
          
            style: {
              fill: "white",
              fontFamily: "TencentSans",
              fontSize: 10,
              content:"",
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
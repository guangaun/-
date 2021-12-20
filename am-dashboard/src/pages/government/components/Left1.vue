<!--
 * @Description: 
 * @Author: charles
 * @Date: 2021-05-05 22:02:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-18 12:47:58
-->
<template>
 <!--1. 容器 -->
  <div ref="left1_container" style="height:95%"></div>
</template>

<script>
import { Line } from '@antv/g2plot';

export default {
 mounted () {
   this.initChart();
  },
  methods:{
    initChart(){
      const data=[
        {time:'10:10',value:'20'},
        {time:'10:11',value:'21'},
        {time:'10:12',value:'20'}
      ]
      const line = new Line(this.$refs.left1_container, {
        data,
        xField: 'time',
        yField: 'value',
        color:'l(90) 0:#D1D1FF 1:#7C82EA',
        xAxis: {
          label: {
            style: {
              fill: "white",
              fontFamily: "TencentSans",
              fontSize: 16,
            },
          },
        },
         yAxis: {
          label: {
            style: {
              fill: "white",
              fontFamily: "TencentSans",
              fontSize: 16,
            },
          },
        },
    });
    line.render();
   }
  }
}
</script>

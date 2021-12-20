<!--
 * @Description: 
 * @Author: charles
 * @Date: 2021-05-05 22:02:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-19 09:02:45
-->
<template>
 <!--1. 容器 -->
  <div ref="Bottom3_container" style="height:95%"></div>
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
       {
            year: "tst",
            value: 0
           
          },
          {
            year: "PM10",
            value: 10
            
          },
          {
             year: "PM25",
            value: 6
           
          }
      ]
      const line = new Line(this.$refs.Bottom3_container, {
      data,
      xField: 'year',
      yField: 'value',
      
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

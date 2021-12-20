<!--
 * @Description: 
 * @Author: charles
 * @Date: 2021-05-05 22:02:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-19 09:29:50
-->
<template>
 <!--1. 容器 -->
  <div ref="Bottom4_container" style="height:95%"></div>
</template>

<script>
import { Bar } from '@antv/g2plot';

export default {
 mounted () {
   this.initChart();
  },
  methods:{
    initChart(){
      const data=[
          { year: '12月', value: 38 },
          { year: '9月', value: 52 },
          { year: '6月', value: 61 },
          { year: '3月', value: 145 },
          
      ]
      const bar = new Bar(this.$refs.Bottom4_container,{
        data,
        colorField: 'type',
         color: ['l(90) 0:#8589ea 1:#cfcefe',  'l(90) 0:#0ac9c7 1:#7df3f2', 'l(90) 0:#7d82ea 1:#7ef3f2','l(90) 0:#c3f7f9 1:#0ab6ee'
               ],
        xField: 'value',
        yField: 'year',
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
        seriesField: 'year',
        legend: {
          position: 'top-left',
        },
      });

      bar.render();
   }
  }
}
</script>

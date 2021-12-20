<!--
 * @Description: 
 * @Author: charles
 * @Date: 2021-05-05 22:02:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-19 14:53:55
-->
<template>
 <!--1. 容器 -->
  <div ref="Bottom2_container" style="height:95%"></div>
</template>

<script>
import { Scatter } from '@antv/g2plot';

export default {
 mounted () {
   this.initChart();
  },
  methods:{
    initChart(){
      const data=[
        {
    "Title": "Guardians of the Galaxy",
    "Genre": "Action",
    "Revenue (Millions)": 333.13,
    "Rating": 8.1
  },
  {
    "Title": "Prometheus",
    "Genre": "Adventure",
    "Revenue (Millions)": 126.46,
    "Rating": 7
  },
  {
    "Title": "Split",
    "Genre": "Horror",
    "Revenue (Millions)": 138.12,
    "Rating": 7.3
  },
  {
    "Title": "Sing",
    "Genre": "Animation",
    "Revenue (Millions)": 270.32,
    "Rating": 7.2
  },
  {
    "Title": "Suicide Squad",
    "Genre": "Action",
    "Revenue (Millions)": 325.02,
    "Rating": 6.2
  },
  {
    "Title": "The Great Wall",
    "Genre": "Action",
    "Revenue (Millions)": 45.13,
    "Rating": 6.1
  },
  {
    "Title": "La La Land",
    "Genre": "Comedy",
    "Revenue (Millions)": 151.06,
    "Rating": 8.3
  },
  {
    "Title": "Mindhorn",
    "Genre": "Comedy",
    "Revenue (Millions)": null,
    "Rating": 6.4
  },
  {
    "Title": "The Lost City of Z",
    "Genre": "Action",
    "Revenue (Millions)": 8.01,
    "Rating": 7.1
  },
  {
    "Title": "Passengers",
    "Genre": "Adventure",
    "Revenue (Millions)": 100.01,
    "Rating": 7
  },
  {
    "Title": "Fantastic Beasts and Where to Find Them",
    "Genre": "Adventure",
    "Revenue (Millions)": 234.02,
    "Rating": 7.5
  },
  {
    "Title": "Hidden Figures",
    "Genre": "Other",
    "Revenue (Millions)": 169.27,
    "Rating": 7.8
  },
  {
    "Title": "Rogue One",
    "Genre": "Action",
    "Revenue (Millions)": 532.17,
    "Rating": 7.9
  },
  {
    "Title": "Moana",
    "Genre": "Animation",
    "Revenue (Millions)": 248.75,
    "Rating": 7.7
  },
  {
    "Title": "Colossal",
    "Genre": "Action",
    "Revenue (Millions)": 2.87,
    "Rating": 6.4
  },
  {
    "Title": "The Secret Life of Pets",
    "Genre": "Animation",
    "Revenue (Millions)": 368.31,
    "Rating": 6.6
  },
  {
    "Title": "Hacksaw Ridge",
    "Genre": "Other",
    "Revenue (Millions)": 67.12,
    "Rating": 8.2
  },
  {
    "Title": "Jason Bourne",
    "Genre": "Action",
    "Revenue (Millions)": 162.16,
    "Rating": 6.7
  },
  {
    "Title": "Lion",
    "Genre": "Other",
    "Revenue (Millions)": 51.69,
    "Rating": 8.1
  },
  {
    "Title": "Gold",
    "Genre": "Adventure",
    "Revenue (Millions)": 7.22,
    "Rating": 6.7
  },
  {
    "Title": "Hounds of Love",
    "Genre": "Crime",
    "Revenue (Millions)": null,
    "Rating": 6.7
  },
  {
    "Title": "Trolls",
    "Genre": "Animation",
    "Revenue (Millions)": 153.69,
    "Rating": 6.5
  },
  {
    "Title": "Independence Day: Resurgence",
    "Genre": "Action",
    "Revenue (Millions)": 103.14,
    "Rating": 5.3
  },
  {
    "Title": "Paris pieds nus",
    "Genre": "Comedy",
    "Revenue (Millions)": null,
    "Rating": 6.8
  },
  {
    "Title": "Bahubali: The Beginning",
    "Genre": "Action",
    "Revenue (Millions)": 6.5,
    "Rating": 8.3
  },
  {
    "Title": "Dead Awake",
    "Genre": "Horror",
    "Revenue (Millions)": 0.01,
    "Rating": 4.7
  },
  {
    "Title": "Bad Moms",
    "Genre": "Comedy",
    "Revenue (Millions)": 113.08,
    "Rating": 6.2
  },
  {
    "Title": "Assassin's Creed",
    "Genre": "Action",
    "Revenue (Millions)": 54.65,
    "Rating": 5.9
  }
      ]
    const scatterPlot = new Scatter(this.$refs.Bottom2_container, {
      appendPadding: 10,
      data,
      xField: 'Revenue (Millions)',
      yField: 'Rating',
     
      
      shape: 'circle',
      colorField: 'Genre',
      size: 4,
      yAxis: {
        nice: true,
        line: {
          style: {
              fill: 'white',
              opacity: 0.6,
              fontSize: 16,
          },
        },
        label: {
            style: {
              fill: "white",
              fontFamily: "TencentSans",
              fontSize: 12,
            },
           },
      },
      xAxis: {
        min: -100,
        grid: {
          line: {
            style: {
              fill: "white",
              opacity: 0.6,
              fontSize: 16,
            },
          },
          
        },
        label: {
            style: {
              fill: "white",
              fontFamily: "TencentSans",
              fontSize: 12,
            },
            
          },
        line: {
          style: {
            stroke: '#aaa',
          },
        },
      },
    });
    scatterPlot.render();
   }
  }
}
</script>

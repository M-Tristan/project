export let pie = {
  // legend: {
  //     top: '5%',
  //     left: 'center'
  // },
  animation: false,
  series: [
      {   
          name: '标题',
          type: 'pie',
          radius: ['40%', '70%'],
          itemStyle: {
              borderRadius: 20,
              borderColor: '#fff',
              borderWidth: 2
          },
          label: {
              show: false,
              position: 'center'
          },
          labelLine: {
              show: false
          },
          data: [
              {value: 100, name: '模块一'},
              {value: 100, name: '模块二'},
              {value: 200, name: '模块三'},
              {value: 200, name: '模块四'},
              {value: 300, name: '模块五'}
          ]
      }
  ]
}

export let bar = {
  animation: false,
  xAxis: {
      type: 'category',
      data: ['1', '2', '3', '4', '5', '6', '7']
  },
  yAxis: {
      type: 'value'
  },
  series: [{
      data: [5, 5, 6, 6, 7, 7, 8],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
      }
  }]
};

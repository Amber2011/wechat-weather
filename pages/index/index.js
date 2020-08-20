const weaMap={
  // '晴天': 'sunny',
  // '多云': 'cloudy',
  // '阴': 'overcast',
  // '小雨': 'lightrain',
  // '大雨': 'heavyrain',
  // '雪': 'snow',
    '中雨':'大雨',
}
const weatherColorMap = {
  '晴天': '#cbeefd',
  '多云': '#deeef6',
  '阴': '#c6ced2',
  '中雨':'c5ccd0',
  '小雨': '#bdd5e1',
  '大雨': '#c5ccd0',
  '雪': '#aae1fc'
 }

Page({
  data:{
    weatherData:"",
    city:'',
    wea:'',
    temperature:'',
    weatherPng:'./imgs/晴天-bg.png',
    pngname:'',
  },
  onPullDownRefresh(){
      this.getNow(()=>{
        wx.stopPullDownRefresh();
      });
  },
  getNow(callback){//设置一个回调函数,在下拉刷新时传入参数,而onLoad时不传入
    var that=this;
    wx.request({
      url: 'https://yiketianqi.com/api?&appid=31781413&appsecret=GO4GUeNE&',
      data:{
        city:'郑州',
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data);
        that.setData({
          weatherData:res.data,
          city:res.data.city,
          wea:res.data.data[0].wea,
          temperature:res.data.data[0].tem,
          weatherPng:'./imgs/'+weaMap[res.data.data[0].wea]+'-bg.png',
        });
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherColorMap[res.data.data[0].wea],
   });
      },
      complete:()=>{
        callback && callback()
      }
    })
  },
  onLoad(){
    this.getNow();
  }
})


// var bmap=require("./js/bmap-wx.min");
// Page({ 
//   data: { 
//       weatherData: '' 
//   }, 
//   onLoad: function() { 
//       var that = this; 
//       // 新建百度地图对象 
//       var BMap = new bmap.BMapWX({ 
//           ak: 'r5SxXd5yrqP8u792EsaERfuDaLyofgq7' 
//       }); 
//       var fail = function(data) { 
//           console.log(data) 
//       }; 
//       var success = function(data) { 
//           var weatherData = data.currentWeather[0]; 
//           console.log(weatherData);
//           weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' +'日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' +'天气：' + weatherData.weatherDesc + '\n' +'风力：' + weatherData.wind + '\n'; 
//           that.setData({ 
//               weatherData: weatherData 
//           });       
//       } 
//       // 发起weather请求 
//       BMap.weather({ 
//           fail: fail, 
//           success: success 
//       }); 
//   } 
// })

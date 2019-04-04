//index.js
import wxp from '../index/wxp.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    idb: "back",
    idc: "clear",
    idt: "toggle",
    idadd: "+",
    id9: "9",
    id8: "8",
    id7: "7",
    idj: "-",
    id6: "6",
    id5: "5",
    id4: "4",
    idx: "*",
    id3: "3",
    id2: "2",
    id1: "1",
    iddiv: "/",
    id0: "0",
    idd: ".",
    ide: "＝",
    screenData: "0",
    operaSymbo: { "+": "+", "-": "-", "*": "*", "/": "/", ".": "." },
    lastIsOperaSymbo: false,
    iconType: 'waiting_circle',
    iconColor: 'white',
    arr: [],
    logs: []
  },
  message: '',
  code:0,
  onLoad: function (options) {

    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  getdata: function (exp) {//定义函数名称
    var that = this;
    wxp.request({
      url: 'https://wx.miracle.beer/query',
      method: "POST",
      data: {
        exp: exp,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
    }).then((res) => {
      console.log(res);
      this.setData({ "screenData": res.data+"\n" });
      that.setData({
        message: res.data
      })
    },(res) => {
    });
  },
  clickBtn: function (event) {
    var id = event.target.id;
    if (id == this.data.idb) {  //退格←
      var data = this.data.screenData;
      if (data == "0") {
        return;
      }
      data = data.substring(0, data.length - 1);
      if (data == "" || data == "－") {
        data = 0;
      }
      //this.setData({ "screenData": data });
      this.data.arr.pop();
    } else if (id == this.data.idc) {  //清屏C
      this.setData({ "screenData": "0" });
      this.data.arr.length = 0;
    } else if (id == this.data.idt) {  //正负号+/-
      var data = this.data.screenData;
      if (data == "0") {
        return;
      }
      var firstWord = data.charAt(0);
      if (data == "-") {
        data = data.substr(1);
        this.data.arr.shift();
      } else {
        data = "－" + data;
        this.data.arr.unshift("－");
      }
      this.setData({ "screenData": data });
    } else if (id == this.data.ide) {  //等于＝
      var data = this.data.screenData;
      if (data == "0") {
        return;
      }
      console.log(data);
      var ress = this.getdata(data);

    } else {
      if (this.data.operaSymbo[id]) { //如果是符号+-*/
        if (this.data.lastIsOperaSymbo || this.data.screenData == "0") {
          return;
        }
      }
      var sd = this.data.screenData;
      var data;
      if (sd == 0) {
        data = id;
      } else {
        data = sd + id;
      }
      this.setData({ "screenData": data });
      this.data.arr.push(id);
      if (this.data.operaSymbo[id]) {
        this.setData({ "lastIsOperaSymbo": true });
      } else {
        this.setData({ "lastIsOperaSymbo": false });
      }
    }
  },
  history: function () {
    wx.navigateTo({
      url: '../history/history'
    })
  }
})

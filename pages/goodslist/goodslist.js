// pages/goodslist/goodslist.js
const app = getApp()
// console.log(app);
let {
  requestApi
} = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */

  data: {
    page: 1,
    bestListDatas: [],
    winH: 0,
    listArr: ["综合", "新品", "销量", "价格", "筛选"],
    activeIndex: 0,
    flagChange: false,
    goods_id: 0,
    flag: true,

  },
  async changeList(e) {
    this.setData({
      activeIndex: e.currentTarget.dataset.index
    })
    if (this.data.activeIndex == 0) {
      if (this.data.activeIndex == 0 && this.data.flagChange == false) {
        this.getMornDatas()
        this.setData({
          flagChange: true
        })
      } else if (this.data.activeIndex == 0 && this.data.flagChange == true) {
        this.getFMoRenDatas()
        this.setData({
          flagChange: false
        })
      }
      if (this.data.page.length == 0) {
        this.setData({
          page: this.data.page
        })
      }
    } else if (this.data.activeIndex == 1) {
      this.getxinpinDatas()
    } else if (this.data.activeIndex == 2) {
      this.getxiaoliangDatas()
    } else if (this.data.activeIndex == 3) {
      if (this.data.activeIndex == 3 && this.data.flagChange == false) {
        this.getjiagemoDatas()
        this.setData({
          flagChange: true
        })
      } else if (this.data.activeIndex == 3 && this.data.flagChange == true) {
        this.getjiageDatas()
        this.setData({
          flagChange: false
        })
      }
    }

  },
  // 默认数据
  async getMornDatas() {



    let result = await requestApi(app.globalData.base_url + "/catalog/goodslist", {
      cat_id: this.data.goods_id,
      warehouse_id: 0,
      area_id: 0,
      min: "",
      max: "",
      goods_num: 0,
      size: 10,
      page: this.data.page,
      sort: "goods_id",
      order: "desc",
      self: 0,
      flag: false
    }, "post")
    // console.log(result);

    let resultDatas = this.data.bestListDatas.concat(result.data.data);
    // 数组为空的时候
    if (result.data.data.length == 0) {
      this.setData({
        bestListDatas: this.data.bestListDatas,
        flag: false
      })
    } else {
      this.setData({
        bestListDatas: resultDatas
      })
    }



  },
  //取反默认
  async getFMoRenDatas() {
    let result = await requestApi(app.globalData.base_url + "/catalog/goodslist", {
      cat_id: this.data.goods_id,
      warehouse_id: 0,
      area_id: 0,
      min: "",
      max: "",
      goods_num: 0,
      size: 10,
      page: this.data.page,
      sort: "goods_id",
      order: "asc",
      self: 0,
      flag: false
    }, "post")
    console.log(result);
    this.setData({
      bestListDatas: result.data.data
    })
    let resultDatas = this.data.bestListDatas.concat(result.data.data);
    // 数组为空的时候
    if (result.data.data.length == 0) {
      this.setData({
        bestListDatas: this.data.bestListDatas,
        flag: false
      })
    } else {
      this.setData({
        bestListDatas: resultDatas
      })
    }
  },
  //新品
  async getxinpinDatas() {
    let result = await requestApi(app.globalData.base_url + "/catalog/goodslist", {
      cat_id: this.data.goods_id,
      warehouse_id: 0,
      area_id: 0,
      min: "",
      max: "",
      goods_num: 0,
      size: 10,
      page: this.data.page,
      sort: "last_update",
      order: "desc",
      self: 0,
      flag: false
    }, "post")
    console.log(result);
    this.setData({
      bestListDatas: result.data.data
    })
    let resultDatas = this.data.bestListDatas.concat(result.data.data);
    // 数组为空的时候
    if (result.data.data.length == 0) {
      this.setData({
        bestListDatas: this.data.bestListDatas,
        flag: false
      })
    } else {
      this.setData({
        bestListDatas: resultDatas
      })
    }
  },
  //销量
  async getxiaoliangDatas() {
    let result = await requestApi(app.globalData.base_url + "/catalog/goodslist", {
      cat_id: this.data.goods_id,
      warehouse_id: 0,
      area_id: 0,
      min: "",
      max: "",
      goods_num: 0,
      size: 10,
      page: this.data.page,
      sort: "sales_volume",
      order: "desc",
      self: 0,
      flag: false
    }, "post")
    console.log(result);
    this.setData({
      bestListDatas: result.data.data
    })
    let resultDatas = this.data.bestListDatas.concat(result.data.data);
    // 数组为空的时候
    if (result.data.data.length == 0) {
      this.setData({
        bestListDatas: this.data.bestListDatas,
        flag: false
      })
    } else {
      this.setData({
        bestListDatas: resultDatas
      })
    }
  },
  //价格默认
  async getjiagemoDatas() {
    let result = await requestApi(app.globalData.base_url + "/catalog/goodslist", {
      cat_id: this.data.goods_id,
      warehouse_id: 0,
      area_id: 0,
      min: "",
      max: "",
      goods_num: 0,
      size: 10,
      page: this.data.page,
      sort: "shop_price",
      order: "desc",
      self: 0,
      flag: false
    }, "post")
    console.log(result);
    this.setData({
      bestListDatas: result.data.data
    })
    let resultDatas = this.data.bestListDatas.concat(result.data.data);
    // 数组为空的时候
    if (result.data.data.length == 0) {
      this.setData({
        bestListDatas: this.data.bestListDatas,
        flag: false
      })
    } else {
      this.setData({
        bestListDatas: resultDatas
      })
    }
  },
  async getjiageDatas() {
    let result = await requestApi(app.globalData.base_url + "/catalog/goodslist", {
      cat_id: this.data.goods_id,
      warehouse_id: 0,
      area_id: 0,
      min: "",
      max: "",
      goods_num: 0,
      size: 10,
      page: this.data.page,
      sort: "shop_price",
      order: "asc",
      self: 0,
      flag: false
    }, "post")

    console.log(result);

    this.setData({
      bestListDatas: result.data.data.concat(this.data.bestListDatas)
    })
    let resultDatas = this.data.bestListDatas.concat(result.data.data);
    // 数组为空的时候
    if (result.data.data.length == 0) {
      this.setData({
        bestListDatas: this.data.bestListDatas,
        flag: false
      })
    } else {
      this.setData({
        bestListDatas: resultDatas
      })
    }




  },
  loadMore() {

    if (this.data.flag) {
      this.setData({
        page: ++this.data.page
      })
    }
    this.getMornDatas();



    // this.getjiageDatas()
    // this.getFMoRenDatas()
    // this.getxinpinDatas()
    // this.getjiagemoDatas()
    // this.getxiaoliangDatas()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      winH: app.globalData.windowHeight + 45,
      goods_id: options.cat_id
    })
    this.getMornDatas(this.data.goods_id, "", "", this.data.page)

    // console.log(app.globalData.windowHeight);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
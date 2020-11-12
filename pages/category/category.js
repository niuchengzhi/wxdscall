// pages/category/category.js
let app = getApp();
let {
    requestApi
} = require("../../utils/request.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeIndex: 0,
        getCategoryNavList: [],
        getCategoryContent: [],
        goId: "",
        heightArr: []
    },
    async getCategoryNavList() {

        let result = await requestApi(app.globalData.base_url + "/catalog/list")
        console.log(result.data.data);

        this.setData({
            getCategoryNavList: result.data.data
        })
        let left = this.data.getCategoryNavList
        // console.log(left);
        for (var i = 0; i < left.length; i++) {
            let lcid = left[i].cat_id
            // console.log(lcid);
        }
        // wx.hideLoading()
    },

    async getCategoryContent() {
        wx.showLoading({
            title: '加载中',
        })
        let result858 = await requestApi(app.globalData.base_url + "/catalog/list/858")
        console.log(result858.data.data);

        let result6 = await requestApi(app.globalData.base_url + "/catalog/list/6")
        let result8 = await requestApi(app.globalData.base_url + "/catalog/list/8")
        let result3 = await requestApi(app.globalData.base_url + "/catalog/list/3")
        let result4 = await requestApi(app.globalData.base_url + "/catalog/list/4")
        let result5 = await requestApi(app.globalData.base_url + "/catalog/list/5")
        let result860 = await requestApi(app.globalData.base_url + "/catalog/list/860")
        console.log(result6.data.data);
        let arrResult = []
        arrResult.push(result858.data.data)
        arrResult.push(result6.data.data)
        arrResult.push(result8.data.data)
        arrResult.push(result3.data.data)
        arrResult.push(result4.data.data)
        arrResult.push(result5.data.data)
        arrResult.push(result860.data.data)
        wx.hideLoading()
        console.log(arrResult);
        this.setData({
            getCategoryContent: arrResult
        })
        if (arrResult.length == this.data.getCategoryNavList.length) {
            this.isScroll()
        }

    },
    changeNav(e) {
        let id = e.currentTarget.dataset.id
        let index = e.currentTarget.dataset.index
        this.setData({
            activeIndex: index,
            goId: id
        })
        wx.createSelectorQuery()
    },
    isScroll() {
        let navLen = this.data.getCategoryNavList.length
        let heightArr = []

        wx.getSystemInfo({
            success: (result) => {
                this.setData({
                    height: result.windowHeight * (750 / result.windowWidth) - 88 - app.globalData.navbarHeight
                })
            },
        })
        for (var i = 0; i < navLen; i++) {
            // console.log(this);
            let query = wx.createSelectorQuery().in(this)
            let aId = "#a" + i
            query.select(aId).boundingClientRect();
            query.exec((res) => {
                console.log(res[0].top);
                let top = res[0].top
                heightArr.push(top)
                this.setData({
                    heightArr: heightArr
                })
            })

        }
    },
    scrollPage(e) {
        let scrollTop = e.detail.scrollTop   //滚动条滚动的距离
        // console.log(scrollTop);

        let scrollArr = this.data.heightArr  //数组中的值为每一块内容距离顶部的距离

        //scrollArr数组中的每一个值和scrollTop进行比较
        for (var i = 0; i < scrollArr.length; i++) {
            if (scrollTop >= 0 && scrollTop < scrollArr[1] - scrollArr[0]) {
                this.setData({
                    activeIndex: 0
                })
            } else if (scrollTop >= scrollArr[i] - scrollArr[0] && scrollTop < scrollArr[i + 1] - scrollArr[0]) {
                this.setData({
                    activeIndex: i
                })
            } else if (scrollTop >= scrollArr[scrollArr.length - 1] - scrollArr[0]) {
                this.setData({
                    activeIndex: scrollArr.length - 1
                })
            }

        }




    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCategoryNavList()
        this.getCategoryContent()
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
// pages/goodsdetail/goodsdetail.js
let app = getApp()
let {
    requestApi
} = require("../../utils/request.js")
let wxParse = require("../../wxParse/wxParse.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        flag: false,
        goodsDetailData: {},
        navH: 0,
        gid: 0,
        galleryList: [],
        opacity: 0,
        showMask: false,
        titleArr: ["商品", "详情", "推荐", "评论"],
        activeIndex: 0,
        goodsDetailTJData: [],
        goodsPJData: [],
        goId: "detail0",
        buyNum: 1,
        yixuan: 0,
        xuanzhong: 0
    },
    toCart() {
        wx.switchTab({
            url: '/pages/cart/cart',
        })
    },
    scrollFn(e) {
        // console.log(e);
        var scrollY = e.detail.scrollTop
        var opacity = scrollY / 300
        opacity = opacity > 1 ? 1 : opacity
        this.setData({
            opacity: opacity
        })
        // console.log(this.data.topArr);
        // console.log(this.data.heightArr);
        for (var i = 0; i < this.data.topArr.length; i++) {
            if (scrollY < this.data.topArr[i] - app.globalData.navbarHeight / 2 + this.data.heightArr[i]) {
                this.setData({
                    activeIndex: i
                })
                break;
            }
        }
    },
    infoScrollFn() {
        var topArr = []
        var heightArr = []
        for (var i = 0; i < 4; i++) {
            var idDetail = "#detail" + i
            const query = wx.createSelectorQuery()
            query.select(idDetail).boundingClientRect()
            query.exec((res) => {
                var top = res[0].top       // #the-id节点的上边界坐标
                var height = res[0].height
                topArr.push(top)
                heightArr.push(height)
                // console.log(topArr);
                // console.log(heightArr);
                this.setData({
                    topArr: topArr,
                    heightArr: heightArr
                })
            })
        }
    },
    changeTab(e) {
        // console.log(e);
        this.setData({
            activeIndex: e.currentTarget.dataset.index,
            goId: e.currentTarget.dataset.id
        })
    },
    closeMaskFn() {
        this.setData({
            showMask: false

        })
    },
    showMaskFn() {
        //定义一个动画实例对象
        let animationObj = wx.createAnimation({
            delay: 0,  //延迟动画
            duration: 400, //持续时间
            timingFunction: "linear"  //过度效果
        })


        animationObj.translateY(280).step()

        setTimeout(() => {
            animationObj.translateY(0).step()
            this.setData({
                animationData: animationObj.export(),  //到处动画
                showMask: true
            })
        }, 200)

        this.setData({
            animationData: animationObj.export(),  //到处动画
            showMask: true
        })
    },
    async getGoodsDetail(goods_id) {
        wx.showLoading({
            title: '加载中',
        })
        let goodsDetail = await requestApi(app.globalData.base_url + "/goods/show", {
            goods_id: goods_id,
            warehouse_id: 0,
            area_id: 0,
            is_delete: 0,
            is_on_sale: 1,
            is_alone_sale: 1
        }, "post")
        console.log(goodsDetail);
        console.log(goodsDetail.data.data.gallery_list);
        wx.hideLoading()
        this.setData({
            goodsDetailData: goodsDetail.data.data,
            galleryList: goodsDetail.data.data.gallery_list
        })
        wxParse.wxParse('content', 'html', goodsDetail.data.data.goods_desc, this, 5);
        // console.log(this.data.galleryList);
        this.infoScrollFn()

    },
    async getGoodsTJ(goods_id) {
        let goodsDetail = await requestApi(app.globalData.base_url + "/goods/goodsguess", {
            page: 1,
            size: 10
        }, "post")
        console.log(goodsDetail);
        this.setData({
            goodsDetailTJData: goodsDetail.data.data
        })
        this.infoScrollFn()
    },
    async getGoodsPJ(goods_id) {
        let goodsPJ = await requestApi(app.globalData.base_url + "/comment/goods", {
            goods_id: goods_id,
            rank: "all",
            page: 1,
            size: 10
        }, "post")
        console.log(goodsPJ.data.data);
        this.setData({
            goodsPJData: goodsPJ.data.data
        })
        this.infoScrollFn()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        this.getGoodsDetail(options.goods_id)
        this.getGoodsPJ(options.goods_id)
        this.getGoodsTJ()
        this.setData({
            gid: options.goods_id,
            navH: app.globalData.navbarHeight,
            height: app.globalData.windowHeight
        })
        this.yixuan()
        this.xuanzhong()
    },
    changeNum(e) {
        console.log(e.currentTarget.dataset.num);
        if (e.currentTarget.dataset.num == 0) {
            if (this.data.buyNum <= 1) {
                this.setData({
                    buyNum: 1
                })
            } else {
                this.setData({
                    buyNum: this.data.buyNum - 1
                })
            }
        } else {
            this.setData({
                buyNum: this.data.buyNum + 1
            })
        }
    },
    addCartOk() {
        var goods = this.data.goodsDetailData
        goods.isSelect = true
        goods.buyNum = this.data.buyNum
        var gid = this.data.gid
        console.log(gid);
        var cartDatas = wx.getStorageSync('carts') || []
        console.log(cartDatas);
        if (cartDatas.length > 0) {
            for (var key in cartDatas) {
                if (cartDatas[key].goods_id == gid) {
                    cartDatas[key].buyNum = cartDatas[key].buyNum + this.data.buyNum
                    try {
                        wx.setStorageSync('carts', cartDatas)
                        wx.showToast({
                            title: '添加成功',
                            icon: 'success',
                            duration: 2000
                        })
                        this.yixuan()
                        this.xuanzhong()
                        this.closeMaskFn()
                    } catch (err) {
                        console.log(err);
                        wx.showToast({
                            title: '添加失败',
                            icon: 'error',
                            duration: 2000
                        })
                    }
                    return;
                }

            }
            cartDatas.unshift(goods)
        } else {
            cartDatas.unshift(goods)
            this.closeMaskFn()
            this.yixuan()
            this.xuanzhong()
        }
        wx.setStorageSync('carts', cartDatas)
        // for (var i = 0; i < cartDatas.length; i++) {
        //     let arr = cartDatas[i].buyNum;
        //     console.log(arr);
        // }
    },
    yixuan() {
        let buy = 0
        let cartDatas = wx.getStorageSync('carts')
        for (var i = 0; i < cartDatas.length; i++) {
            buy = cartDatas[i].buyNum + buy
        }
        this.setData({
            yixuan: buy
        })
    },
    xuanzhong() {
        let buy = 0
        let cartDatas = wx.getStorageSync('carts')

        for (var i = 0; i < cartDatas.length; i++) {
            if (cartDatas[i].goods_id == this.data.gid) {
                buy = cartDatas[i].buyNum + buy
            }
            // buy = cartDatas[i].goods_id + buy
        }
        this.setData({
            xuanzhong: buy
        })
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
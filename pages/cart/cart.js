// pages/cart/cart.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cartListDatas: [],
        isSelectAll: false,
        totalPrice: 0,
        totalNum: 0,
        cart: true
    },
    totalNum() {
        var cartListDatas = this.data.cartListDatas
        var total1 = 0
        for (var i = 0; i < cartListDatas.length; i++) {
            if (cartListDatas[i].isSelect) {
                total1 += cartListDatas[i].buyNum
            }
        }
        this.setData({
            totalNum: total1
        })
    },
    checkRadio(e) {
        console.log(e.currentTarget.dataset.index);
        var index = e.currentTarget.dataset.index
        var cartListDatas = this.data.cartListDatas
        var isSelect = cartListDatas[index].isSelect
        cartListDatas[index].isSelect = !isSelect
        this.setData({
            cartListDatas: cartListDatas
        })
        var arr = []
        for (var i = 0; i < cartListDatas.length; i++) {
            if (cartListDatas[i].isSelect) {
                arr.push(cartListDatas[i])
            }
        }
        if (arr.length == cartListDatas.length) {
            this.setData({
                isSelectAll: true
            })
        } else {
            this.setData({
                isSelectAll: false
            })
        }
        this.totalPrice()
        this.totalNum()
    },
    selectAllFn() {
        var cartListDatas = this.data.cartListDatas
        var isSelectAll = this.data.isSelectAll
        isSelectAll = !isSelectAll
        for (var i = 0; i < cartListDatas.length; i++) {
            cartListDatas[i].isSelect = isSelectAll
        }
        this.setData({
            cartListDatas: cartListDatas,
            isSelectAll: isSelectAll
        })
        this.totalPrice()
        this.totalNum()
    },
    addCartNum(e) {
        var index = e.currentTarget.dataset.index
        console.log(index);
        var cartListDatas = this.data.cartListDatas
        var buyNum = cartListDatas[index].buyNum
        cartListDatas[index].buyNum = buyNum + 1
        console.log(cartListDatas);

        this.setData({
            cartListDatas: cartListDatas
        })
        this.totalPrice()
        this.totalNum()
    },
    jianCartNum(e) {
        var index = e.currentTarget.dataset.index
        console.log(index);
        var cartListDatas = this.data.cartListDatas
        var buyNum = cartListDatas[index].buyNum
        if (buyNum > 1) {
            cartListDatas[index].buyNum = buyNum - 1
        }
        console.log(cartListDatas);

        this.setData({
            cartListDatas: cartListDatas
        })
        this.totalPrice()
        this.totalNum()
    },
    totalPrice() {
        var cartListDatas = this.data.cartListDatas
        try {
            wx.setStorageSync('carts', cartListDatas)
        } catch (err) {
            console.log(err);
        }
        var total = 0
        for (var i = 0; i < cartListDatas.length; i++) {
            if (cartListDatas[i].isSelect) {
                total += cartListDatas[i].shop_price * cartListDatas[i].buyNum
            }
        }
        this.setData({
            totalPrice: total
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var cartList = wx.getStorageSync("carts") || []
        var flag = cartList.every(item => {
            return item.isSelect == true
        })
        if (flag) {
            this.setData({
                isSelectAll: true
            })
        }
        this.setData({
            cartListDatas: cartList
        })
        if (this.data.cartListDatas.length == 0) {
            this.setData({
                cart: false,
                cartListDatas: cartListDatas
            })
        }
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
        this.setData({
            cartListDatas: wx.getStorageSync("carts")
        }, () => {
            this.totalPrice()
            this.totalNum()
        })
        if (this.data.cartListDatas.length == 0) {
            this.setData({
                cart: false,
                cartListDatas: cartListDatas
            })
        }

    },
    shouye() {
        wx.switchTab({
            url: '../home/home'
        })
    },
    deleCart(e) {
        var index = e.currentTarget.dataset.index
        var cartListDatas = this.data.cartListDatas
        wx.showModal({
            title: '提示',
            content: '亲,您确定要放弃该宝贝吗？',
            success: (res) => {
                if (res.confirm) {
                    cartListDatas.splice(index, 1)
                    this.totalPrice()
                    this.setData({
                        cartListDatas: cartListDatas
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
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
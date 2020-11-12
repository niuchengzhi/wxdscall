// pages/home/home.js
let app = getApp()
let {
    requestApi
} = require("../../utils/request.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        flg: false,
        xhxtabIndex: 0,
        flag: 0,
        swipeNav: [],
        swiperListDatas: [],
        currentIndex: 0,
        ocolor: "rgb(243,70,70)",
        xwNavDatas: [],
        newlistDatas: [{
            id: 1,
            title: "首页"
        }, {
            id: 2,
            title: "家用电器"
        }, {
            id: 3,
            title: "男装女装"
        }, {
            id: 4,
            title: "鞋靴箱包"
        }, {
            id: 5,
            title: "手机数码"
        }, {
            id: 6,
            title: "电脑办公"
        }, {
            id: 7,
            title: "家居家纺"
        }, {
            id: 8,
            title: "个人化妆"
        },],
        color: ["rgb(243,70,70)", "rgb(228,49,36)", "rgb(60,129,255)", "rgb(2,131,121)", "rgb(64,125,255)"],
        flagIndex: true,
        countDownList: [],
        now: 0,
        lists: [],
        tabTime: [],
        pintDatas: [],
        page: 1,
        is_best: ["is_best", "is_new", "is_hot"],
        bestListDatas: [],
        xhtabDatas: [{
            id: 1,
            jing: "精选",
            wei: "为你推荐",
            type: "is_best"
        }, {
            id: 2,
            jing: "社区",
            wei: "新奇好物",
            type: "is_best"
        }, {
            id: 3,
            jing: "新品",
            wei: "潮流上新",
            type: "is_new"
        }, {
            id: 4,
            jing: "热卖",
            wei: "火热爆款",
            type: "is_hot"
        }],
        isFlag: false
    },
    async xhxtab(e) {


        this.setData({
            xhxtabIndex: e.currentTarget.dataset.index,
            page: 1
        })

        let result = e.currentTarget.dataset.type;


        // console.log(e.currentTarget.dataset.index);
        if (this.data.xhxtabIndex == 1) {
            this.getHomeBestList1()

        } else {
            this.getHomeBestList(result)
        }


    },
    changeTab(e) {
        // console.log(e.detail.current);
        if (e.detail.current >= 2 && e.detail.current < 6) {
            this.setData({
                oLeft: (e.detail.current - 2) * 120
            })
        }
        this.setData({
            currentIndex: e.detail.current
        })
        if (e.detail.current != 0) {
            this.setData({
                flagIndex: false
            })
        } else {
            this.setData({
                flagIndex: true
            })
        }
    },
    changeSwiper(e) {
        this.setData({
            currentIndex: e.currentTarget.dataset.current
        })
    },
    changeSwipers(e) {
        this.setData({
            ocolor: this.data.color[e.detail.current],
        })

    },
    changeNav(e) {
        let active1 = e.detail.current
        this.setData({
            flag: active1
        })
    },
    getDate() {

        setInterval(() => {

            var obj = {};

            var countDownArr = [];

            var date = new Date();

            var nowTime = date.getTime();

            var endDate = new Date("2020-11-11 00:00:00");

            var endTime = endDate.getTime();

            var oTime = endTime - nowTime;

            if (oTime > 0) {

                this.dd = Math.floor(oTime / 1000 / 60 / 60 / 24);

                this.dd = this.dd < 10 ? "0" + this.dd : this.dd;

                this.hh = Math.floor((oTime / 1000 / 60 / 60) % 24); //时

                this.hh = this.hh < 10 ? "0" + this.hh : this.hh;

                this.mm = Math.floor((oTime / 1000 / 60) % 60); //分

                this.mm = this.mm < 10 ? "0" + this.mm : this.mm;

                this.ss = Math.floor((oTime / 1000) % 60);

                this.ss = this.ss < 10 ? "0" + this.ss : this.ss;

            }

            obj = {

                day: this.dd,

                hou: this.hh,

                min: this.mm,

                sec: this.ss

            }

            countDownArr.push(obj);

            this.setData({

                countDownList: countDownArr

            })

        }, 1000)
    },
    tabChange(e) {
        console.log(e.currentTarget.dataset.item);
        let tomorrow;
        if (e.currentTarget.dataset.item == 15 || e.currentTarget.dataset.item == 16) {
            tomorrow = 1
        } else {
            tomorrow = 0
        }

        wx.request({
            url: 'https://x.dscmall.cn/api/visual/visual_seckill?id=' + e.currentTarget.dataset.item + '&tomorrow=' + tomorrow,
            success: (res) => {
                console.log(res.data.data.seckill_list);
                console.log(res.data.data.time_list);
                this.setData({
                    lists: res.data.data.seckill_list,
                    tabTime: res.data.data.time_list
                })
            }
        })
        this.setData({
            now: e.currentTarget.dataset.current
        })
    },
    getpinyuan() {
        requestApi("https://x.dscmall.cn/api/visual/visual_team_goods").then(res => {
            console.log(res.data.data);
            this.setData({
                pintDatas: res.data.data
            })
        })
    },
    getHomeBestList(type) {

        if (this.data.page == 1) {
            this.setData({
                bestListDatas: [],
                // isFlag: true
            })
        }
        wx.showLoading({
            title: '加载中',
        })
        console.log(type);
        requestApi(app.globalData.base_url + "/goods/type_list", {
            page: this.data.page,
            size: 10,
            type: type
        }).then(res => {
            console.log(res);
            this.setData({
                bestListDatas: this.data.bestListDatas.concat(res.data.data),
                // isFlag: true
            })
            console.log(this.data.bestListDatas);

        })
        wx.hideLoading()
    },

    getHomeBestList1() {
        if (this.data.page == 1) {
            this.setData({
                bestListDatas: []
            })
        }
        wx.showLoading({
            title: '加载中',
        })
        requestApi(app.globalData.base_url + "/discover/find_list", {
            page: this.data.page,
            size: 10,
        }).then(res => {
            this.setData({
                bestListDatas: this.data.bestListDatas.concat(res.data.data)
            })
            console.log(this.data.bestListDatas);

        })
        wx.hideLoading()
    },

    loadMore() {
        // if (this.data.isFlag) {
        //     this.getHomeBestList(this.data.xhtabDatas[this.data.xhxtabIndex].type)
        // } else {
        //     this.getHomeBestList()
        // }

        this.setData({
            page: ++this.data.page
        })
        if (this.data.xhxtabIndex == 1) {
            this.getHomeBestList1()
        }
        else {
            this.getHomeBestList(this.data.xhtabDatas[this.data.xhxtabIndex].type)
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中',

        })
        wx.getSystemInfo({
            success: (result) => {
                console.log(result.windowHeight)
                this.setData({
                    widH: result.windowHeight
                })
            },
        }),
            wx.request({
                url: 'https://x.dscmall.cn/api/visual/view',
                method: 'POST',
                header: 'content-type:application/x-www-form-urlencode',
                data: {
                    id: 3,
                    type: "index",
                    device: "h5"
                },
                success: (res) => {
                    let data = JSON.parse(res.data.data.data)
                    console.log(data);
                    let swiper = data[2].data.list
                    let descDatas = data[3].data.list
                    console.log(descDatas);
                    let arr = []
                    // for(var i=0;i<descDatas.length/10;i++){
                    //     arr.push(descDatas.slice(i,i+10))
                    //   }
                    let num = 10;
                    for (var i = 0; i < descDatas.length; i += num) {
                        arr.push(descDatas.slice(i, i + num))
                    }
                    console.log(arr);
                    this.setData({
                        swiperListDatas: swiper,
                        swipeNav: arr
                    })
                }
            })
        wx.request({
            url: 'https://x.dscmall.cn/api/visual/article',
            method: 'POST',
            header: 'content-type:application/x-www-form-urlencode',
            data: {
                cat_id: 20,
                num: 10
            },
            success: (res) => {
                console.log(res.data.data);
                let xwNav = res.data.data;
                this.setData({
                    xwNavDatas: xwNav
                })
            }
        })
        this.getDate();
        // this.getTabchange()
        wx.request({
            url: 'https://x.dscmall.cn/api/visual/visual_seckill?id=27+&tomorrow=0',
            success: (res) => {
                console.log(res.data.data.seckill_list);
                console.log(res.data.data.time_list);
                this.setData({
                    lists: res.data.data.seckill_list,
                    tabTime: res.data.data.time_list
                })
            }
        })
        this.getpinyuan()
        this.getHomeBestList(this.data.is_best[0])
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
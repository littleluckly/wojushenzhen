<template>
    <div class="rentSearchList">
        <div class="topBg">
            <img
                src="http://a4.qpic.cn/psb?/V10roI243u0y8c/9io9I1EObRQJpAWahel8RNPSUEfwPBBxvFOzC*3Xf0Q!/m/dL8AAAAAAAAAnull&bo=OAStAjgErQIRCT4!&rf=photolist&t=5"
                height="180px"
                alt
            />
            <img
                class="wave"
                src="https://raw.githubusercontent.com/weilanwl/ColorUI/master/demo/images/wave.gif"
                alt
            />
            <div
                v-bind:style="{ textAlign:'center', color:'white',position:'absolute', fontSize:'14px',top: top + 'px', height:height+'px',width:'100%', lineHeight:height+'px' }"
            >
                <navigator open-type="navigateBack" style="float:left;padding:0 10px;">
                    <i-icon type="return" size="18" />
                </navigator>
                {{searchVal}}
            </div>
        </div>
        <div class="filterArea">
            <div class="types">
                <div class="filterType">
                    <p @click="showSubtype('location')">
                        {{selectedTypes.location||'区域'}}
                        <i-icon :type="currSubType=='location'?'packup':'unfold'"></i-icon>
                    </p>
                </div>
                <div class="filterType">
                    <p @click="showSubtype('price')">
                        {{selectedTypes.price||'价格'}}
                        <i-icon :type="currSubType=='price'?'packup':'unfold'"></i-icon>
                    </p>
                </div>
                <div class="filterType">
                    <p @click="showSubtype('layout')">
                        {{selectedTypes.layout||'户型'}}
                        <i-icon :type="currSubType=='layout'?'packup':'unfold'"></i-icon>
                    </p>
                </div>
                <div class="filterType">
                    <p @click="showSubtype('rentType')">
                        {{selectedTypes.rentType||'类型'}}
                        <i-icon :type="currSubType=='rentType'?'packup':'unfold'"></i-icon>
                    </p>
                </div>
                <div class="filterType">
                    <p @click="showSubtype('more')">
                        {{selectedTypes.more||'更多'}}
                        <i-icon :type="currSubType=='more'?'packup':'unfold'"></i-icon>
                    </p>
                </div>
            </div>
            <ul
                v-for="type in subTypes"
                :key="type.type"
                class="subContent"
                :class="{active:currSubType==type.type}"
            >
                <li
                    v-for="(item,idx) in type.items"
                    :key="idx"
                    @click="selectType({type:type.type,value:item.label})"
                >
                    <p
                        :class="{active:!selectedTypes[type.type]&&item.label=='不限'}"
                        v-if="idx==0"
                    >{{item.label}}</p>
                    <p :class="{active:selectedTypes[type.type]==item.label}" v-else>{{item.label}}</p>
                </li>
            </ul>
            <ul class="subContent">
                <li>更多</li>
            </ul>
        </div>
        <div class="resultArea">
            <template v-if="searchList.length">
                <div
                    v-for="(item,idx) in searchList"
                    :key="item.address+idx"
                    class="listItem"
                    @click="linkToDetail(item)"
                >
                    <div class="thumbImg">
                        <img :src="item.thumb_img" alt />
                    </div>
                    <div class="itemDesc">
                        <p class="mainDesc">
                            <span class="layout sperator">{{item.layout}}</span>
                            <span class="area sperator">
                                <span>{{item.area}}</span>
                                <span class="square"></span>
                            </span>
                            <span class="address">{{item.location}}</span>
                        </p>
                        <p class="houseName">{{item.house_name}}</p>
                        <p class="priceDesc">
                            <span class="price">{{item.price}}</span>
                            <span class="unit">元/月</span>
                            <span class="type">{{item.type}}</span>
                        </p>
                        <p class="address">{{item.address}}</p>
                    </div>
                </div>
            </template>
            <div class="no-result" v-else>
                <img src="/static/images/404.png" alt srcset />
                <div>很抱歉，没有找到相关结果</div>
                <div>请您换个关键词再试一试</div>
            </div>
        </div>
    </div>
</template>
<script>
import calcCapsulePosi from "@/mixins/calcCapsulePosi"
import CustomTopBar from "@/components/customTopBar"
import { mapActions, mapState } from "vuex"
export default {
    mixins: [calcCapsulePosi],
    components: {
        CustomTopBar
    },
    data() {
        return {
            searchVal: "",
            currSubType: "",
            selectedTypes: {},
            subTypes: [
                {
                    type: "location",
                    items: [
                        { label: "不限", value: "" },
                        { label: "龙岗", value: "" },
                        { label: "龙华", value: "" },
                        { label: "宝安", value: "" },
                        { label: "福田", value: "" },
                        { label: "南山", value: "" },
                        { label: "罗湖", value: "" },
                        { label: "盐田", value: "" },
                        { label: "坪山", value: "" },
                        { label: "光明新区", value: "" },
                        { label: "大鹏新区", value: "" }
                    ]
                },
                {
                    type: "price",
                    items: [
                        { label: "不限", value: "" },
                        { label: "<80万", value: "80" },
                        { label: "80~100万", value: "80-100" },
                        { label: "100~120万", value: "100-120" },
                        { label: "120~150万", value: "120-150" },
                        { label: ">150万", value: "150" }
                    ]
                },
                {
                    type: "layout",
                    items: [
                        { label: "不限", value: "" },
                        { label: "单间", value: "1" },
                        { label: "一房一厅", value: "2" },
                        { label: "两房", value: "3" },
                        { label: "三房", value: "4" },
                        { label: "四房", value: "5" },
                        { label: "四房以上", value: "6" }
                    ]
                },
                {
                    type: "rentType",
                    items: [
                        { label: "不限", value: "" },
                        { label: "村委房", value: "1" },
                        { label: "军产房", value: "2" },
                        { label: "集资房", value: "2" },
                        { label: "大红本房", value: "2" }
                    ]
                }
            ]
        }
    },
    onUnload() {
        this.currSubType = ""
        // store.commit("drawerVisible", false)
    },
    onLoad({ searchVal = "" }) {
        console.log("searchval", searchVal)
        this.selectedTypes = {}
        this.searchVal = searchVal
        wx.setNavigationBarTitle({
            title: searchVal
        })
        // this.searchSaleList({ searchVal })
    },
    //页面滚动执行方式
    onPageScroll(event) {
        console.log("scroll", event.scrollTop)
        this.scrollTop = event.scrollTop
        // if (this.scrollTop > 100) {
        //     this.currSubType = ""
        // }
    },
    computed: {
        ...mapState({
            searchList: state => state.saleStore.searchList
        })
    },
    methods: {
        ...mapActions("saleStore/", ["searchSaleList", "saveBrowseHistory"]),
        handleInputChange(e) {
            console.log(this.searchVal, e)
        },
        handleSearch() {},
        showSubtype(type) {
            console.log("type", type)
            if (this.currSubType == type) {
                this.currSubType = ""
                return
            }
            this.currSubType = type
        },
        selectType({ type, value }) {
            this.selectedTypes[type] = value == "不限" ? "" : value
            this.currSubType = ""
            const { layout, price, location, rentType } = this.selectedTypes
            this.searchSaleList({
                searchVal: this.searchVal,
                layout,
                price,
                location,
                type: rentType
            })
        },
        linkToDetail(data) {
            const that = this
            // 保存浏览记录
            wx.getStorage({
                key: "userInfo",
                success(res) {
                    that.saveBrowseHistory({
                        sale_id: data.id,
                        open_id: res.data.openid
                    })
                }
            })

            wx.navigateTo({
                url: `../../index/detail/main?id=${data.id}`
            })
        }
    }
}
</script>
<style lang="less">
@import "../../../style/common.less";
.rentSearchList {
    height: 100vh;
    background: @graylightBg;
    .topBg {
        position: relative;
        img {
            height: 180px;
            width: 100%;
        }
        .wave {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            z-index: 99;
            mix-blend-mode: screen;
            height: 50px;
        }
    }
    .topWrap {
        width: 100%;
        padding-bottom: 10px;
        background: @primaryBg;
        .back {
            // position: absolute;
            float: left;
            padding: 0 10px;
        }
        .title {
            color: #fff;
            text-align: left;
            // padding-left: 50px;
        }
    }
    .searchInputWrap {
        background: @primaryBg;
        padding: 0 10px 10px 10px;
        position: relative;
        .searchIcon {
            position: absolute;
            left: 20px;
            top: -5px;
            line-height: 76rpx;
            padding: 0 10rpx;
        }
        .searchInput {
            font-size: 12px;
            background: #fff;
            border-radius: 20px;
            border: 1px solid #ccc;
            height: 30px;
            line-height: 30px;
            padding-left: 30px;
        }
    }
    .filterArea {
        padding: 10px;
        background: #fff;
        color: @grayText;
        font-size: 14px;
        .types {
            // display: flex;
            // justify-content: space-around;
            .filterType {
                display: inline-block;
                width: calc(20%);
                // flex-grow: 1;
                // flex-shrink: 0;
                position: relative;
                text-align: center;
                // .sperator;
                &:last-child {
                    &::after {
                        display: none;
                    }
                }
                p {
                    .textOverflow;
                }
            }
        }
        .subContent {
            height: 0;
            overflow: hidden;
            &.active {
                height: auto;
            }
            li {
                &:first-child {
                    margin-top: 10px;
                }
                padding: 5px 0;
                border-bottom: 1px solid @graylightBg;
                p {
                    &.active {
                        color: @primary;
                    }
                }
            }
        }
    }
    .resultArea {
        margin-top: 10px;
        background: #fff;
        padding: 10px;
        font-size: 14px;
        .listItem {
            display: flex;
            justify-content: center;
            margin-bottom: 10px;
            // height: 165px;
            .thumbImg {
                width: 112px;
                margin-right: 20px;
                img {
                    width: 100%;
                    height: 80px;
                }
            }
            .itemDesc {
                flex: 1;
                color: #666;
                // 配合.address文字超长省略
                overflow: hidden;
                .mainDesc {
                    font-size: 16px;
                    color: #333;
                    margin-bottom: 2px;
                }
                .houseName {
                    margin-bottom: 1px;
                }
                .priceDesc {
                    .price {
                        font-size: 18px;
                        color: @primary;
                        line-height: 15px;
                    }
                    .unit {
                        margin-right: 10px;
                        color: @primary;
                    }
                }
                .address {
                    .textOverflow;
                }
            }
        }
    }
    .no-result {
        text-align: center;
        img {
            width: 200px;
            height: 150px;
        }
    }
}
</style>

<template>
  <div id="home">
    <!-- 顶部栏 -->
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>

    <tab-control :titles="['流行', '新款',' 精选']" 
                 @tabClick='tabClick'
                 ref="tabControl1" 
                 class="tab-control"
                 v-show="isTabFixed"/>

    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll" 
            :pull-up-load="true"
            @pullingUp="loadMore"
            >

      <!-- 轮播图 start -->
      <home-swiper :banners='banners' @swiperImageLoad="swiperImageLoad"></home-swiper>
      <!-- 轮播图 end -->

      <!-- 推荐模块 -->
      <recommend-view :recommends='recommends'></recommend-view>

      <!-- 本周推荐 -->
      <feature-view></feature-view>

      <tab-control :titles="['流行', '新款',' 精选']" 
                    @tabClick='tabClick'
                    ref="tabControl2" />

      <!-- 商品信息 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
  
    <!-- 回到顶部 -->
    <back-top @click="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import { debounce } from 'common/utils'

export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
      HomeSwiper,
      RecommendView,
      FeatureView,
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currendType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: 0,
        saveY: 0,
      }
    },
    created() {
      // 请求轮播图和推荐数据
      this.getHomeMultidata()

      // 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')


    },
    mounted() {
      // 监听item中图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh, 200)
      this.$bus.on('itemImageLoad', () => {
        refresh()
      })
    },

    computed: {
      showGoods() {
        return this.goods[this.currendType].list
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },

    methods: {
      /**
       * 事件监听的相关方法
       */


      // 点击 流行、新款、精选 切换事件
      tabClick(index) {
        switch(index) {
          case 0:
            this.currendType = 'pop'
            break;
          case 1:
            this.currendType = 'new';
            break;
          case 2:
            this.currendType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },

      // 点击返回顶部
      backClick() {
        // this.$refs.scroll.scroll.scrollTo(0, 0, 1000)
        this.$refs.scroll.scrollTo(0, 0, 1000)
      },
      
      contentScroll(position) {
        // 滑动距离大于1000时,显示返回顶部图标
        this.isShowBackTop = (-position.y > 1000)

        // 决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      // 上拉加载更多
      loadMore() {
        this.getHomeGoods(this.currendType)

        this.$refs.scroll.scroll.refresh()
      },
      // 获取tabControl的offsetTop
      // 所有的组件都有一个属性$el: 用于获取组件中的元素
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      /**
       * 网络请求相关的方法
       */
      // 请求轮播图和本周推荐
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },

      getHomeGoods(type) {
        let page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          // 完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    },
}

</script>

<style scoped>
  #home {
    /* margin-top: 44px; */
    position: relative;
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    top: 0;
    left: 0;
    right: 0; */
    z-index: 9;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }

  /* .contents {
    height: calc(100% - 94px);
    overflow: hidden;
    margin-top: 44px;
  } */

</style>
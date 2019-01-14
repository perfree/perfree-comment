<template>
  <div>
    <!-- 表情包1 -->
    <ul class="icon_lists dib-box" v-show="oneIsShow">
      <li class="dib" v-for="(emjoi, index) in mengEmjoiList" :key="index">
        <img :src="emjoi.url" width="30px" height="30px" @click="selectEmjoi" :alt="emjoi.title" :title="emjoi.title">
      </li>
    </ul>
    <!-- 表情包2 -->
    <ul class="icon_lists dib-box" v-show="twoIsShow">
      <li class="dib" v-for="(emjoi, index) in lineEmjoiList" :key="index">
        <img :src="emjoi.url" width="30px" height="30px" @click="selectEmjoi" :alt="emjoi.title" :title="emjoi.title">
      </li>
    </ul>
    <!-- 分页 -->
    <div class="perfree-emjoi-page">
      <span v-bind:style="{background: oneColor}" class="perfree-emjoi-page-btn" @click="activePage(1)"></span>
      <span v-bind:style="{background: twoColor}" class="perfree-emjoi-page-btn" @click="activePage(2)"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmjoiIcon',
  data () {
    return {
      /* 表情包1  大脸萌 */
      mengEmjoiList: [
        {url: require('../assets/emjoi/dalianmeng/guangbo.svg'), title: '广播'},
        {url: require('../assets/emjoi/dalianmeng/keai.svg'), title: '可爱'},
        {url: require('../assets/emjoi/dalianmeng/deyi.svg'), title: '得意'},
        {url: require('../assets/emjoi/dalianmeng/ku.svg'), title: '哭'},
        {url: require('../assets/emjoi/dalianmeng/daku.svg'), title: '大哭'},
        {url: require('../assets/emjoi/dalianmeng/qinqin.svg'), title: '亲亲'},
        {url: require('../assets/emjoi/dalianmeng/haixiu.svg'), title: '害羞'},
        {url: require('../assets/emjoi/dalianmeng/meiqianliao.svg'), title: '没钱了'},
        {url: require('../assets/emjoi/dalianmeng/nanguo.svg'), title: '难过'},
        {url: require('../assets/emjoi/dalianmeng/han.svg'), title: '汗'},
        {url: require('../assets/emjoi/dalianmeng/gongxifacai.svg'), title: '恭喜发财'},
        {url: require('../assets/emjoi/dalianmeng/xiaoer.svg'), title: '小二'},
        {url: require('../assets/emjoi/dalianmeng/suanzhang.svg'), title: '算账'},
        {url: require('../assets/emjoi/dalianmeng/caimi.svg'), title: '财迷'},
        {url: require('../assets/emjoi/dalianmeng/ganhuo.svg'), title: '干活'},
        {url: require('../assets/emjoi/dalianmeng/saodi.svg'), title: '扫地'},
        {url: require('../assets/emjoi/dalianmeng/sikao.svg'), title: '思考'},
        {url: require('../assets/emjoi/dalianmeng/youxian.svg'), title: '悠闲'},
        {url: require('../assets/emjoi/dalianmeng/jiaoshu.svg'), title: '教书'},
        {url: require('../assets/emjoi/dalianmeng/caishenye.svg'), title: '财神爷'},
        {url: require('../assets/emjoi/dalianmeng/yuanbao.svg'), title: '元宝'},
        {url: require('../assets/emjoi/dalianmeng/qingzhu.svg'), title: '庆祝'},
        {url: require('../assets/emjoi/dalianmeng/cao.svg'), title: '草'},
        {url: require('../assets/emjoi/dalianmeng/huochai.svg'), title: '火柴'}
      ],
      /* 表情包2 线 */
      lineEmjoiList: [
        {url: require('../assets/emjoi/line/daxiao.svg'), title: '大笑'},
        {url: require('../assets/emjoi/line/deyi.svg'), title: '得意'},
        {url: require('../assets/emjoi/line/fashao.svg'), title: '发烧'},
        {url: require('../assets/emjoi/line/fushang.svg'), title: '负伤'},
        {url: require('../assets/emjoi/line/henwugu.svg'), title: '很无辜'},
        {url: require('../assets/emjoi/line/ku.svg'), title: '酷'},
        {url: require('../assets/emjoi/line/meimeng.svg'), title: '美梦'},
        {url: require('../assets/emjoi/line/meng.svg'), title: '懵'},
        {url: require('../assets/emjoi/line/nanshou.svg'), title: '难受'},
        {url: require('../assets/emjoi/line/shengbing.svg'), title: '生病'},
        {url: require('../assets/emjoi/line/shengqi.svg'), title: '生气'},
        {url: require('../assets/emjoi/line/tiaopi.svg'), title: '调皮'},
        {url: require('../assets/emjoi/line/wugu.svg'), title: '无辜'},
        {url: require('../assets/emjoi/line/xianqi.svg'), title: '嫌弃'},
        {url: require('../assets/emjoi/line/xiaochuyanlei.svg'), title: '笑出眼泪'},
        {url: require('../assets/emjoi/line/xiaoku.svg'), title: '笑哭'},
        {url: require('../assets/emjoi/line/anshi.svg'), title: '暗示'},
        {url: require('../assets/emjoi/line/qinqin.svg'), title: '亲亲'},
        {url: require('../assets/emjoi/line/yanjingfangguang.svg'), title: '眼睛放光'},
        {url: require('../assets/emjoi/line/youling.svg'), title: '幽灵'},
        {url: require('../assets/emjoi/line/kulou.svg'), title: '骷髅'},
        {url: require('../assets/emjoi/line/zan.svg'), title: '赞'},
        {url: require('../assets/emjoi/line/laji.svg'), title: '垃圾'},
        {url: require('../assets/emjoi/line/bianbian.svg'), title: '便便'}
      ],
      /* 表情面板分页第一页指示颜色 */
      oneColor: '#515a6e',
      /* 表情面板分页第二页指示颜色 */
      twoColor: '#c5c8ce',
      oneIsShow: true,
      twoIsShow: false
    }
  },
  methods: {
    /* 切换页码 */
    activePage: function (num) {
      if (num === 1) {
        this.oneColor = '#515a6e'
        this.twoColor = '#c5c8ce'
        this.oneIsShow = true
        this.twoIsShow = false
      } else {
        this.oneColor = '#c5c8ce'
        this.twoColor = '#515a6e'
        this.oneIsShow = false
        this.twoIsShow = true
      }
    },
    /* 选中emjoi,将该emjoi传给父组件 */
    selectEmjoi: function (e) {
      this.$emit('selectEmjoi', e.target)
    }
  }
}
</script>

<style>
.dib{
  float: left;
  padding-left: 8px;
  padding-top: 8px;
  list-style: none;
}
.dib img{
  cursor: pointer;
}
.dib-box{
  width: 100%;
  overflow: hidden;
	padding: 0;
}
.perfree-emjoi-page{
  text-align: center;
}
.perfree-emjoi-page span{
  width: 20px;
  height: 3px;
  display: inline-block;
  margin-left: 5px;
}
.perfree-emjoi-page-btn{
  cursor: pointer;
}
.dib img:hover{
  transform: scale(1.2);
}
</style>

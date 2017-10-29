<template>
  <div class="tmpl">
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/cart.html">购物车</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <!--购物车头部-->
          <div class="cart-head clearfix">
            <h2>
              <i class="iconfont icon-cart"></i>我的购物车</h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li>
                  <div class="progress">
                    <span>2</span>
                    填写订单信息
                  </div>
                </li>
                <li class="last">
                  <div class="progress">
                    <span>3</span>
                    支付/确认订单
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- 头结束 -->
           <section class="cartMain">
        <div class="cartMain_hd">
            <ul class="order_lists cartTop">
                <li class="list_chk">
                    <!--所有商品全选-->
                    <input type="checkbox" id="all" class="whole_check">
                    <label for="all"></label>
                    全选
                </li>
                <li class="list_con">商品信息</li>
                <li class="list_info">商品参数</li>
                <li class="list_price">单价</li>
                <li class="list_amount">数量</li>
                <li class="list_sum">金额</li>
                <li class="list_op">操作</li>
            </ul>
        </div>

        <div class="cartBox">
            <div class="shop_info">
                <div class="all_check">
                    <!--店铺全选-->
                    <input type="checkbox" id="shop_a" class="shopChoice">
                    <label for="shop_a" class="shop"></label>
                </div>
                <div class="shop_name">
                    店铺：<a href="javascript:;">搜猎人艺术生活</a>
                </div>
            </div>
            <div class="order_content">
                <ul class="order_lists" v-for="(item,index) in list" :key="index">
                    <li class="list_chk">
                     
                        <input type="checkbox" v-bind="{id:'checkbox_'+(index+2)}" class="son_check">
                        <label v-bind="{for:'checkbox_'+(index+2)}"></label>
                    </li>
                    <li class="list_con">
                  
                        <div class="list_img"><a href="javascript:;"><img height="50" width="50" :src="item.img_url" alt=""></a></div>
                        <div class="list_text"><a href="javascript:;" v-text="item.title"> </a></div>
                    </li>
                    <li class="list_info">
                        <p>规格：默认</p>
                        <p>尺寸：16*16*3(cm)</p>
                    </li>
                    <li class="list_price">
                        <p class="price">{{item.sell_price}}</p>
                    </li>
                    <li class="list_amount">
                        <div class="amount_box">
                            <a href="javascript:;" class="reduce reSty">-</a>
                            <input type="text" value="1"  class="sum">
                            <a href="javascript:;" class="plus">+</a>
                        </div>
                    </li>
                    <li class="list_sum">
                        <p class="sum_price">998</p>
                    </li>
                    <li class="list_op">
                        <p class="del"><a href="javascript:;" class="delBtn">移除商品</a></p>
                    </li>
                </ul>
              
            </div>
        </div>

       
        <!--底部-->
        <div class="bar-wrapper">
            <div class="bar-right">
                <div class="piece">已选商品<strong class="piece_num">0</strong>件</div>
                <div class="totalMoney">共计: <strong class="total_text">0.00</strong></div>
                <router-link v-bind="{to:'/site/shopping/'+idstr}">
                <div class="calBtn"><a href="javascript:;">结算</a></div>
                </router-link>
            </div>
        </div>
    </section>
    <section class="model_bg"></section>
    <section class="my_model">
        <p class="title">删除宝贝<span class="closeModel">X</span></p>
        <p>您确认要删除该宝贝吗？</p>
        <div class="opBtn"><a href="javascript:;" class="dialog-sure">确定</a><a href="javascript:;" class="dialog-close">关闭</a></div>
    </section>
   
          </div> 
          </div> 
          </div> 
          </div> 
</template>
 <script>

import {getItem} from '../../kits/localStorageKit.js';
   export default{
     data(){
        return{
          // ischeck:false,
        //   val:{},
        idstr:"",
          list:[] 
        }
     },
     created(){
        this.getgoodslist()
     },
     methods:{
      //  ischecked(){
      //     this.ischeck=!this.ischeck
      //  },
 getgoodslist() {
      var goodsObj = getItem();
    //   this.val=goodsObj;
    //   console.log(goodsObj);
      // 将ids用，分开
      var idsArr = []
      for (var key in goodsObj) {
        idsArr.push(key)
      }
      var idstr = idsArr.join(',');
      this.idstr=idstr;
      //请求接口渲染页面 /site/comment/getshopcargoods/:ids
      this.$http.get('/site/comment/getshopcargoods/' + idstr).then(res => {
        if (res.data.status == 1) {
          this.$message.error('请求购物商品失败');
        }
        this.list = res.data.message;
     
        //   setTimeout(function() {

        //   }, 100);
      })

    }
     }
   }

 import '../../../statics/theme_rms/js/carts.js';
 </script>
    <style scoped>
    @import url('../../../statics/theme_rms/css/carts.css');
    </style>
           
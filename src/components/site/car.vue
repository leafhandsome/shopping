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
          <!--购物车头部-->
          <!--商品列表-->
          <div class="cart-box">
            <input id="jsondata" name="jsondata" type="hidden">
            <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
              <tbody>
                <tr>
                  <th width="48" align="center">
                    <a>全选</a>
                  </th>
                  <th align="left">商品信息</th>
                  <th width="84" align="left">单价</th>
                  <th width="104" align="center">数量</th>
                  <th width="104" align="left">金额(元)</th>
                  <th width="54" align="center">操作</th>
                </tr>
                <tr>
                  <td v-if="list.length<=0" colspan="10">
                    <div class="msg-tips">
                      <div class="icon warning">
                        <i class="iconfont icon-tip"></i>
                      </div>
                      <div class="info">
                        <strong>购物车没有商品！</strong>
                        <p>您的购物车为空，
                          <a href="/index.html">马上去购物</a>吧！</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr width="48" v-for="(item,index) in list" :key="index">
                  <td >
                    <!-- elementUI e-switch实现 -->
                    {{values[index]}}
                    <el-switch on-text="反选" off-text="全选" v-model="values[index]" @change="itemchange">
                    </el-switch>
                  </td>
                  <td>
                    <img height="50" width="50" :src="item.img_url" alt="">
                    <span v-text="item.title"></span>
                  </td>
                  <td width="84">{{item.sell_price}}</td>
                  <td width="104">
                    <myinput @update="update" :options="{gid:item.id,count:item.buycount}"></myinput>
                  </td>
                  <td width="104">{{item.sell_price * item.buycount }}</td>
                  <td width="54">
                    <el-button type="success" size="mini" @click="deldata(item.id)">删除</el-button>
                  </td>
                </tr>
                
                <tr>
                  <th align="right" colspan="8">
                    已选择商品
                    <b class="red" id="totalQuantity">{{current}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                    <span class="red">￥</span>
                    <b class="red" id="totalAmount">{{totalAmount}}</b>元
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <!--/商品列表-->
          <!--购物车底部-->
          <div class="cart-foot clearfix">
            <div class="right-box">
              <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
              <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
            </div>
          </div>
          <!--购物车底部-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import myinput from '../subbuy/subbuy.vue'
import { getItem } from '../../kits/localStorageKit.js'
export default {
  components:{
myinput
  },
data(){
return{
  isselectedall:false,

  buycount:0,
current:0,
  values:[],
  list:[]
}
},
  created() {
    this.getgoodslist();
    console.log(this.current);
    
  },

computed:{
  // getall(){
  //   var trueArr=this.values.filter(function(item){
  //     return item;
  //   })
  //   this.current=trueArr.length;
  //   var totalAmount=0;
  //  this.values.forEach((item,index)=>{
  //    console.log(item==true);
     
  //    if(item){
 
  //     var num=this.list[index];
  //     totalAmount+=num.sell_price*num.buycount
  //    }
  //  });
  //  return totalAmount;
  // }
    selletmentAmount(){
                var trueArr = this.values.filter(function(item){return item;});
                // 如果values中的值发生改变不能触发的话，就通过push和pop来改变一下数组的长度，但是不影响到数据中的原来值
                // 栈：先进后出
                // this.values.push(false);
                // this.values.pop();
                this.selectCount = trueArr.length;

                var totalAmount = 0;
                // 统计当前选中的商品的总价格
                this.values.forEach((item,index)=>{
                    // 如果item为true的时候，这个index就是我需要统计的数据
                    if(item){
                     var goodsInfo =  this.list[index];
                         totalAmount+= (goodsInfo.sell_price * goodsInfo.buycount);
                    }
                });

                return totalAmount;
            }
},
  methods: {
    update(obj){
        this.list.forEach(item=> {
         if(item.id==obj.gid){
           item.buycount=obj.count
         } 
        });
        this.list.push('');
        this.list.pop();
    },
    // 删除
    deldata(){

    },
    // 全选
    itemchange(){
      this.isselectedall=!this.isselectedall;
     this.values.push(false);
     this.values.pop()
    },
    getgoodslist() {
      var goodsObj = getItem();
      console.log(goodsObj);
      // 将ids用，分开
      var idsArr = []
      for (var key in goodsObj) {
        idsArr.push(key)
      }
      var idstr = idsArr.join(',')
      //请求接口渲染页面 /site/comment/getshopcargoods/:ids
      this.$http.get('/site/comment/getshopcargoods/' + idstr).then(res => {
        if (res.data.status == 1) {
          this.$message.error('请求购物商品失败');
        }
        this.list = res.data.message;
        console.log(this.list);
        
      })

    }
  }
}
</script>
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
                <li class="active">
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
          <div class="cart-box">
            <h2 class="slide-tit">
              <span>1、收货地址</span>
            </h2>
            <el-form :model="form" :rules="rules" ref="ruleform">
              <div id="orderForm" name="orderForm">
                <el-row>
                  <div class="form-box address-info">
                    <el-form-item label="收货人" prop="accept_name">
                      <el-input v-model="form.accept_name"></el-input>
                    </el-form-item>
                    <!-- 所在区域联动框 -->
                    <el-form-item label="所在地区">
                      <v-distpicker @selected="getarea"></v-distpicker>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="address">
                      <el-input v-model="form.address"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="mobile">
                      <el-input v-model="form.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱" prop="email">
                      <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="邮政编码" prop="post_code">
                      <el-input v-model="form.post_code"></el-input>
                    </el-form-item>
                  </div>
                </el-row>

                <h2 class="slide-tit">
                  <span>2、支付方式</span>
                </h2>
                <ul class="item-box clearfix">
                  <!--取得一个DataTable-->
                  <li>
                    <el-radio class="radio" v-model="form.payment_id" label="6">在线支付</el-radio>
                  </li>
                </ul>
                <h2 class="slide-tit">
                  <span>3、配送方式</span>
                </h2>

                <el-radio-group class="item-box clearfix" v-model="form.express_id" @change="expressChange">
                  <el-radio v-for="item in expresslist" :key="item.id" :label="item.id">{{item.title}}(运费：{{item.express_fee}} 元)</el-radio>

                </el-radio-group>
                <h2 class="slide-tit">
                  <span>4、商品清单</span>
                </h2>
                <div class="line15"></div>
                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                  <tbody>
                    <tr>
                      <th colspan="2" align="left">商品信息</th>
                      <th width="84" align="left">单价</th>
                      <th width="84" align="center">购买数量</th>
                      <th width="104" align="left">金额(元)</th>
                    </tr>
                    <tr v-for="item in shoppinglist" :key="item.id">
                      <td width="68">
                        <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                          <img :src="item.img_url" class="img">
                        </router-link>
                      </td>
                      <td>
                        <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                          {{item.title}}
                        </router-link>

                      </td>
                      <td>
                        <span class="red">
                          ￥{{item.sell_price}}
                        </span>
                      </td>
                      <td align="center" v-text="item.buycount"></td>
                      <td>
                        <span class="red">
                          ￥{{ item.buycount * item.sell_price }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="line15"></div>
                <h2 class="slide-tit">
                  <span>5、结算信息</span>
                </h2>
                <div class="buy-foot clearfix">
                  <div class="left-box">
                    <dl>
                      <dt>订单备注(100字符以内)</dt>
                      <dd>
                        <textarea name="message" class="input" style="height:35px;" v-model="form.message"></textarea>
                      </dd>
                    </dl>
                  </div>
                  <div class="right-box">
                    <p>
                      商品
                      <label class="price">{{shoppinglist.length}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                      <label id="goodsAmount" class="price">{{form.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                    <p>
                      运费：￥
                      <label id="expressFee" class="price">{{currentFee}}</label> 元
                    </p>
                    <p class="txt-box">
                      应付总金额：￥
                      <label id="totalAmount" class="price">{{totalAmount}}</label>
                    </p>
                    <p class="btn-box">
                      <a class="btn button" javascript=":;">返回购物车</a>
                      <!-- <router-link to="/site/shoppingmall"> -->
                      <input type="button" value="确认提交" class="btn submit" @click="submitForm">
                      <!-- </router-link> -->
                    </p>
                  </div>
                </div>
              </div>
            </el-form>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getItem} from '../../kits/localStorageKit.js';
import VDistpicker from 'v-distpicker';
export default {
  components: {
    VDistpicker,
  },
  data() {
    //自定义规则
    var checkMobile = (rule, value, callback) => {
      var reg = /^13[0-9]{9}|15[012356789][0-9]{8}|18[0256789][0-9]{8}|147[0-9]{8}$/;
      if (!reg.test(value)) {
        return callback(new Error('手机格式错误'))
      }
      callback()
    };
    var checkemail = (rule, value, callback) => {
      var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
      if (!reg.test(value)) {
        return callback(new Error('邮箱格式错误'))
      }
      callback();
    };
    var checkpost_code = (rule, value, callback) => {
      var reg = /^\d{6}$/;
      if (!reg.test(value)) {
        return callback(new Error('邮编格式错误'))
      }
      callback();
    };
    return {
      currentFee: 20,
      expresslist: [],
      shoppinglist: [],
      ids: this.$route.params.ids,
      form: {
        "goodsAmount": 0
        , "expressMoment": 0
        , "accept_name": ""
        , "address": ""
        , "mobile": ""
        , "email": ""
        , "post_code": ""
        , "payment_id": -1
        , "express_id": 1
        , "message": ""
        , "goodsids": "",
        cargoodsobj: {},
        area: {}
      },
      rules: {
        accept_name: [{ required: true, message: '请输入收件人', trigger: 'blur' }],
        address: [{ required: true, message: '请输入收件人', trigger: 'blur' }],
        mobile: [{ validator: checkMobile, trigger: 'blur' }],
        email: [{ validator: checkemail, trigger: 'blur' }],
        post_code: [{ validator: checkpost_code, trigger: 'blur' }],

      }
    }
  },
  created() {
    this.getexpresslist();
    this.getshopping();
    this.form.cargoodsobj=getItem();
    this.form.goodsids=this.$route.params.ids;
  },
  computed: {
    totalAmount() {
      var amount = this.currentFee + this.form.goodsAmount;
      return amount;
    }
  },
  methods: {
    //商品shoppinglist
    getshopping() {

      this.$http.get('/site/comment/getshopcargoods/' + this.ids).then(res => {
        if (res.data.status == 1) {
          this.$message.error('请求失败')
        }
        // console.log(res.data.message);

        this.shoppinglist = res.data.message;
      })
    },
    // 配送方式
    getexpresslist() {
      // var ids=this.$route.params.ids

      this.$http.get('/site/validate/order/getexpresslist').then(res => {
        if (res.data.status == 1) {
          this.$message.error('请求配送方式错误');
          return;
        }
        this.expresslist = res.data.message;
      })
    },
    expressChange(expressid) {
      var newArr = this.expresslist.filter(function(item) { return expressid == item.id })

      this.form.goodsAmount = this.currentFee = newArr[0].express_fee
    },
    //提交
     submitForm() {
        // this.$refs.ruleForm.validate((valid) => {
        //   if (valid) {
             this.$http.post('/site/validate/order/setorder',this.form).then(res => {
        if(res.data.status==1){
          this.$message.error('提交失败')
        }
        this.$message.success('提交成功');
        console.log(res.data.message.orderid);
        
        this.$router.push({name:'shoppingmall',params:{orderid:res.data.message.orderid}})
      })
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
    
    },
    //获取地区
    getarea(data) {
      this.form.area = data;
      // console.log(data);
    }
    }
  }

</script>
<style>
el-form-item {
  width: 50px;
}

.buy-foot .right-box p .price {
  border: none;
}
</style>

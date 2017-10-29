<template>
  <div class="tmpl">
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="javascript:;">支付中心</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit pay">
            <a href="javascript:;" class="selected">支付中心</a>
          </div>
          <div class="form-box payment">
            <div class="el-row">
              <div class="el-col el-col-16">
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>订 单 号：</dt>
                      <dd>{{orderidlist.order_no}}</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>收货人姓名：</dt>
                      <dd>{{orderidlist.accept_name}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>送货地址：</dt>
                      <dd>{{orderidlist.area}}
                      </dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>手机号码：</dt>
                      <dd>{{orderidlist.mobile}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付金额：</dt>
                      <dd>{{orderidlist.order_amount}} 元</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付方式：</dt>
                      <dd>在线支付</dd>
                    </dl>
                  </div>
                </div>
                <div class="message">
                  <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                  <span>sdf</span>
                </div>
              </div>
              <div class="el-col el-col-8">
                <router-link v-bind="{to:'/play/'+orderid}">
                <div id="container">
                  <canvas width="400" height="400"></canvas>
                </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

  </div>
</template>
<script>
import '../../../statics/site/js/jqplugins/qr/jqueryqr.js';
export default {
  data() {
    return {
      orderid: this.$route.params.orderid,
      orderidlist: {}
    }
  },
  created() {
    this.getorderinfo();


  },
  mounted() {
    $("#container").erweima({
      label: '扫我有惊喜',
      text: 'http://127.0.0.1:7076/#/site/payamount'+'/'+this.orderid

    });
 
    this.interval=setInterval(this.checkorderStatus,5000)
  },
  destroyed(){
      clearInterval(this.interval)
  },
  methods: {
    //每5秒请求一次看支付成功没有
    checkorderStatus(){
        this.$http.get('/site/validate/order/getorder/'+this.orderid).then(res=>{
          if(res.data.message[0].status==2){
            this.$router.push({name:'payamount'})
          }
          console.log('123');
          
          
        })
    },
    getorderinfo() {
      this.$http.get('/site/validate/order/getorder/' + this.orderid).then(res => {
        if (res.data.status == 1) {
          this.$message.error('数据请求失败')
        }
        this.orderidlist = res.data.message[0];
      })
    }
  }
}
</script>


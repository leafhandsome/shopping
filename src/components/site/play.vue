<template>
  <div class="tmpl">
      <input type="text" v-model="amount">
       
      <el-button type="success" @click="pay">支付</el-button>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                amount: this.$route.params.amount
            }
        },
        methods: {
            pay() {
                var orderid = this.$route.params.orderid;
                this.$http.get('/site/validate/order/pay/' + orderid).then(res => {
                    this.$router.push({
                        name: 'payamount'
                    })
                })
            }
        }
    }
</script>
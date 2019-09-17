<template>
    <v-container >
        <div style="font-size:30px; font-style: revert"><br>추천 상품</div>
        <v-row>
            <v-col
                    v-for="(item,index) in recommendList"
                    :key="item.item.id"
                    v-if="index<4  "
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
            >
                <product
                        v-model="recommendList[index].item"
                        @inputBuy="showBuy"
                        @inputEdit="showEdit"
                ></product>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        props:{
          value:Object
        },
        data() {
            return {
                keys: [
                    'Name',
                    'Id',
                    'Price',
                    'Stock',
                ],
                productList: [],
                orderList: [],
                recommendList: [],
                cnt:0,
                totalCnt:0,
                buyDialog: false,
                editDialog: false,
            }
        },
        computed: {
            filteredKeys() {
                return this.keys.filter(key => key !== `Name`)
            },
        },
        created() {},
        async mounted() {
            var me = this
            var productList = await me.getProductList();
            var orderList = await me.getOrderList()

            me.productList = productList;
            me.orderList = orderList;

            me.productList.forEach(function (productVal) {
                me.orderList.forEach(function (orderVal) {
                    if(productVal.id == orderVal.productId){
                        me.cnt=me.cnt+1;
                    }
                })
                let data={
                    'item':productVal,
                    'cnt': me.cnt,
                }
                me.recommendList.push(data);
                me.cnt=0;
            })

            me.recommendList.sort(function(a, b) { // 내림차순
                return b['cnt'] - a['cnt'];
            });

        },
        methods: {
            getProductList: function () {
                var me = this
                return new Promise(function (resolve, reject) {
                    me.$http.get(`${API_HOST}/products`).then(function (e) {
                        resolve(e.data._embedded.products)
                    });
                });
            },
            getOrderList: function () {
                var me = this
                return new Promise(function (resolve, reject) {
                    me.$http.get(`${API_HOST}/mypage/order/${localStorage.getItem('userId')}`).then(function (e) {
                        resolve(e.data)
                    });
                });
            },
            showDetail(val) {
                this.$router.push('/products/' + val)
            },
            updateItemsPerPage(number) {
                this.itemsPerPage = number
            },
            showEdit (item) {
                this.$emit('editItem',item);
            },
            showBuy(item) {
                var me = this
                if (item.stock >= 1) {
                    this.$emit('buyItem',item);
                } else {
                    var app = me.$getComponents('App')
                    app.snackbar = true;
                    app.snackbarColor = 'error'
                    app.snackbarMessage = '재고가 없습니다.'
                }
            },
        },
    }
</script>

<style scoped>

</style>

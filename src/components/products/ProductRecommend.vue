<template>
    <v-container >
        <v-dialog
                v-model="buyDialog"
                width="800"
        >
            <order-page
                    v-bind:buyDialog.sync="buyDialog"
                    :productInfo="selectItem"
            ></order-page>
        </v-dialog>

        <v-dialog
                v-model="editDialog"
                width="500"
        >
            <product-repository
                    v-if="editDialog"
                    v-bind:repositoryDialog.sync="editDialog"
                    :productInfo="selectItem"
                    :edit=true
            ></product-repository>
        </v-dialog>



        <v-row>
            <v-col
                    v-for="(list,idx) in recommendList"
                    :key="list.item.id"
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                    v-if="idx<4"
            >
                <product
                        :item="list.item"
                        :selectItem.sync="selectItem"
                        :buyDialog.sync="buyDialog"
                        :editDialog.sync="editDialog"
                ></product>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
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
                rr:[],
                cnt:0,
                host:`${API_HOST}`,
                selectItem: {},
                buyDialog: false,
                editDialog: false,
            }
        },
        computed: {
            filteredKeys() {
                return this.keys.filter(key => key !== `Name` && key !== 'Image')
            },
        },
        created() {
            console.log(this.$getComponents())
        },
        async mounted() {
            var me = this
            var productList = await me.getProductList();
            var orderList = await me.getOrderList()

            me.productList = productList;
            me.orderList = orderList;

            me.productList.forEach(function (productVal,idx) {
                me.orderList.forEach(function (orderVal,idx) {
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
            showBuy(item) {
                var me = this
                if (item.stock >= 1) {
                    me.buyDialog = true;
                    me.selectItem = item;
                } else {
                    var app = me.$getComponents('App')
                    app.snackbar = true;
                    app.snackbarColor= 'error'
                    app.snackbarMessage = '재고가 없습니다.'
                }
            },
            updateItemsPerPage(number) {
                this.itemsPerPage = number
            },
        },
    }
</script>

<style scoped>

</style>

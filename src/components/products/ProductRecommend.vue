<template>
    <v-container fluid>
        <v-dialog
                v-model="buyDialog"
                width="800"
                persistent
        >
            <order-page
                    v-bind:buyDialog.sync="buyDialog"
                    :productInfo="selectItem"
            ></order-page>
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
                <v-card>
                    <v-card-title class="subheading font-weight-bold">{{ list.item.name}}</v-card-title>

                    <v-divider></v-divider>

                    <v-img :src='host+list.item.imageUrl' aspect-ratio="1.7" contain></v-img>

                    <v-list dense>
                        <v-list-item
                                v-for="(key, index) in filteredKeys"
                                :key="index"
                        >
                            <v-list-item-content>{{ key }}:</v-list-item-content>
                            <v-list-item-content class="align-end">{{ list.item[key.toLowerCase()] }}</v-list-item-content>
                        </v-list-item>
                        <div align="right">
                            <v-btn text @click="showDetail(list.item.name)"> DETAIL</v-btn>
                            <v-btn text @click="showBuy(list.item)"> BUY</v-btn>
                        </div>
                    </v-list>
                </v-card>
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
                cnt:0,
                host:`${API_HOST}`,
                selectItem: {},
                buyDialog: false
            }
        },
        computed: {
            filteredKeys() {
                return this.keys.filter(key => key !== `Name` && key !== 'Image')
            },
        },
        created() {},
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
            console.log(me.recommendList)

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
                me.buyDialog = true;
                me.selectItem = item;
            },
            updateItemsPerPage(number) {
                this.itemsPerPage = number
            },
        },
    }
</script>

<style scoped>

</style>
<template>
    <v-card
            class="mx-auto"
            outlined
    >
        <v-card-title>주문 내역</v-card-title>
        <v-data-table
                :loading="loadData"
                loading-text="Loading... Please wait"
                :headers="headers"
                :items="orderList"
                sort-by="orderId"
                :items-per-page="page"
                class="elevation-1"
        >

            <template v-slot:item.delivery="{ item }">
                <v-chip v-if="item.deli =='DeliveryCompleted'"
                        color="green"
                        dark
                > {{ item.deli }}
                </v-chip>
                <v-chip :color="'red'"
                        dark
                        v-else-if="item.deli == 'DeliveryCancelled'"
                >
                    {{ item.deli }}
                </v-chip>
                <v-chip v-else-if="item.deli =='DeliveryReady'"
                        color="red"
                        dark
                > {{ item.deli }}
                </v-chip>
            </template>
            <template v-slot:item.orderStatus="{ item }">
                <v-btn text
                       v-if="!(item.deli == 'DeliveryCancelled')"
                       @click="orderCancelled(item)"
                > 주문취소
                </v-btn>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
    export default {
        name: 'OrderList',
        data: () => ({
            dialog: false,
            surveyComplete: true,
            loadData: false,
            headers: [
                {
                    text: '주문 번호',
                    align: 'center',
                    sortable: false,
                    value: 'orderId',
                },
                {
                    text: '주문상품',
                    align: 'center',
                    sortable: false,
                    value: 'productName',
                },
                {text: '구매수량', value: 'quantity', sortable: false, align: 'center'},
                {text: '결제금액', value: 'price', sortable: false, align: 'center'},
                {text: '배송상태', value: 'delivery', sortable: false, align: 'center'},
                {text: '주문상태', value: 'orderStatus', sortable: false, align: 'center'},
                // {text: '결제시각', value: 'timestamp', align: 'center'},
            ],
            orderList: [],
            surveyList: [],
            page: 5,
        }),
        computed: {},
        watch: {
            dialog(val) {
                val || this.close()
            },
        },
        created() {
            this.mountedFunction()
        },
        beforeMount() {

        },
        methods: {
            async mountedFunction() {
                var me = this;

                try {
                    await me.getOrderList();
                    await me.getDeliveryStatus();
                    console.log("Done")
                } catch (err) {
                    console.log(err)
                }


                setTimeout(() => {
                    this.page = 10
                }, 100);

                // await me.updateList()


                return me.orderList

            },
            getDeliveryStatus() {
                var me = this

                if (`${API_HOST}` == 'undefined')
                    window.API_HOST = localStorage.getItem('api_host')

                return new Promise(function (resolve, reject) {
                    me.orderList.forEach(function (item) {
                        me.$http.get(`${API_HOST}/deliveries/search/findByOrderIdOrderByDeliveryIdDesc?orderId=` + item.orderId)
                            .then(function (e) {

                                if (e.data._embedded.deliveries.length != 0) {
                                    item.deli = e.data._embedded.deliveries[0].deliveryState
                                } else {
                                    item.deli = "DeliveryReady"
                                }
                            });
                    })
                    resolve(me.orderList)
                })
            },
            orderCancelled(item) {
                var me = this
                me.$http.patch(`${API_HOST}/orders/${item.orderId}`, {
                    state: 'OrderCancelled'
                }).then(function() {
                    me.$router.go({
                        path: me.$router.path,
                        query: {
                            t: + new Date()
                        }
                    })
                })
            },
            getOrderList() {
                var me = this


                if (`${API_HOST}` == 'undefined')
                    window.API_HOST = localStorage.getItem('api_host')

                return new Promise(function (resolve, reject) {
                    me.$http.get(`${API_HOST}/orders/search/findByCustomerId?customerId=${localStorage.getItem('userId')}`).then(function (e) {

                        e.data._embedded.orders.forEach(function (item) {
                            var tempArray = item._links.self.href.split('/')
                            var orderId = tempArray[tempArray.length - 1]
                            item.orderId = orderId
                        })

                        me.orderList = e.data._embedded.orders;
                        resolve(me.orderList)
                    });
                })
            },

        },
    }
</script>

<style scoped>

</style>

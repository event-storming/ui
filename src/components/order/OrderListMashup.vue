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
                <v-chip :color="'blue'"
                        dark
                        v-else-if="item.deli == 'DeliveryStarted'"
                >
                    {{ item.deli }}
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
                <v-chip v-if="item.state == 'OrderPlaced'"
                        color="green"
                        dark
                > {{ item.state }}
                </v-chip>
                <v-chip v-else
                        color="red"
                        dark
                > {{ item.state }}
                </v-chip>
            </template>
            <template v-slot:item.orderAction="{ item }">
                <v-btn
                        :color="'yellow'"
                        v-if="!(item.state == 'OrderCancelled') && !(item.deli == 'DeliveryCancelled') "
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
                {text: '주문취소', value: 'orderAction', sortable: false, align: 'center'},
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
            mountedFunction() {
                var me = this;

                try {
                    me.getOrderList();
                } catch (err) {
                    console.log(err)
                }

                return me.orderList

            },
            orderCancelled(item) {
                console.log(item)
                var me = this
                me.$http.patch(`${API_HOST}/orders/${item.orderId}`, {
                    state: 'OrderCancelled'
                }).then(function () {
                    me.$router.go({
                        path: me.$router.path,
                        query: {
                            t: +new Date()
                        }
                    })
                })
            },
            getOrderList() {
                var me = this

                if (`${API_HOST}` == 'undefined')
                    window.API_HOST = localStorage.getItem('api_host')

                console.log(`${API_HOST}`)

                me.$http.get(`${API_HOST}/orders/search/findByCustomerId?customerId=${localStorage.getItem('userId')}`).then(function (orderResult) {
                    orderResult.data._embedded.orders.forEach(function (orderItem, orderIndex) {
                        console.log(orderItem)
                        me.$http.get(`${API_HOST}` + orderItem._links.delivery.href).then(function (deliveryResult) {
                            console.log(deliveryResult);
                            orderItem.orderId = deliveryResult.data._embedded.deliveries[0].orderId
                            orderItem.deli = deliveryResult.data._embedded.deliveries[0].deliveryState

                            me.orderList.push(orderItem)
                        }).catch(function (deliveryError) {
                            console.log(orderItem)

                            var tempArray = orderItem._links.self.href.split('/')
                            var orderId = tempArray[tempArray.length - 1]
                            orderItem.orderId = orderId

                            me.orderList.push(orderItem)

                        })
                    })
                })
            },

        },
    }
</script>

<style scoped>

</style>

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

                <v-chip v-else
                        color="red"
                        dark
                > {{ item.deli }}
                </v-chip>
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
                {text: '결제금액', value: 'payment', sortable: false, align: 'center'},
                {text: '배송상태', value: 'delivery', sortable: false, align: 'center'},
                // {text: '결제시각', value: 'timestamp', align: 'center'},
            ],
            orderList: [],
            surveyList: [],
            page:5,
        }),
        computed: {

        },
        watch: {
            dialog(val) {
                val || this.close()
            },
            // orderList:function(newVal,oldVal){
            //     this.orderList= newVal
            // }
        },

        created() {
            this.mountedFunction()
        },
        mounted() {

        },
        methods: {
            async mountedFunction() {
                var me = this;

                await me.getOrderList();
                await me.getDeliveryStatus();
                console.log("Done")

                setTimeout(() => {
                    this.page=10
                }, 100);

                // await me.updateList()


            },
            // updateList() {
            //     var me = this
            //     return new Promise(function (resolve, reject) {
            //         console.log(me.orderList)
            //         resolve(me.orderList)
            //     })
            // },
            getDeliveryStatus() {
                var me = this

                return new Promise(function (resolve, reject) {

                    me.orderList.forEach(function (item) {
                        me.$http.get(`${API_HOST}/deliveries/search/findByOrderIdOrderByDeliveryIdDesc?orderId=` + item.orderId).then(function (e) {

                            if (e.data._embedded.deliveries.length != 0) {
                                item.deli = e.data._embedded.deliveries[0].deliveryState
                            } else {
                                item.deli = "Ready"
                            }
                        });
                    })
                    // var tmp =JSON.parse(JSON.stringify(me.orderList))
                    resolve(me.orderList)
                })
            },
            getOrderList() {
                var me = this
                if (`${API_HOST}` == 'undefined')
                    window.API_HOST = localStorage.getItem('api_host')


                // return new Promise(function (resolve, reject) {
                //     me.$http.get(`${API_HOST}/mypage/order/${localStorage.getItem('userId')}`).then(function (e) {
                //         resolve(e.data)
                //     });
                // });

                return new Promise(function (resolve, reject) {
                    me.$http.get(`${API_HOST}/orders/search/findByCustomerId?customerId=${localStorage.getItem('userId')}`).then(function (e) {

                        e.data._embedded.orders.forEach(function (item) {
                            var tempArray = item._links.self.href.split('/')
                            var orderId = tempArray[tempArray.length - 1]
                            item.orderId = orderId
                        })

                        me.orderList = e.data._embedded.orders;
                        console.log("orderList")
                        // var tmp =JSON.parse(JSON.stringify(me.orderList))
                        resolve(me.orderList)
                        // resolve(me.orderList)
                    });
                })
            },
            // getDeliveryStatus(orderId) {
            //     var me = this
            //
            //     // if (`${API_HOST}` == 'undefined') {
            //     //     window.API_HOST = localStorage.getItem('api_host')
            //     // }
            //
            //     // me.orderList.forEach(function(order){
            //     //     console.log(order)
            //     //     if (order.orderId != 'undefined') {
            //     Promise me.$http.get(`${API_HOST}/deliveries/search/findByOrderIdOrderByDeliveryIdDesc?orderId=2`).then(function (e) {
            //                     // console.log(e.data._embedded.deliveries[0].deliveryState)
            //                 if (e.data._embedded.deliveries.length > 0) {
            //                     return "1231"
            //                 }else{
            //                     return "12313"
            //                 }
            //             });
            //     return "123"
            //
            //     // })
            //
            //     // if (orderId != 'undefined') {
            //     //     me.$http.get(`${API_HOST}/deliveries/search/findByOrderIdOrderByDeliveryIdDesc?orderId=` + orderId).then(function (e) {
            //     //
            //     //         if (e.data._embedded.deliveries.length > 0) {
            //     //             me.orderList.forEach(function(order){
            //     //                 if(order.orderId == orderId){
            //     //                     order.delivery = e.data._embedded.deliveries[0].deliveryState;
            //     //                 }
            //     //             })
            //     //         }
            //     //     });
            //     // }
            // },
        },
    }
</script>

<style scoped>

</style>

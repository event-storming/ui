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
                class="elevation-1"
        >

            <template v-slot:item.action="{ item }">
                <v-chip :color="'green'"
                        dark
                        v-if="item.deliveryStarted && item.deliveryCompleted"
                > 배송 완료
                </v-chip>
                <v-chip :color="'green'"
                        dark
                        v-else-if="item.deliveryStarted && !item.deliveryCompleted"
                > 배송 시작
                </v-chip>
                <v-chip :color="'red'"
                        dark
                        v-else
                > 배송 준비 중
                </v-chip>
            </template>

            <template v-slot:item.Survey="{ item }">
                <v-icon
                        small
                        @click="openSurvey(item)"
                        v-if="surveyComplete"
                >
                    리뷰작성
                </v-icon>

                <v-icon v-else
                        small
                        @click="openSurvey(item)"
                        style="color: darkolivegreen; background: chartreuse"
                >
                    작성완료
                </v-icon>
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
                {text: '결제금액', value: 'payment',sortable: false, align: 'center'},
                {text: '구매수량', value: 'quantity', sortable: false, align: 'center'},
                {text: 'Delivery', value: 'action', sortable: false, align: 'center'},
                {text: '리뷰', value: 'Survey', sortable: false, align: 'center'},
                // {text: '결제시각', value: 'timestamp', align: 'center'},
            ],
            orderList: [],
        }),
        computed: {},
        watch: {
            dialog(val) {
                val || this.close()
            },
        },

        created() { },
        mounted() {
            this.getOrderList()
        },
        methods: {
            getOrderList() {
                var me = this
                this.$http.get(`${API_HOST}/mypage/order/${localStorage.getItem('userId')}`)
                    .then(function (e) {
                        console.log(e.data)
                        // me.orderList = e.data._embedded.orders
                        me.orderList = e.data
                    })
            },
            openSurvey(item) {
                var me = this
                var surveyCheck={
                    'surveyCheck':true
                }
                me.$router.push({name: 'serveys', params: item});

            }
        },
    }
</script>

<style scoped>

</style>

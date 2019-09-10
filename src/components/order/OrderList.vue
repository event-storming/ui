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
                sort-by="calories"
                class="elevation-1"
        >

            <template v-slot:item.action="{ item }">
                <!--<v-icon-->
                <!--small-->
                <!--class="mr-2"-->
                <!--@click="openDelivery(item)"-->
                <!--&gt;-->
                <!--배송완료-->
                <!--</v-icon>-->
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

            <template v-slot:top>
                <v-dialog v-model="dialog"
                          max-width="800px"
                          scrollable>
                    <v-card>
                        <!--                        <order-page></order-page>-->
                        <delivery-status
                                :prod-name="editedItem.name"
                        ></delivery-status>
                        <v-card-actions>
                            <div class="flex-grow-1"></div>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
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
                    text: 'OrderId',
                    align: 'left',
                    sortable: false,
                    value: 'orderId',
                },
                {
                    text: 'Product Name',
                    align: 'left',
                    sortable: false,
                    value: 'productName',
                },
                {text: '주문자', value: 'username'},
                {text: '결제금액', value: 'payment', align: 'center'},
                {text: '구매수량', value: 'quantity', align: 'center'},
                // {text: '결제시각', value: 'timestamp', align: 'center'},
                {text: 'Delivery', value: 'action', sortable: false},
                {text: '리뷰', value: 'Survey', align: 'center'}
            ],
            orderList: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
            defaultItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
        }),

        computed: {},

        watch: {
            dialog(val) {
                val || this.close()
            },
        },

        created() {

        },
        mounted() {
            this.getOrderList()
        },

        methods: {
            getOrderList() {
                var me = this
                this.$http.get(`${API_HOST}/mypage/order/${localStorage.getItem('userId')}`)
                    .then(function (e) {
                        console.log(e)
                        me.orderList = e.data
                    })
            },
            openDelivery(item) {
                console.log(item)
                this.editedIndex = this.orderList.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },
            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },
            openSurvey(item) {
                var me = this
                console.log(item)
                me.$router.push({name: 'survey', params: item});

            }
        },
    }
</script>

<style scoped>

</style>

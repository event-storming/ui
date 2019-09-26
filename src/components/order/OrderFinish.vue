<template>
    <v-container>
        <v-row>
            <v-col></v-col>
            <v-col class=".col-6"
                   :align-self="'center'">
                <v-card
                        class="mx-auto"
                        outlined>
                    <v-card-title style="color: crimson; font-size: 25px; justify-content: center">주문이 완료되었습니다.
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-title style="font-size: 15px; justify-content: center">
                        {{ $store.state.nickname }} / {{orderData.customerAddr}}
                    </v-card-title>
                    <!--<v-card-title style="font-size: 15px; justify-content: center">-->
                    <!--2019-09-04 15:00-->
                    <!--</v-card-title>-->

                </v-card>

                <v-card class="mx-auto"
                        outlined
                >
                    <v-card-title>> 상품 정보 확인</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        상품명: {{ orderData.productInfo.name }}
                        <br>상품금액: {{ orderData.productInfo.price }} | 수량: {{ orderData.quantity }}
                    </v-card-text>
                </v-card>

                <v-card
                        class="mx-auto"
                        outlined
                >
                    <v-card-title>> 주문자 정보 확인</v-card-title>
                    <v-divider></v-divider>

                    <v-card-text>
                        주문자: {{$store.state.nickname}}
                        <!--<br>주문자 연락처: {{UserInfo.phone}}-->
                        <!--<br>주문번호: {{ItemInfo.name}}-->
                        <!--<br>주문내역: {{ItemInfo.name}}-->
                        <br>총 주문금액: {{orderData.totalAmount}}
                    </v-card-text>
                </v-card>

                <v-card
                        class="mx-auto"
                        outlined
                >
                    <v-card-title>> 수령자 정보 확인</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        수령자: {{$store.state.nickname}}
                        <!--<br>수령자 휴대번호: {{OrderInfo.toPhone}}-->
                        <br>수령지: {{orderData.customerAddr}}
                    </v-card-text>


                    <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn text @click="goShop()">continue</v-btn>
                    </v-card-actions>
                </v-card>

<!--                <v-card-->
<!--                        class="mx-auto"-->
<!--                        outlined-->
<!--                >-->
<!--                    <v-card-title>> 결제 정보</v-card-title>-->
<!--                    <v-divider></v-divider>-->
<!--                    <v-card-text>-->
<!--                        결제 전 잔액:{{ $store.state.money + orderData.totalAmount }}-->
<!--                        <br>주문 총 금액: {{ orderData.totalAmount }}-->
<!--                        <br>결제 후 잔액: {{ $store.state.money }}-->
<!--                    </v-card-text>-->
<!--                    <v-divider></v-divider>-->
<!--                </v-card>-->


            </v-col>
            <v-col></v-col>
        </v-row>
    </v-container>


</template>

<script>
    export default {
        data: () => ({
            orderData: {}
        }),
        created() {
            this.orderData = this.$route.params
            console.log(this.orderData);
        },
        beforeDestroy() {
        },
        watch: {},
        mounted() {
            this.callUser();
        },
        computed: {

        },
        methods: {
            goShop() {
                this.$router.push('/products');
            },
            callUser() {
                var me = this
                var app = me.$getComponents('App')
                me.$http.get(`${API_HOST}/users/${localStorage.getItem('userId')}`).then(function (e) {
                    me.$emit('update:buyDialog', false)
                    me.overlay = false
                    app.snackbar = true;
                    app.snackbarColor= 'success'
                    app.snackbarMessage = '구매 완료 하였습니다.'

                    me.$store.state.nickname = e.data.nickname
                    me.$store.state.money = e.data.money
                    me.$store.state.address = e.data.address

                    localStorage.setItem("nickname", e.data.nickname)
                    localStorage.setItem("money", e.data.money)
                    localStorage.setItem("address", e.data.address)
                })
            }
        },
    }
</script>

<style scoped>

</style>

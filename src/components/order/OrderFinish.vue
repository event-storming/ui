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

                </v-card>

                <v-card
                        class="mx-auto"
                        outlined
                >
                    <v-card-title>> 마일리지 적립 정보</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        주문 총 금액 : {{ orderData.totalAmount }}
                        <br>적립 전 마일리지  : {{ $store.state.mileage - (orderData.totalAmount / 10)}}
                        <br>적립 예정 마일리지: {{ orderData.totalAmount / 10 }}
                        <br>적립 후 마일리지  : {{ $store.state.mileage }}
                    </v-card-text>
                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-col align="end">
                        <div clas="flex-grow-1"></div>
                        <v-btn text @click="goShop()">쇼핑 계속하기</v-btn>
                        </v-col>
                    </v-card-actions>
                </v-card>


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
                    console.log(e)
                    me.$emit('update:buyDialog', false)
                    me.overlay = false
                    app.snackbar = true;
                    app.snackbarColor= 'success'
                    app.snackbarMessage = '구매 완료 하였습니다.'

                    me.$store.state.mileage = e.data.mileage
                    me.$store.state.nickname = e.data.nickname
                    me.$store.state.address = e.data.address

                    localStorage.setItem("mileage", e.data.mileage)
                    localStorage.setItem("nickname", e.data.nickname)
                    localStorage.setItem("address", e.data.address)
                })
            }
        },
    }
</script>

<style scoped>

</style>

<template>


    <v-container style="width: 700px">

        <v-card style="padding-top: 70px;">
        <v-card-title style="color: crimson; font-size: 25px; justify-content: center" >주문이 완료되었습니다.</v-card-title>
        <v-divider></v-divider>
<!--        <v-card-title style="font-size: 15px; justify-content: center">-->
<!--            {{ UserInfo.name }} / {{OrderInfo.toAddr}}-->
<!--        </v-card-title>-->
<!--            -->
        </v-card>

        <v-card>
            <v-card-title>> 상품 정보 확인</v-card-title>
            <v-divider></v-divider>
<!--            <v-card-text>상품명: {{ItemInfo.name}}-->
<!--                <br>상품금액: {{ ItemInfo.price }} | 수량: {{ ItemInfo.qty }}-->
<!--                <br>배송비: {{ OrderInfo.deliveryFee }}-->
<!--            </v-card-text>-->
        </v-card>

        <v-card>
            <v-card-title>> 주문자 정보 확인</v-card-title>
            <v-divider></v-divider>
<!--            <v-card-text>주문자: {{UserInfo.name}}-->
<!--                <br>주문자 번호: {{UserInfo.phone}}-->
<!--                <br>주문번호: {{ItemInfo.name}}-->
<!--                <br>주문내역: {{ItemInfo.name}}-->
<!--                <br>총 주문금액: {{OrderInfo.orderPrice}}-->
<!--            </v-card-text>-->
        </v-card>

        <v-card>
            <v-card-title>> 수령자 정보 확인</v-card-title>
            <v-divider></v-divider>
<!--            <v-card-text>수령자: {{OrderInfo.toName}}-->
<!--                <br>수령자 휴대번호: {{OrderInfo.toPhone}}-->
<!--                <br>수령지: {{OrderInfo.toAddr}}-->
<!--            </v-card-text>-->
        </v-card>

        <v-card>
            <v-card-title>> 결제 정보</v-card-title>
            <v-divider></v-divider>
<!--            <v-card-text>-->
<!--                결제 전 잔액: {{UserInfo.balance}}-->
<!--                <br>주문 총 금액: {{OrderInfo.orderPrice}}-->
<!--                <br>결제 후 잔액: {{UserInfo.balance}}-->
<!--            </v-card-text>-->
        </v-card>

        <v-card>
            <v-row justify="end" align="center" wrap>
                <v-btn text @click="goDetail()">주문 상세보기</v-btn>
                <v-btn text @click="goShop()">쇼핑 계속하기</v-btn>
            </v-row>
        </v-card>

    </v-container>



</template>

<script>
    export default {
        data() {
            return {
                Infooo:{}
            }
        },
        created(){

        },
        mounted() {

            this.$EventBus.$on('message', function (e) {
                console.log(e.Product);

                    this.Infooo= {
                        'ddd':123,
                        '123123':2222
                    };

            })
        },
        computed: {

        },
        methods: {
            goShop(){
                this.$router.push('/products');
            },
            goDetail(){

            }
        },
    }
</script>

<style scoped>

</style>
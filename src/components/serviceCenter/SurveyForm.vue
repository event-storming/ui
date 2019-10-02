<template>
    <v-container style="width: 600px; margin-top: 30px" class="elevation-2">
        <v-card-title id="box" style="color: crimson; font-size: 25px; justify-content: left">리뷰 작성</v-card-title>

        <v-card id="box"  :disabled="disableBoolean">
            <v-row>
                <v-card-title  id="rightline" style="width:22%; font-size: 15px; justify-content: center;">구매하신 상품</v-card-title>
                <v-col >
                    <v-card-text
                    >
                        주문번호 &ensp; {{value.orderId}}
                        <br>상품명 &ensp; {{value.productName}}
                        <br>상품금액 &ensp; {{value.productPrice}}&ensp;|&ensp; 수량 &ensp; {{value.productQty}}
                        <!--                        <br>구매일자:{{orderData.timestamp}}-->
                    </v-card-text>
                </v-col>
            </v-row>
        </v-card>

        <v-card id="box" :disabled="disableBoolean">
            <v-row>
                <v-card-title id="rightline" style="width:22%; font-size: 15px; justify-content: center">상품평가</v-card-title>
                <v-col>
                    <v-rating
                            v-model="value.productSatisfaction"
                            background-color="red lighten-3"
                            color="red"
                    ></v-rating>
                    <v-card-text style="font-size: 15px;">별을 클릭하여 평가해주세요.</v-card-text>
                </v-col>
            </v-row>
        </v-card>

        <v-card id="box" :disabled="disableBoolean">
            <v-row>
                <v-card-title id="rightline" style="width:22%; font-size: 15px; justify-content: center">만족도 평가</v-card-title>
                <v-col >
                    <v-card-title style="font-size: 15px; justify-content: left">> 추천하시나요?</v-card-title>
                    <v-row justify="center">
                        <v-radio-group v-model="value.surveyRecommend" row>
                            <v-radio
                                    v-for="n in 5"
                                    :key="n"
                                    :label="`${n}점`"
                                    :value="n"
                            ></v-radio>
                        </v-radio-group>
                    </v-row>
                    <v-card-title style="font-size: 15px; justify-content: left">> 배송이 빨라나요?</v-card-title>
                    <v-row justify="center">
                        <v-radio-group v-model="value.surveyDelivery" row>
                            <v-radio
                                    v-for="n in 5"
                                    :key="n"
                                    :label="`${n}점`"
                                    :value="n"
                            ></v-radio>
                        </v-radio-group>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>

        <v-card id="box" :disabled="disableBoolean">
            <v-textarea
                    name="input-7-1"
                    label="리뷰 작성해주세요."
                    v-model="value.surveyMessage"
            ></v-textarea>
        </v-card>

        <v-card
                class="mx-auto"
                outlined
        >
            <v-row justify="end" align="center" wrap>
                <v-btn v-if="value.surveyCompleted == false" color="primary" text @click="summit()">제출</v-btn>
                <v-btn color="red" text @click="goList()">취소</v-btn>
            </v-row>
        </v-card>

    </v-container>
</template>

<script>
    import Survey from "./Survey";

    export default {

        props: {
            value: Object,
        },
        data: () => ({
            disableBoolean :false,
        }),
        created() {
            if(this.value.surveyCompleted != false)
                this.disableBoolean = true
        },
        beforeDestroy() {
        },
        watch: {
        },
        mounted() {
        },
        computed: {},
        methods: {
            summit() {
                var me = this
                var app = me.$getComponents('App')

                let param = {
                    'orderId' : me.value.orderId,
                    'customerId': me.value.customerId,
                    'customerName': me.value.customerName,
                    'productName': me.value.productName,
                    'productPrice': me.value.productPrice,
                    'productQty': me.value.productQty,
                    'surveyRecommend':me.value.surveyRecommend,
                    'surveyDelivery':me.value.surveyDelivery,
                    'productSatisfaction': me.value.productSatisfaction,
                    'surveyMessage': me.value.surveyMessage,
                }

                me.$http.post(`${API_HOST}/surveys`, param).then(function () {
                    app.snackbar = true;
                    app.snackbarColor = 'success'
                    app.snackbarMessage = '리뷰 작성 되었습니다.'
                })

                this.$router.push('/mypage');
            },
            goList() {
                this.$router.push('/mypage');
            }
        },
    }
</script>

<style>
    #title{
        border: 1px groove black;
    }

    #box{
        border: 1px groove black;
    }
    #rightline{
        border-right: 1px double black;
    }

</style>

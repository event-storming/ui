<template>
    <v-container style="width: 600px; margin-top: 30px" class="elevation-2">
        <v-card outlined>
            <v-card-title id="title" style="color: crimson; font-size: 25px; justify-content: left">리뷰 작성</v-card-title>
            <v-row>
                <v-card-title style="width:22%; font-size: 15px; justify-content: center;">구매하신 상품</v-card-title>
                <v-col id="box">
                    <v-card-text >
                        주문번호 &ensp; {{orderData.orderId}}
                        <br>상품명 &ensp; {{orderData.productName}}
                        <br>상품금액 &ensp; {{orderData.payment}}&ensp;|&ensp; 수량 &ensp; {{orderData.quantity}}
                        <!--                        <br>구매일자:{{orderData.timestamp}}-->
                    </v-card-text>
                </v-col>
            </v-row>
        </v-card>

        <v-card outlined>
            <v-row>
                <v-card-title style="width:22%; font-size: 15px; justify-content: center">상품평가</v-card-title>
                <v-col id="box">
                    <v-rating
                            v-model="rating"
                            background-color="red lighten-3"
                            color="red"
                    ></v-rating>
                    <v-card-text style="font-size: 15px;">별을 클릭하여 평가해주세요.</v-card-text>
                </v-col>
            </v-row>
        </v-card>

        <v-card outlined>
            <v-row>
                <v-card-title style="width:22%; font-size: 15px; justify-content: center">만족도 평가</v-card-title>
                <v-col id="box">
                    <v-card-title style="font-size: 15px; justify-content: left">> 추천하시나요?</v-card-title>
                    <v-row justify="center">
                        <v-radio-group v-model="surveyRecommend" row>
                            <v-radio
                                    v-for="n in 3"
                                    :key="n"
                                    :label="`${n}점`"
                                    :value="n"
                            ></v-radio>
                        </v-radio-group>
                    </v-row>
                    <v-card-title style="font-size: 15px; justify-content: left">> 배송이 빨라나요?</v-card-title>
                    <v-row justify="center">
                        <v-radio-group v-model="surveyDelivery" row>
                            <v-radio
                                    v-for="n in 3"
                                    :key="n"
                                    :label="`${n}점`"
                                    :value="n"
                            ></v-radio>
                        </v-radio-group>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
        <v-card outlined>
            <v-textarea
                    name="input-7-1"
                    label="리뷰 작성해주세요."
                    v-model="surveyComment"
            ></v-textarea>
        </v-card>

        <v-card
                class="mx-auto"
                outlined
        >
            <v-row justify="end" align="center" wrap>
                <v-btn color="primary" text @click="summit()">제출</v-btn>
                <v-btn color="red" text @click="goList()">취소</v-btn>
            </v-row>
        </v-card>

    </v-container>
</template>

<script>
    import Survey from "./Survey";

    export default {

        props: {
            orderData: Object,
        },
        data: () => ({
            rating: 4,
            surveyRecommend: 2,
            surveyDelivery: 2,
            surveyComment: '',
            user: `${localStorage.getItem('userId')}`

        }),
        created() {
            console.log(this.orderData);
        },
        beforeDestroy() {
        },
        watch: {
            rating: function (value) {
                console.log(value);
            }
        },
        mounted() {
        },
        computed: {},
        methods: {
            summit() {
                var me = this
                var app = me.$getComponents('App')
                // http http://localhost:8084/surveys customerName="1@uengine.org" surveyMessage="nonooooo" productSatisfaction=1
                let param = {
                    'customerName': me.user,
                    'surveyMessage': me.surveyComment,
                    'productSatisfaction': (me.surveyDelivery + me.surveyRecommend + me.rating) / 3,
                }
                app.snackbar = true;
                app.snackbarColor = 'success'
                app.snackbarMessage = '리뷰 작성 되었습니다.'
                me.$http.post(`${API_HOST}/surveys`, param).then(function () {
                    console.log('Survey POST');

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
        border-right: 1px double black;
        border-left: 1px double black;
    }

</style>

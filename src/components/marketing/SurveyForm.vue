<template >
    <v-container style="width: 600px" class="elevation-12">
        <v-card >
            <v-card-title style="color: crimson; font-size: 25px; justify-content: left">리뷰 작성</v-card-title>
            <v-row >
                    <v-card-title style="font-size: 15px; justify-content: left">> 구매하신 상품</v-card-title>
                <v-col>
                    <v-card-text>
                            주문번호 &ensp; {{orderData.orderId}}
                        <br>상품명  &ensp; {{orderData.productName}}
                        <br>상품금액 &ensp; {{orderData.payment}}&ensp;|&ensp; 수량 &ensp; {{orderData.quantity}}
<!--                        <br>구매일자:{{orderData.timestamp}}-->
                    </v-card-text>

                </v-col>

            </v-row>
        </v-card>

        <v-card>
            <v-row>
            <v-card-title style="font-size: 15px; justify-content: left">> 상품평가</v-card-title>
                <v-col center>
                    <v-rating
                            v-model="rating"
                            background-color="red lighten-3"
                            color="red"
                    ></v-rating>
                    <v-card-text style="font-size: 15px;" >별을 클릭하여 평가해주세요.</v-card-text>
                </v-col>
            </v-row>
        </v-card>

        <v-card>
            <v-row>
            <v-card-title style="font-size: 15px; justify-content: left">> 만족도 평가</v-card-title>
                <v-col>
                    <v-card-title style="font-size: 15px; justify-content: left">> 추천하시나요?</v-card-title>
                    <v-row justify="center" >
                        <v-radio-group v-model="surveyRecommend" row>
                            <v-radio
                                    v-for="n in 3"
                                    :key="n"
                                    :label="`${n}점`"
                                    :value="n"
                            ></v-radio>
                        </v-radio-group>
                    </v-row>
                    <v-card-title style="font-size: 15px; justify-content: left">> 배송이빨라나요?</v-card-title>
                    <v-row justify="center" >
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
        <v-card>
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
                <v-btn text @click="summit()">제출</v-btn>
                <v-btn text @click="goList()">취소</v-btn>
            </v-row>
        </v-card>

    </v-container>
</template>

<script>
    import Survey from "./Survey";

    export default {

        props:{
          orderData:Object,
        },
        data: () => ({
            rating: 4,
            surveyRecommend:2,
            surveyDelivery:2,
            surveyComment:'',

        }),
        created() {
            console.log(this.orderData);
        },
        beforeDestroy() {
        },
        watch: {
            rating:function (value) {
                console.log(value);
            }
        },
        mounted() {

        },
        computed: {},
        methods: {
            summit(){
                var me = this

                // http http://localhost:8084/surveys customerName="1@uengine.org" surveyMessage="nonooooo" productSatisfaction=1
                let param = {
                    'customerName': '1@uengine.org',
                    'surveyMessage': me.surveyComment,
                    'productSatisfaction': (me.surveyDelivery+me.surveyRecommend+me.rating)/3,
                }
                    me.$http.post(`${API_HOST}/surveys`, param).then(function (e) {
                        console.log('Survey POST');
                        console.log(e);
                })

                this.$router.push('/mypage');
            },
            goList(){
                this.$router.push('/mypage');
            }
        },
    }
</script>

<style scoped>

</style>
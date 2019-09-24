<template>
    <v-container >

        <v-dialog
                v-model="buyDialog"
                width="800"
                persistent
        >
            <order
                    v-model="selectItem"
                    @cancel="buyDialog=false"
            ></order>
        </v-dialog>


        <v-row style="justify-content: center">
            <v-card flat width="500px" outlined >
                <v-card
                        class="mx-auto"
                        outlined
                        color="green"
                >
                    <v-card-text
                        style="font-size: medium; color: black;">
                        제품 상세 정보
                    </v-card-text>
                </v-card>

                <v-card outlined>
                <v-card-title >
                    <v-row align="center" justify="center" outlined>
                        <v-img
                                :src="srcDomain"
                                aspect-ratio="1.7"
                                contain
                        ></v-img>
                    </v-row>
                </v-card-title>
                </v-card>

                <v-card flat>

                    <v-card-text>
                        <v-card
                                class="mx-auto"
                                outlined
                        >
                            <form >
                                <v-row >
                                    <v-col
                                            cols="15"
                                            outline
                                            style="padding-left: 20px"
                                    >
                                        <div>상품코드 : {{ selectItem.id }}
                                            <br> 상품이름 : {{ selectItem.name }}
                                            <br> 상품가격 : {{ selectItem.price }}
                                            <br> 재고량 :   {{selectItem.stock}}
                                        </div>

                                    </v-col>
                                </v-row>
                            </form>


                            <v-col v-if=" surveyCount != 0 ">
                                <v-row align="center" justify="center">
                                    전체 만족도
                                    <v-rating
                                            v-model="ratingValue"
                                            background-color="red lighten-3"
                                            color="red"
                                            readonly
                                    >  </v-rating>
                                    ({{ ratingValue.toFixed(1) }} 점)
                                </v-row>
                                <v-divider class="flex-lg-grow-1"></v-divider>
                                상품 만족도
                                <v-progress-linear
                                        :value="productValue *20"
                                        color="pink"
                                        height="15"
                                        :rounded="rounded"
                                        buffer-value="100"
                                >
                                    <strong>{{productValue.toFixed(1)}} 점</strong>
                                </v-progress-linear>
                                <br>
                                배송 만족도
                                <v-progress-linear
                                        :value="deliveryValue *20"
                                        color="pink"
                                        height="15"
                                        :rounded="rounded"
                                        buffer-value="100"
                                >
                                    <strong>{{deliveryValue.toFixed(1)}} 점</strong>
                                </v-progress-linear>
                                <br>
                                <div align="right"> 총 {{ surveyCount }}개의 리뷰</div>
                            </v-col>

                            <v-col v-else align="center">
                                상품 평점이 존재 하지 않습니다.
                            </v-col>

                        </v-card>
                    </v-card-text>

                </v-card>


                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="primary accent-4" v-if="$store.state.login == true" text @click="payment">결제하기</v-btn>
                    <v-btn color="red accent-4" text @click="close">나가기</v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    import VNumberSmarty from 'vuetify-number-smarty';
    export default {
        components: {
            'v-number-smarty': VNumberSmarty
        },
        data: () => ({
            value: 1,
            selectItem:{},
            items:[],
            buyDialog: false,
            img:'',
            ratingValue:0,
            productValue:0,
            deliveryValue:0,
            surveyCount:0,
            rounded: true,
            selectEvalAgv:{
                'cnt':0,
                'ratingAgv':0,
                'productAvg':0,
                'deliveryAvg':0
            }
        }),
        watch:{},
        created(){
        },
        mounted () {
            var me = this;

            this.$http.get(`${API_HOST}/products/search/findByName?name=`+this.$route.params.name).then(
              function (getItem) {
                  me.selectItem=getItem.data._embedded.products[0];
              })

            this.$http.get(`${API_HOST}/surveys`)
                .then(function (list) {
                    me.showList(list.data._embedded.surveys);

                })


        },
        computed:{
            srcDomain () {
                if(this.selectItem.imageUrl) {
                    if(this.selectItem.imageUrl.includes("http")){
                        return  this.selectItem.imageUrl
                    }else{
                        return `${API_HOST}`+this.selectItem.imageUrl
                    }
                }
            }
        },
        methods:{
            showList(list){
                var me = this
                list.forEach(function(surveyList){
                    if(me.selectItem.name == surveyList.customerName){
                        me.selectEvalAgv.cnt=me.selectEvalAgv.cnt+1;
                        me.selectEvalAgv.ratingAgv=me.selectEvalAgv.ratingAgv+surveyList.productSatisfaction
                        me.selectEvalAgv.productAvg=me.selectEvalAgv.productAvg+surveyList.surveyRecommend;
                        me.selectEvalAgv.deliveryAvg=me.selectEvalAgv.deliveryAvg+surveyList.surveyDelivery;
                    }
                })

                me.surveyCount=me.selectEvalAgv.cnt
                me.ratingValue=(me.selectEvalAgv.ratingAgv+me.selectEvalAgv.productAvg+me.selectEvalAgv.deliveryAvg)/(me.selectEvalAgv.cnt*3)
                me.productValue=me.selectEvalAgv.productAvg/me.selectEvalAgv.cnt
                me.deliveryValue=me.selectEvalAgv.deliveryAvg/me.selectEvalAgv.cnt


            },
            close(){
                this.$router.push('/products');
            },
            payment(){
                var me = this
                me.buyDialog=true;
            },

        }
    }
</script>

<style scoped>

</style>

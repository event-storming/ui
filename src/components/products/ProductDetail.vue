<template>
    <v-container >
        <v-dialog
                v-model="buyDialog"
                width="800"
                persistent
        >
            <order-page
                    v-bind:buyDialog.sync="buyDialog"
                    :productInfo="selectItem"
            ></order-page>
        </v-dialog>


        <v-row style="justify-content: center">
            <v-card flat width="500px" outlined >
                <v-card
                        class="mx-auto"
                        outlined
                        color="amber"
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
                                :src="host+selectItem.imageUrl"
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
                                    >
                                        <div>상품코드 : {{ selectItem.id }}
                                            <br> 상품이름 : {{ selectItem.name }}
                                            <br> 상품가격 : {{ selectItem.price }}
                                            <br> 재고량 :   {{selectItem.stock}}
                                            <br> 옵션 :
                                        </div>

                                    </v-col>
                                </v-row>
                            </form>
                        </v-card>
                    </v-card-text>
                </v-card>

                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="primary accent-4" text @click="check()">결제하기</v-btn>
                    <v-btn color="red accent-4" text @click="close()">나가기</v-btn>
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
            host:''
        }),
        watch:{},
        mounted () {
            var me = this;

            this.$http.get(`${API_HOST}/products/search/findByName?name=`+this.$route.params.name).then(
              function (getItem) {
                  me.selectItem=getItem.data._embedded.products[0];
                  me.host=API_HOST;
                  me.selectItem.map( item => item.host = API_HOST)
                  console.log(me.selectItem)
              })

        },
        computed:{

        },
        methods:{

            close(){
                this.$router.push('/products');
            },
            check(){
                var me = this
                me.buyDialog=true;
            }
        }
    }
</script>

<style scoped>

</style>

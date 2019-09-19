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
                                    >
                                        <div>상품코드 : {{ selectItem.id }}
                                            <br> 상품이름 : {{ selectItem.name }}
                                            <br> 상품가격 : {{ selectItem.price }}
                                            <br> 재고량 :   {{selectItem.stock}}
                                        </div>

                                    </v-col>
                                </v-row>
                            </form>
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
            img:''
        }),
        watch:{},
        mounted () {
            var me = this;

            this.$http.get(`${API_HOST}/products/search/findByName?name=`+this.$route.params.name).then(
              function (getItem) {
                  me.selectItem=getItem.data._embedded.products[0];
              })

        },
        computed:{
            srcDomain () {
                console.log(this.selectItem)
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

            close(){
                this.$router.push('/products');
            },
            payment(item){
                var me = this
                me.buyDialog=true;
            }
        }
    }
</script>

<style scoped>

</style>

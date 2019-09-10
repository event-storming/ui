<template style="margin: 10px">
    <v-container>
        <v-card
                color="amber"
        >
            <v-card-title>상품등록</v-card-title>
        </v-card>

        <v-card >
            <v-card flat >
                <v-row>
                    <v-img
                            contain
                            style="height: 300px; width: 300px; position: center"
                            :src='this.host+this.img'
                    >
                    </v-img>
                </v-row>
            </v-card>

            <v-card-text>
                <v-row cols="8" md="4">
                    <v-text-field
                            v-model="name"
                            label="상품명"
                            placeholder="Name"
                            outlined
                            required
                    ></v-text-field>
                </v-row>

                <v-row cols="8" md="4">
                    <v-text-field
                            v-model="price"
                            label="상품 가격"
                            placeholder="Price"
                            outlined
                            required
                            numberonly
                    ></v-text-field>

                    <v-text-field
                            v-model="stock"
                            label="상품 재고량"
                            placeholder="Stock"
                            outlined
                            required
                    ></v-text-field>
                </v-row>

                <v-row >
                        <v-text-field
                                v-model="img">
                            <template v-slot:label>
                                What Image you want?  <v-icon style="vertical-align: middle">find_in_page</v-icon>
                            </template>
                        </v-text-field>

                </v-row>
            </v-card-text>
        </v-card>


        <v-card >
            <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="primary accent-4" text @click="register()">등록하기</v-btn>
                <v-btn color="red accent-4" text @click="cancel()">취소</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        components: {
            // VNumberSmarty,
        },
        props: {
            repositoryDialog: Boolean
        },
        data: () => ({
            name:'',
            price:'',
            stock:'',
            img:'/goods/img/TV.jpg',
            host:`${API_HOST}`

        }),
        watch:{
            img:function(newVal){
                this.img=newVal
            }
        },
        methods: {
            register(){
                var me = this
                let item={
                    'name':me.name,
                    'price': me.price,
                    'stock': me.stock,
                    'imageUrl': me.src
                }
                me.$http.post(`${API_HOST}/products`, item).then(function (e) {
                    me.$emit('update:repositoryDialog', false)
                    var app = me.$getComponents('App')
                    app.snackbar = true;
                    app.snackbarColor= 'success'
                    app.snackbarMessage = '상품 추가 되었습니다.'
                })


            },
            cancel(){
                var me = this
                me.$emit('update:repositoryDialog', false)
            }
        }

    }
</script>

<style scoped>

</style>

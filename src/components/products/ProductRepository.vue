<template>
<<<<<<< HEAD
    <v-container>
=======
    <v-container style="padding: 0px">
>>>>>>> a8d0ff06c77a4b51b4c896c8333775d3ca27446f
        <v-card
                color="amber"
        >
            <v-card-title v-if="edit == true">상품 변경</v-card-title>
            <v-card-title v-if="edit == false">상품 추가</v-card-title>

        </v-card>

        <v-card flat>
            <v-img
                    :src="'http://localhost:8088'+this.imageUrl"
            >
            </v-img>
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

                <v-row>
                    <v-text-field
                            v-model="imageUrl">
                        <template v-slot:label>
                            What Image you want?
                            <v-icon style="vertical-align: middle">find_in_page</v-icon>
                        </template>
                    </v-text-field>

                </v-row>
            </v-card-text>
        </v-card>


        <v-card>
            <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn v-if="edit == false" color="primary accent-4" text @click="register()">등록하기</v-btn>
                <v-btn v-if="edit == true" color="primary accent-4" text @click="editProduct()">변경하기</v-btn>
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
            repositoryDialog: Boolean,
            productInfo: Object,
            edit: Boolean
        },
        data: () => ({
            name: '',
            price: '',
            stock: '',
            imageUrl: '/goods/img/TV.jpg',
        }),
        watch: {
        },
        mounted () {
          if(this.productInfo != null) {
              this.name = this.productInfo.name
              this.price = this.productInfo.price
              this.stock = this.productInfo.stock
              this.img = this.productInfo.imageUrl
          }
        },
        methods: {
            register() {
                var me = this
                let item = {
                    'name': me.name,
                    'price': me.price,
                    'stock': me.stock,
                    'imageUrl': me.src
                }
                me.$http.post(`${API_HOST}/products`, item).then(function (e) {
                    me.$emit('update:repositoryDialog', false)
                    var app = me.$getComponents('App')
                    app.snackbar = true;
                    app.snackbarColor = 'success'
                    app.snackbarMessage = '상품 추가 되었습니다.'
                })


            },
            editProduct() {
                var me = this
                let item = {
                    'name': me.name,
                    'price': me.price,
                    'stock': me.stock,
                    'imageUrl': me.img
                };
                me.$http.put(`${API_HOST}/products/` + me.productInfo.id, item).then(function (e) {
                    me.$emit('update:repositoryDialog', false)
                    var app = me.$getComponents('App')
                    app.snackbar = true;
                    app.snackbarColor = 'success'
                    app.snackbarMessage = '상품 변경 되었습니다.'

                    var productList = me.$getComponents('ProductList')
                    productList.getProdList();
                })
            },
            cancel() {
                var me = this
                me.$emit('update:productInfo', null);
                me.$emit('update:repositoryDialog', false);
            }
        }

    }
</script>

<style scoped>

</style>

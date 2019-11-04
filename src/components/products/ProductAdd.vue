<template>
    <v-container style="padding: 0px">
        <v-card
                color="green lighten-1"
        >
            <v-card-title v-if="value == null"><v-icon>mdi-arrow-up-bold-box-outline</v-icon>상품 등록</v-card-title>
            <v-card-title v-else><v-icon>fas fa-edit</v-icon>상품 변경</v-card-title>

        </v-card>

        <v-card flat>
            <v-img
                    :src="srcDomain"
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
                <v-btn v-if="value == null" color="primary accent-4" text @click="register">등록하기</v-btn>
                <v-btn v-else color="primary accent-4" text @click="editProduct">변경하기</v-btn>
                <v-btn color="red accent-4" text @click="cancel">취소</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>

    export default {
        props: {
            value: Object,
        },
        data: () => ({
            name: '',
            price: '',
            stock: '',
            imageUrl: '',
        }),
        watch: {
        },
        mounted () {
          if(this.value != null) {
              this.name = this.value.name
              this.price = this.value.price
              this.stock = this.value.stock
              this.imageUrl = this.value.imageUrl
          }
        },
        computed : {
          srcDomain () {
              if(this.imageUrl.includes("http")){
                    return  this.imageUrl
              }else{
                  return `${API_HOST}`+this.imageUrl
              }
          }
        },
        methods: {
            register() {
                var me = this
                let item = {
                    'name': me.name,
                    'price': me.price,
                    'stock': me.stock,
                    'imageUrl': me.imageUrl
                }

                console.log(item.imageUrl)
                if(item.imageUrl == ''){
                    item.imageUrl ='https://icon-library.net/images/no-image-available-icon/no-image-available-icon-7.jpg'
                }

                me.$http.post(`${API_HOST}/products`, item).then(function (e) {
                    me.$emit('cancel', false)
                    me.$EventBus.$emit('updateList')
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
                    'imageUrl': me.imageUrl
                };
                me.$http.put(`${API_HOST}/products/` + me.value.id, item).then(function (e) {
                    me.$emit('cancel', false)
                    me.$EventBus.$emit('updateList')

                    var app = me.$getComponents('App')
                    app.snackbar = true;
                    app.snackbarColor = 'success'
                    app.snackbarMessage = '상품 변경 되었습니다.'
                })
            },
            cancel() {
                var me = this
                me.$emit('cancel',false);

            }
        }

    }
</script>

<style scoped>

</style>

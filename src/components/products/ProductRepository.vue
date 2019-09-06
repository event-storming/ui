<template>
    <v-container>
        <v-card
                color="amber"
        >
            <v-card-title>상품등록</v-card-title>
        </v-card>

        <v-card>
            <v-card-text style="width: auto">

                <v-img
                        src="http://localhost:8088/goods/img/TV.jpg"
                >
                </v-img>

                <v-row cols="8" md="4">
                    <v-text-field
                            v-model="name"
                            label="상품명"
                            placeholder="Name"
                            outlined
                    ></v-text-field>
                </v-row>

                <v-row cols="8" md="4">
                    <v-text-field
                            v-model="price"
                            label="상품 가격"
                            placeholder="Price"
                            outlined
                            numberonly
                    ></v-text-field>

                    <v-text-field
                            v-model="stock"
                            label="상품 재고량"
                            placeholder="Stock"
                            outlined
                    ></v-text-field>
                </v-row>

                <v-row cols="8" md="6">
                    <v-file-input
                            accept="image/png, image/jpeg, image/bmp"
                            placeholder="상품 이미지 (png, jpeg, bmp 가능)"
                            prepend-icon="mdi-camera"
                            label="이미지"
                    ></v-file-input>

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
            src:'/goods/img/TV.jpg'

        }),
        methods: {
            register(){
                var me = this

                let item={
                    'name':me.name,
                    'price': me.price,
                    'stock': me.stock,
                    'imageUrl': me.src
                }

                me.$http.post(`http://localhost:8085/products`, item).then(function (e) {
                    console.log("post Item")
                    console.log(e)
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
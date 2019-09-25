<template>

    <v-container>
        <v-card color="green lighten-1">
            <v-card-title><v-icon>mdi-arrow-up-bold-box-outline</v-icon>상품삭제</v-card-title>
        </v-card>

        <v-card>
            <v-data-table
                    v-model="selectItem"
                    :headers="headers"
                    :items="items"
                    item-key="id"
                    show-select
                    class="elevation-1"
            >
            </v-data-table>
        </v-card>

        <v-card>

            <div align="right">
            <v-btn  text
                    color="red accent-4"
                    @click="deleteItem"
            >삭제
            </v-btn>

            <v-btn  text
                    color="primary accent-4"
                    @click="cancel"
            >닫기
            </v-btn>
            </div>
        </v-card>

    </v-container>

</template>

<script>
    export default {
        props:{
            deleteDialog: Boolean
        },
        data() {
            return {
                sortBy: 'id',
                headers: [
                    {
                        text: '상품 번호',
                        align: 'left',
                        sortable: false,
                        value: 'id',
                    },
                    {
                        text: '상품 이름',
                        align: 'left',
                        sortable: false,
                        value: 'name',
                    },
                    {text: '상품 가격', value: 'price'},
                    {text: '상품 재고량', value: 'stock', align: 'center'},
                ],
                items: [],
                selectItem: [],
            }
        },
        mounted() {
            this.getProdList();
        },
        computed: {

        },
        methods: {
            getProdList() {
                console.log("Aa")
                var me = this
                me.$http.get(`${API_HOST}/products`).then(function (e) {
                    me.items = e.data._embedded.products;
                })
            },
            cancel(){
                var me = this
                me.$emit('cancel', false)
            },
            deleteItem(){
                var me = this

                me.selectItem.forEach(function(item){
                    me.$http.delete(`${API_HOST}/products/${item.id}`).then(function () {
                        me.$emit('cancel', false)
                        me.$EventBus.$emit('updateList')
                        var app = me.$getComponents('App')
                        app.snackbar = true;
                        app.snackbarColor = 'success'
                        app.snackbarMessage = me.selectItem.length+'개 상품 삭제 되었습니다.'
                    })
                })


            }
        },
    }
</script>

<style scoped>

</style>
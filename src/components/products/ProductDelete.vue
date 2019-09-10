<template>

    <v-container>
        <v-card>
            <v-card-title>상품삭제</v-card-title>
        </v-card>

        <v-card>
            <v-data-table
                    v-model="selectItem"
                    :headers="headers"
                    :items="items"
                    item-key="name"
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
                    // {text: '삭제', value: 'Survey', align: 'center'}
                ],
                items: [],
                selectItem: {},
            }
        },
        mounted() {
            this.getProdList();
        },
        computed: {

        },
        methods: {
            getProdList() {
                var me = this
                me.$http.get(`${API_HOST}/products`).then(function (e) {
                    console.log(e)
                    me.items = e.data._embedded.products;
                    me.items.map( item => item.host = API_HOST)
                })
            },
            cancel(){
                var me = this
                me.$emit('update:deleteDialog', false)
            },
            deleteItem(){
                var me = this
                console.log(me.selectItem)

            }
        },
    }
</script>

<style scoped>

</style>
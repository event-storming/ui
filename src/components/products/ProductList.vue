<template>
    <v-container>

        <div style="font-size:20px; font-style: revert;"><br> &reg;eal 한 일반 상품</div>
                <v-data-iterator
                        v-if="items"
                        :items="items"
                        :items-per-page.sync="itemsPerPage"
                        :page="page"
                        hide-default-footer
                >
                    <template v-slot:default="props">
                        <v-row>
                            <v-col
                                    v-for="(item, index) in props.items"
                                    v-if=" search.length == 0 || item.name.includes(search)"
                                    :key="item.id"
                                    cols="12"
                                    sm="6"
                                    md="4"
                                    lg="3"
                            >
                                <product
                                        v-model="props.items[index]"
                                        @inputBuy="showBuy"
                                        @inputEdit="showEdit"
                                ></product>

                            </v-col>
                        </v-row>
                    </template>

                    <template v-slot:footer>
                        <v-row class="mt-2" align="center" justify="center">
                            <span class="grey--text">Items per page</span>
                            <v-menu offset-y>
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                            dark
                                            text
                                            color="primary"
                                            class="ml-2"
                                            v-on="on"
                                    >
                                        {{ itemsPerPage }}
                                        <v-icon>mdi-chevron-down</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item
                                            v-for="(number, index) in itemsPerPageArray"
                                            :key="index"
                                            @click="updateItemsPerPage(number)"
                                    >
                                        <v-list-item-title>{{ number }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>

                            <div class="flex-grow-1"></div>

                            <span
                                    class="mr-4 grey--text"
                            >
            Page {{ page }} of {{ numberOfPages }}
          </span>
                            <v-btn
                                    fab
                                    dark
                                    color="amber"
                                    class="mr-1"
                                    @click="formerPage"
                            >
                                <v-icon>mdi-chevron-left</v-icon>
                            </v-btn>
                            <v-btn
                                    fab
                                    dark
                                    color="amber"
                                    class="ml-1"
                                    @click="nextPage"
                            >
                                <v-icon>mdi-chevron-right</v-icon>
                            </v-btn>
                        </v-row>
                    </template>
                </v-data-iterator>
            </v-container>
</template>

<script>
    export default {
        data() {
            return {

                itemsPerPageArray: [4, 8, 12],
                search: '',
                filter: 'name',
                sortDesc: false,
                page: 1,
                itemsPerPage: 8,
                sortBy: 'name',
                items: [],
                searchItem: [],
                selectItem: {},
                buyDialog: false,
                editDialog: false,
                role: false,
                api: '',
            }
        },
        created() {},
        mounted() {
            var me = this;
            this.getProdList();

            this.$EventBus.$on('search', function (newVal) {
                me.search = newVal
            })
            this.$EventBus.$on('updateList', function () {
                me.getProdList()
            })


        },
        computed: {
            numberOfPages() {
                return Math.ceil(this.items.length / this.itemsPerPage)
            }
        },
        methods: {
            showEdit(item) {
                this.$emit('editItem', item);
            },
            showBuy(item) {
                var me = this
                if (item.stock >= 1) {
                    this.$emit('buyItem', item);
                } else {
                    var app = me.$getComponents('App')
                    app.snackbar = true;
                    app.snackbarColor = 'error'
                    app.snackbarMessage = '재고가 없습니다.'
                }
            },
            getProdList() {
                var me = this
                if(`${API_HOST}` == 'undefined')
                    window.API_HOST = localStorage.getItem('api_host')

                me.$http.get(`${API_HOST}/products`).then(function (e) {
                    me.items = e.data._embedded.products;
                })

            },
            formerPage() {
                if (this.page - 1 >= 1) this.page -= 1
            },
            updateItemsPerPage(number) {
                this.itemsPerPage = number
            },
            nextPage() {
                if (this.page + 1 <= this.numberOfPages) this.page += 1
            },

        },
    }
</script>

<style scoped>

</style>

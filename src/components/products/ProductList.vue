<template>
    <v-container fluid>
        <v-dialog
                v-model="buyDialog"
                width="800"
        >
            <order-page
                    v-bind:buyDialog.sync="buyDialog"
                    :productInfo="selectItem"
            ></order-page>
        </v-dialog>
        <v-dialog
                v-model="editDialog"
                width="500"
        >
            <product-repository
                    v-if="editDialog"
                    v-bind:repositoryDialog.sync="editDialog"
                    :productInfo="selectItem"
                    :edit=true
            ></product-repository>
        </v-dialog>


        <v-card flat>
            <div style="font-size:30px; font-style: revert">추천 상품</div>
            <product-recommend
                    :auth.sync= role
            ></product-recommend>
        </v-card>

        <v-card flat>
            <div style="font-size:30px; font-style: revert"><br>일반 상품</div>
            <v-container>
                <v-data-iterator
                        :items="items"
                        :items-per-page.sync="itemsPerPage"
                        :page="page"
                        :search="search"
                        hide-default-footer
                >
                    <template v-slot:default="props">
                        <v-row>
                            <v-col
                                    v-for="item in props.items"
                                    :key="item.id"
                                    cols="12"
                                    sm="6"
                                    md="4"
                                    lg="3"
                            >
                                <product
                                        :item="item"
                                        :selectItem.sync="selectItem"
                                        :buyDialog.sync="buyDialog"
                                        :editDialog.sync="editDialog"

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
        </v-card>

    </v-container>


</template>

<script>
    export default {
        name: 'ProductList',
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
                role :false
            }
        },
        mounted() {
            this.getProdList();
            var me = this;
            this.$EventBus.$on('search', function (newVal) {
                console.log("search");
                me.search = newVal
            })

        },
        beforeUpdate(){
        },
        computed: {
            numberOfPages() {
                return Math.ceil(this.items.length / this.itemsPerPage)
            }
        },
        methods: {
            getProdList() {
                var me = this
                console.log("Aa")

                me.$http.get(`${API_HOST}/products`).then(function (e) {
                    me.items = e.data._embedded.products;
                    // me.items.map(item => item.host = API_HOST)
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

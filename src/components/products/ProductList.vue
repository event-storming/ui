<template>
    <v-container fluid>
        <v-data-iterator
                :items="items"
                :items-per-page.sync="itemsPerPage"
                :page="page"
                :search="search"
                hide-default-footer
        >
            <template v-slot:header>
                <v-toolbar
                        dark
                        color="amber"
                        class="mb-1"
                >
                    <v-text-field
                            v-model="search"
                            clearable
                            flat
                            solo-inverted
                            hide-details
                            prepend-inner-icon="search"
                            label="Search"
                    ></v-text-field>
                </v-toolbar>
            <v-container>
                <div>Recommand</div>
                <ProductRecommend></ProductRecommend>
            </v-container>

            </template>

            <template v-slot:default="props">
                <v-row>
                    <v-col
                            v-for="item in props.items"
                            :key="item.name"
                            cols="12"
                            sm="6"
                            md="4"
                            lg="3"
                    >
                        <v-card>
                            <v-card-title  class="subheading font-weight-bold">{{ item.name }}</v-card-title>

                            <v-divider></v-divider>

                            <v-img :src=item.imageUrl aspect-ratio="1.7" contain></v-img>

                            <v-list dense>
                                <v-list-item
                                        v-for="(key, index) in filteredKeys"
                                        :key="index"
                                >
                                    <v-list-item-content>{{ key }}:</v-list-item-content>
                                    <v-list-item-content class="align-end" >{{ item[key.toLowerCase()] }}</v-list-item-content>

                                </v-list-item>
                                <div align="right">
                                    <v-btn text @click="showDetail(item.name)"> DETAIL </v-btn>
                                    <v-btn text> BUY </v-btn>
                                </div>
                            </v-list>
                        </v-card>
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
        data () {
            return {

                itemsPerPageArray: [4, 8, 12],
                search: '',
                filter: {},
                sortDesc: false,
                page: 1,
                itemsPerPage: 8,
                sortBy: 'name',
                keys: [
                    'Id',
                    'Name',
                    'Price',
                    'Stock',
                    'Option',
                ],
                items:[],
            }
        },
        mounted() {
          this.getProdList();
        },
        computed: {

            numberOfPages () {
                return Math.ceil(this.items.length / this.itemsPerPage)
            },
            filteredKeys () {
                return this.keys.filter(key => key !== `Name`&& key !== 'imageUrl')
            },
        },
        methods: {
            getProdList () {
                var me = this
                me.$http.get('http://localhost:8088/products').then(function(e) {
                    console.log();
                    me.items=e.data._embedded.products;
                })
            },
            showDetail(val){
                this.$router.push('/products/'+val)
            },
            nextPage () {
                if (this.page + 1 <= this.numberOfPages) this.page += 1
            },
            formerPage () {
                if (this.page - 1 >= 1) this.page -= 1
            },
            updateItemsPerPage (number) {
                this.itemsPerPage = number
            },
        },
    }
</script>

<style scoped>

</style>

<template>
    <v-card
            class="mx-auto"
            outlined
    >
        <v-card-title>주문 내역</v-card-title>
        <v-data-table
                :loading="loadData"
                loading-text="Loading... Please wait"
                :headers="headers"
                :items="orderList"
                sort-by="calories"
                class="elevation-1"
        >
            <template v-slot:top>
                    <v-dialog v-model="dialog"
                              max-width="800px"
                              scrollable>
                        <v-card>
                            <order-page></order-page>
                                <!--<delivery-status-->
                                    <!--:prod-name="editedItem.name"-->
                                <!--&gt;</delivery-status>-->
                            <v-card-actions>
                                <div class="flex-grow-1"></div>
                                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
            </template>

            <template v-slot:item.action="{ item }">
                <v-icon
                        small
                        class="mr-2"
                        @click="openDelivery(item)"
                >
                    local_shipping
                </v-icon>
            </template>
        </v-data-table>

        <!--<v-data-table item-key="name"-->
                      <!--:headers="headers"-->
                      <!--:items-per-page="5"-->
                      <!--class="elevation-1"-->
                      <!--:footer-props="{-->
                              <!--prevIcon: 'mdi-arrow-left',-->
                              <!--nextIcon: 'mdi-arrow-right'-->
                          <!--}"-->
                      <!--@click.native="deliveryDialog(item)"-->
        <!--&gt;</v-data-table>-->
    </v-card>
</template>

<script>
    export default {
        name: 'OrderList',
        data: () => ({
            dialog: false,
            loadData: false,
            headers: [
                {
                    text: 'Product Name',
                    align: 'left',
                    sortable: false,
                    value: 'name',
                },
                { text: 'Price', value: 'price' },
                { text: 'Stock', value: 'stock' },
                { text: 'Delivery', value: 'action', sortable: false}
            ],
            orderList: [
                {
                    name: 'Frozen Yogurt',
                    price: 159,
                    stock: 6.0,
                },
                {
                    name: 'Ice cream sandwich',
                    price: 237,
                    stock: 9.0,
                },
            ],
            editedIndex: -1,
            editedItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
            defaultItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
        }),

        computed: {

        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },

        created () {

        },

        methods: {
            openDelivery (item) {
                console.log(item)
                this.editedIndex = this.orderList.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },
            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },
        },
    }
</script>

<style scoped>

</style>

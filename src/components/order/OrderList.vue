<template>
    <v-card
            class="mx-auto"
            outlined
    >
        <v-data-table item-key="name"
                      :loading="loadData"
                      loading-text="Loading... Please wait"
                      :headers="headers"
                      :items="orderList"
                      :items-per-page="5"
                      class="elevation-1"
                      :footer-props="{
                              prevIcon: 'mdi-arrow-left',
                              nextIcon: 'mdi-arrow-right'
                          }"
        ></v-data-table>
    </v-card>
</template>

<script>
    export default {
        name: "OrderList",
        data() {
            return {
                loadData: false,
                headers: [
                    {
                        text: 'Dessert (100g serving)',
                        align: 'left',
                        value: 'name',
                    },
                    {text: 'Category', value: 'category'},
                ],
                orderList: [
                    {
                        name: 'Frozen Yogurt',
                        category: 'Ice cream',
                    },
                    {
                        name: 'Ice cream sandwich',
                        category: 'Ice cream',
                    },
                    {
                        name: 'Eclair',
                        category: 'Cookie',
                    },
                    {
                        name: 'Cupcake',
                        category: 'Pastry',
                    },
                    {
                        name: 'Gingerbread',
                        category: 'Cookie',
                    },
                    {
                        name: 'Jelly bean',
                        category: 'Candy',
                    },
                    {
                        name: 'Lollipop',
                        category: 'Candy',
                    },
                    {
                        name: 'Honeycomb',
                        category: 'Toffee',
                    },
                    {
                        name: 'Donut',
                        category: 'Pastry',
                    },
                    {
                        name: 'KitKat',
                        category: 'Candy',
                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>

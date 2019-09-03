<template>
    <v-row>
        <v-col
                v-for="item in items"
                :key="item.name"
                cols="12"
                sm="6"
                md="4"
                lg="3"
        >
        <v-card>
            <v-card-title class="subheading font-weight-bold">{{ item.name}}</v-card-title>

        <v-divider></v-divider>

        <v-list dense>
            <v-list-item
                    v-for="(key, index) in filteredKeys"
                    :key="index"
            >
                <v-list-item-content>{{ key }}:</v-list-item-content>
                <v-list-item-content class="align-end" >{{ item[key.toLowerCase()] }}</v-list-item-content>
            </v-list-item>
            <div align="right">
                <v-btn
                        text
                        flat
                >BUY
                </v-btn>
            </div>
        </v-list>
    </v-card>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        data () {
            return {
                keys: [
                    'Name',
                    'Price',
                    'Description',
                    'Option',
                ],
                items: [
                    {
                        name: 'Frozen Yogurt',
                        price: 159,
                        description: 6.0,
                        option: 24,
                    },
                    {
                        name: 'Ice cream sandwich',
                        price: '$237',
                        description: 9.0,
                        option: 37,
                    },
                    {
                        name: 'Eclair',
                        price: '$'+262,
                        description: 16.0,
                        option: 23,
                    },
                    {
                        name: 'Cupcake',
                        price: 305,
                        description: 3.7,
                        option: 67,
                    },
                ]
            }
        },
        computed: {
            filteredKeys () {
                return this.keys.filter(key => key !== `Name`&& key !== 'Image')
            },
        },
        methods: {
            updateItemsPerPage (number) {
                this.itemsPerPage = number
            },
        },
    }
</script>

<style scoped>

</style>
<template>
    <v-container fluid>
    <v-row>
        <v-col
                v-for="item in items"
                :key="item.name"
                cols="12"
                sm="6"
                md="4"
                lg="3"
        >
        <v-card >
            <v-card-title  class="subheading font-weight-bold">{{ item.name}}</v-card-title>

        <v-divider></v-divider>

            <v-img  src='https://svgsilh.com/svg/1295383-ff9800.svg' aspect-ratio="1.7" contain></v-img>

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
        </v-container>
</template>

<script>
    export default {
        data () {
            return {
                keys: [
                    'Name',
                    'Id',
                    'Price',
                    'Stock',
                    'Option',
                ],
                items: [
                    {
                        name: 'Frozen',
                        id:1,
                        price: 10000,
                        stock: 6,
                        option: '',
                    },
                    {
                        name: 'sandwich',
                        id:2,
                        price: 20000,
                        stock: 1,
                        option: '',
                    },
                    {
                        name: 'Eclair',
                        id:3,
                        price: 30000,
                        stock: 16,
                        option: '',
                    },
                    {
                        name: 'Cupcake',
                        id:4,
                        price: 40000,
                        stock: 11,
                        option: '',
                    },

                ]
            }
        },
        computed: {
            filteredKeys () {
                return this.keys.filter(key => key !== `Name`&& key !== 'Image')
            },
        },
        mounted() {
            this.getProdReCommendList();
        },
        methods: {
            getProdReCommendList () {
                // var me = this
                // me.$http.get('http://localhost:8088/products').then(function(e) {
                //     console.log();
                //     me.items=e.data._embedded.products;
                // })
            },
            showDetail(val){
                this.$router.push('/products/'+val)
            },
            updateItemsPerPage (number) {
                this.itemsPerPage = number
            },
        },
    }
</script>

<style scoped>

</style>
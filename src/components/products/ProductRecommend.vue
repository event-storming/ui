<template>
    <v-row>
        <v-col
                v-for="item in items"
                :key="item.name"
                cols="12"
                sm="6"
                md="2"
                lg="3"">
        <v-card >
            <v-card-title  class="subheading font-weight-bold">{{ item.name}}</v-card-title>

        <v-divider></v-divider>

            <v-img v-if="item.imageUrl != null" :src=item.imageUrl aspect-ratio="1.7" contain></v-img>
            <v-img v-else src='https://svgsilh.com/svg/1295383-ff9800.svg' aspect-ratio="1.7" contain></v-img>

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
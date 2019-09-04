<template>

    <v-card class="elevation-12">
        <v-toolbar
                color="amber"
                flat
        >
            <v-toolbar-title> PRODUCT DETAIL </v-toolbar-title>
            <div class="flex-grow-1"></div>
        </v-toolbar>

        <v-row align="center" justify="center">
            <v-img v-if="selectItem.imageUrl != null "
                    :src=selectItem.imageUrl
                    aspect-ratio="1"
                    max-width="500"
                    max-height="300"
            ></v-img>
            <v-img v-else
                   src='http://uengine.org/assets/img/uengine/logo_bright.png'
                   aspect-ratio="1"
                   max-width="500"
                   max-height="300"
            ></v-img>

        </v-row>

        <v-card-text>
            <v-form>
                <v-text-field
                        label="Product Id"
                        :value=selectItem.id
                        prepend-icon="person"
                        readonly
                        solo
                ></v-text-field>
                <v-text-field
                        label="Product Name"
                        :value=selectItem.name
                        prepend-icon="person"
                        readonly
                        solo
                ></v-text-field>
                <v-text-field
                        label="Product Price"
                        :value=selectItem.price
                        prepend-icon="person"
                        readonly
                        solo
                ></v-text-field>

                <v-text-field
                        label="Product Detail"
                        name="detail"
                        prepend-icon="person"
                        outlined
                        readonly
                        solo
                ></v-text-field>

                <div>Option</div>
                <v-autocomplete label="Option"></v-autocomplete>
            </v-form>
        </v-card-text>

        <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" >BUY</v-btn>
            <v-btn color="primary" @click="Cancel()">CANCEL</v-btn>
        </v-card-actions>

    </v-card>

</template>

<script>
    import VNumberSmarty from 'vuetify-number-smarty';
    export default {
        components: {
            'v-number-smarty': VNumberSmarty
        },
        props:{

        },
        data: () => ({
            value: 1,
            selectItem:{},
        }),
        watch:{


        },
        mounted () {
            var me = this;
          this.$http.get(`${API_HOST}/products/search/findByName?name=`+this.$route.params.name).then(
              function (getItem) {
                  me.selectItem=getItem.data._embedded.products[0];
              }
          )
        },
        computed:{

        },
        methods:{
            Cancel(){
                this.$router.push('/products');
            }
        }
    }
</script>

<style scoped>

</style>

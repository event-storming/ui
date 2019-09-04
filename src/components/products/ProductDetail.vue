<template>
    <v-card class="elevation-12">
        <v-toolbar
                color="amber"
                flat
        >
            <v-toolbar-title>Oreder form</v-toolbar-title>
            <div class="flex-grow-1"></div>
        </v-toolbar>
        <v-card-text>
            <v-form>
                <v-text-field
                        label="Product Name"
                        name="name"
                        prepend-icon="person"
                        readonly
                        solo
                ></v-text-field>
                <v-text-field
                        label="Product Price"
                        name="price"
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

                <div>Qty</div>
                <number-input v-model="value" :min="1" :max="10" inline controls></number-input>

            </v-form>
        </v-card-text>

        <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" >BUY</v-btn>
            <v-btn color="primary">CACEL</v-btn>
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
        }),
        watch:{

        },
        mounted () {
          this.$http.get(`${API_HOST}/products/search/findByName?name=`+this.$route.params.name).then(
              function (e) {
                  console.log(e)
              }
          )
        },
        computed:{

        }
    }
</script>

<style scoped>

</style>

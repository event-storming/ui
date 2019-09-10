<template>
    <v-card>
        <v-card-title class="subheading font-weight-bold">{{ item.name }}</v-card-title>

        <v-divider></v-divider>

        <v-img v-if="item.host != null" :src="item.host + item.imageUrl" aspect-ratio="1.7" contain></v-img>
        <v-img v-if="item.host == null" :src="'http://localhost:8088'+item.imageUrl" aspect-ratio="1.7" contain></v-img>

        <v-list dense>
            <v-list-item
                    v-for="(key, index) in filteredKeys"
                    :key="index"
            >
                <v-list-item-content>{{ key }}:</v-list-item-content>
                <v-list-item-content class="align-end">{{ item[key.toLowerCase()] }}
                </v-list-item-content>

            </v-list-item>
            <div align="right">
                <v-btn text @click="showEdit(item)"> Edit</v-btn>
                <v-btn text @click="showDetail(item)"> DETAIL</v-btn>
                <v-btn text @click="showBuy(item)"> BUY</v-btn>
            </div>
        </v-list>
    </v-card>
</template>

<script>
    export default {
        props:{
            item:Object,
            selectItem:Object,
            buyDialog: Boolean,
            editDialog:Boolean,
        },
        data(){
          return{
              keys: [
                  'Id',
                  'Name',
                  'Price',
                  'Stock',
              ],
          }
        },
        computed:{
            filteredKeys() {
                    return this.keys.filter(key => key !== `Name` && key !== 'imageUrl')
                },
        },
        mounted(){
            var me =this
            this.$EventBus.$on('buy', function (newVal) {
                console.log("buy")
                me.showBuy(newVal);
            })
        },
        methods:{

            showBuy(item) {
                var me = this
                if (item.stock >= 1) {
                    me.$emit('update:buyDialog', true)
                    me.$emit('update:selectItem', item)

                } else {
                    var app = me.$getComponents('App')
                    app.snackbar = true;
                    app.snackbarColor = 'error'
                    app.snackbarMessage = '재고가 없습니다.'
                }
            },
            showDetail(item) {
                this.$router.push('/products/' + item.name);
            },
            showEdit(item) {
                var me = this
                me.$emit('update:editDialog', true)
                me.$emit('update:selectItem', item)
                console.log(item)
            },

        }

    }
</script>

<style scoped>

</style>
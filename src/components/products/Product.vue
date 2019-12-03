<template>
    <v-card>
        <v-img v-if="value.imageUrl" :src="srcDomain" aspect-ratio="2.0" contain>
            <v-col align="start">
            <div style="color: red; font-size: 20px">{{saving}}%</div>
            <div style="color: red;">적립</div>
            </v-col>
        </v-img>

        <v-list dense>
            <v-list-item
                    :key="value.id"
            >
                <v-col>
                    <v-list-item-content>
                        [상품번호-{{value.id}}] &nbsp; {{ value.name }}<br>
                        남은수량:{{value.stock}}
                    </v-list-item-content>
                    <v-list-item-content class="font-weight-black" style="justify-content: flex-end;">
                        {{value.price}} 원
                    </v-list-item-content>
                </v-col>
<!--                <v-list-item-content>{{ key }}:</v-list-item-content>-->
<!--                <v-list-item-content class="align-end">{{ value[key.toLowerCase()] }}</v-list-item-content>-->

            </v-list-item>
            <div align="right">
                <v-btn text v-if=" $route.path != '/' && $store.state.role == 'USER_ADMIN' " @click="showEdit"> Edit</v-btn>
                <v-btn text v-if="$route.path != '/' " @click="showDetail"> DETAIL</v-btn>
                <v-btn text v-if=" $route.path != '/' " @click="showBuy"> BUY</v-btn>
            </div>
        </v-list>
    </v-card>
</template>

<script>
    export default {
        props:{
            value: Object
        },
        data(){
          return{
              keys: [
                  'Id',
                  'Name',
                  'Price',
                  'Stock',
              ],
              saving: 10,
          }
        },
        created () { },
        computed:{
            filteredKeys() {
                    return this.keys.filter(key => key !== `Name` && key !== 'imageUrl')
            },
            srcDomain () {
                if(this.value.imageUrl) {
                    if(this.value.imageUrl.includes("http")){
                        return  this.value.imageUrl
                    }else{
                        return `${API_HOST}`+this.value.imageUrl
                    }
                }
            }

        },
        methods:{
            showBuy() {
                this.$emit('inputBuy', this.value);
            },
            showEdit() {
                this.$emit('inputEdit', this.value)
            },
            showDetail() {
                this.$router.push('/products/' + this.value.name);
            },

        }

    }
</script>

<style scoped>

</style>
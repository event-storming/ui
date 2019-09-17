<template>
    <v-card>
        <v-card-title class="subheading font-weight-bold">{{ value.name }}</v-card-title>

        <v-divider></v-divider>

        <v-img :src="srcDomain" aspect-ratio="1.7" contain></v-img>

        <v-list dense>
            <v-list-item
                    v-for="(key, index) in filteredKeys"
                    :key="index"
            >
                <v-list-item-content>{{ key }}:</v-list-item-content>
                <v-list-item-content class="align-end">{{ value[key.toLowerCase()] }}
                </v-list-item-content>

            </v-list-item>
            <div align="right">
                <v-btn text v-if='$store.state.role == "USER_ADMIN"' @click="showEdit"> Edit</v-btn>
                <v-btn text @click="showDetail"> DETAIL</v-btn>
                <v-btn text @click="showBuy"> BUY</v-btn>
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
          }
        },
        created () {
        },
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
<template>
    <v-card
            class="mx-auto"
            outlined
    >
        <v-list-item three-line>
            <v-list-item-content>
                <div class="overline mb-4">상품 정보</div>
                <v-list-item-title class="headline mb-1">{{value.name}}</v-list-item-title>
                <v-list-item-subtitle>가격 : {{value.price}}</v-list-item-subtitle>
                <v-list-item-subtitle>재고수량 : {{value.stock}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
                    tile
                    size="80"
            >
                <img
                        :src="srcDomain"
                        alt="avatar"
                >
            </v-list-item-avatar>
        </v-list-item>
    </v-card>
</template>

<script>
    export default {
        name: "ProductSimple",
        data: () => ({}),
        props: {
            value: Object
        },
        computed : {
            srcDomain () {
                if(this.value.imageUrl.includes("http")){
                    return  this.value.imageUrl
                }else{
                    return `${API_HOST}`+this.value.imageUrl
                }
            }
        },
        created() {
        },
    }
</script>

<style scoped>

</style>

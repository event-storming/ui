<template>
    <v-card
            class="mx-auto"
            outlined
    >
        <v-list-item three-line>
            <v-list-item-content>
                <div class="overline mb-4">상품 정보</div>
                <v-list-item-title class="headline mb-1">{{productInfo.name}}</v-list-item-title>
                <v-list-item-subtitle>가격 : {{productInfo.price}}</v-list-item-subtitle>
                <v-list-item-subtitle>재고수량 : {{productInfo.stock}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
                    tile
                    size="80"
            >
                <img
                        :src="productInfo.imageUrl"
                        alt="avatar"
                >
            </v-list-item-avatar>
        </v-list-item>
    </v-card>
</template>

<script>
    export default {
        name: "ProductSimple",
        props: {
            productInfo: Object
        }
    }
</script>

<style scoped>

</style>

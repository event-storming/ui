<template>
    <!-- Navi Info Start -->
    <v-card
            color="grey lighten-4"
            class="mx-auto"
            outlined
            v-if="$store.state.login && isNavi"
    >
        <v-list-item three-line>
            <v-list-item-content>
                <div class="overline mb-4">User Info</div>
                <v-list-item-title class="font-weight-bold subtitle-1"> {{$store.state.nickname}}</v-list-item-title>
                <v-list-item-subtitle>{{$store.state.money}} ₩</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
                    tile
                    size="80"
                    color="grey"
            ></v-list-item-avatar>
        </v-list-item>
    </v-card>
    <!-- Navi Info End -->
    <!-- Mypage Info Start -->
    <v-card
            class="mx-auto"
            outlined
            v-else-if="$store.state.login && !isNavi"
    >
        <v-list-item three-line>
            <v-list-item-content>
                <div class="overline mb-4">user Info</div>
                <v-list-item-title class="headline mb-1"> {{$store.state.nickname}}</v-list-item-title>
                <v-list-item-subtitle> 잔액 : {{$store.state.money}} ₩</v-list-item-subtitle>
                <v-list-item-subtitle> 주소 : {{$store.state.address}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
                    tile
                    size="80"
                    color="grey"
            ></v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="red accent-4" text>수정하기</v-btn>
        </v-card-actions>
    </v-card>
    <!-- Mypage Info End -->

</template>

<script>
    export default {
        name: "MyPage",
        props: {
            isNavi: Boolean
        },
        data() {
            return {}
        },
        watch: {}
    }
</script>

<style scoped>

</style>

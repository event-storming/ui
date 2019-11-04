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
                <v-list-item-subtitle > 마일리지 : {{ $store.state.mileage }} M</v-list-item-subtitle>
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
        <v-card-title >유저 정보</v-card-title>
        <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-title class="headline mb-1"> {{$store.state.nickname}}</v-list-item-title>
                <v-list-item-subtitle> 마일리지 : {{ $store.state.mileage }} M</v-list-item-subtitle>
                <v-list-item-subtitle> 주소 : {{$store.state.address}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
                    tile
                    size="80"
                    color="grey"
            ></v-list-item-avatar>
        </v-list-item>

        <!--<v-card-actions>-->
            <!--<div class="flex-grow-1"></div>-->
            <!--&lt;!&ndash;<v-btn color="red accent-4" text>수정하기</v-btn>&ndash;&gt;-->
        <!--</v-card-actions>-->
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
        mounted(){
            // this.$nextTick(function () {
            //
            // })
        },
        created(){
            this.callUser();

        },
        methods: {
            callUser() {
                var me = this
                me.$http.get(`${API_HOST}/users/${localStorage.getItem('userId')}`).then(function (e) {
                    console.log(e)
                    me.$store.state.nickname = e.data.nickname
                    me.$store.state.address = e.data.address
                    localStorage.setItem("nickname", e.data.nickname)
                    localStorage.setItem("address", e.data.address)
                })
            }
        },
        watch: {}
    }
</script>

<style scoped>

</style>

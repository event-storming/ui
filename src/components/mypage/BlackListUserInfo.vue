<template>
    <v-card
            class="mx-auto"
            outlined
    >
        <v-card-title>블랙 리스트</v-card-title>
        <v-data-table
                :loading="loadData"
                loading-text="Loading... Please wait"
                :headers="headers"
                :items="blackUserList"
                sort-by="calories"
                class="elevation-1"
        >

        </v-data-table>
    </v-card>
</template>

<script>
    export default {
        data: () => ({
            loadData: false,
            headers: [
                {
                    text: '성명',
                    align: 'left',
                    sortable: false,
                    value: 'nickname',
                },
                {
                    text: '주소',
                    align: 'left',
                    sortable: false,
                    value: 'address',
                },
                {text: 'E-mail', value: 'email', align: 'center'},
                {text: '총 결제금액', value: 'mileage', align: 'center'},
                {text: '구매 횟수', value: 'quantity', align: 'center'},
                {text: '권한', value: 'role', align: 'center'},
            ],
            blackUserList: [],
            se: [],
        }),
        computed: {},
        watch: {},
        created() {},
        mounted() {
            this.getBleckUserList();
        },
        methods: {
            getEmail(link){
                var array = link.split("/");
                return array[array.length-1];
            },
            getBleckUserList() {
                var me = this
                this.$http.get(`${API_HOST}/users`).then(function (e) {
                         me.blackUserList = e.data._embedded.users
                         me.blackUserList.map( item => item.email = me.getEmail(item._links.self.href))
                    })
            },
        },
    }
</script>

<style scoped>

</style>
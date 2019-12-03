<template>
    <v-container class="grey lighten-5">
        <user-info
            :is-navi=false
        ></user-info>
<!--        <order-list v-if=show style="margin-top: 10px;"></order-list>-->
<!--        <black-list-user-info v-else style="margin-top: 10px;" ></black-list-user-info>-->

        <order-list-mashup style="margin-top: 10px;"></order-list-mashup>
<!--        <black-list-user-info v-if=" $store.state.role == 'USER_ADMIN' " style="margin-top: 10px;" ></black-list-user-info>-->
    </v-container>
</template>

<script>
    export default {
        data: () => ({}),
        mounted() {},
        methods:{},
    };
</script>

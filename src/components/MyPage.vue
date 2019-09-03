<template>

    <v-container class="grey lighten-5">
        <user-info
            :is-navi=false
        ></user-info>
        <order-list style="margin-top: 10px;"></order-list>
    </v-container>
</template>

<script>
    export default {
        data: () => ({

        }),
    };
</script>

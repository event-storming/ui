<template>
    <v-container class="grey lighten-5">
        <user-info
            :is-navi=false
        ></user-info>
<!--        <order-list v-if=show style="margin-top: 10px;"></order-list>-->
<!--        <black-list-user-info v-else style="margin-top: 10px;" ></black-list-user-info>-->

        <order-list style="margin-top: 10px;"></order-list>
        <black-list-user-info style="margin-top: 10px;" ></black-list-user-info>
    </v-container>
</template>

<script>
    import BlackListUserInfo from "./BlackListUserInfo";
    export default {
        components: {BlackListUserInfo},
        data: () => ({
          show : true
        }),
        mounted() {
            this.getShow()
        },
        methods:{
            getShow(){
                var me = this
                    me.$EventBus.$on('show',function(newval){
                        console.log(newval)
                        me.show=newval
                    })
            }

        },
    };
</script>

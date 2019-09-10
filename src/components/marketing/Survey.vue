<template>
    <survey-form
    :orderData="orderData"
    >
    </survey-form>
</template>

<script>
    export default {
        data: () => ({
            orderData: {},
        }),
        created() {
            this.orderData=this.$route.params;
        },
    }
</script>

<style scoped>

</style>
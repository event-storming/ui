<template>
    <survey-form
        v-model="value"
    >
    </survey-form>
</template>

<script>
    export default {
        data: () => ({
            value: {},
        }),
        created() {
            this.value=this.$route.params;
        },
    }
</script>

<style scoped>

</style>

<template>
    <v-container fluid >
            <v-dialog
                    v-model="buyDialog"
                    width="800"
            >
                <order
                        v-if="buyDialog"
                        v-model="buy"
                        @cancel="buyDialog=false"
                ></order>
            </v-dialog>

            <v-dialog
                    v-model="editDialog"
                    width="500"
            >
                <product-add
                        v-if="editDialog"
                        v-model="edit"
                        @cancel="editDialog=false"
                ></product-add>
            </v-dialog>

<!--        <v-card flat v-if="$store.state.login == true">-->
<!--            <product-recommend-->
<!--                    style="background-color:#E8F5E9; height: auto"-->
<!--                    @buyItem="buyValue"-->
<!--                    @editItem="editValue"-->
<!--            ></product-recommend>-->
<!--        </v-card>-->

        <v-card flat>
            <product-list
                    @buyItem="buyValue"
                    @editItem="editValue"
            ></product-list>
        </v-card>

    </v-container>

</template>

<script>
    export default {
        props:{
        },
        data() {
            return {
                buy:'',
                edit:'',
                buyDialog: false,
                editDialog: false,
            }
        },
        methods:{
            buyValue(item){
                this.buy=item
                this.buyDialog = true
            },
            editValue(item){
                this.edit=item
                this.editDialog = true
            }

        },
        created() {
        }

    }
</script>

<style scoped>

</style>
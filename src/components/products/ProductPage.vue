<template>
    <v-container fluid>
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

        <v-card flat v-if="$store.state.login == true">
            <div style="font-size:30px; font-style: revert"><br>추천 상품</div>
            <product-recommend
                    @buyItem="buyValue"
                    @editItem="editValue"
            ></product-recommend>
        </v-card>

        <v-card flat>
            <div style="font-size:30px; font-style: revert"><br>일반 상품</div>
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

        }

    }
</script>

<style scoped>

</style>
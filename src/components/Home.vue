<template>
<!--  <v-container>-->
<!--    <v-dialog-->
<!--            v-model="buyDialog"-->
<!--            width="800"-->
<!--    >-->
<!--      <order-->
<!--              v-if="buyDialog"-->
<!--              v-model="buy"-->
<!--              @cancel="buyDialog=false"-->
<!--      ></order>-->
<!--    </v-dialog>-->

<!--    <v-dialog-->
<!--            v-model="editDialog"-->
<!--            width="500"-->
<!--    >-->
<!--      <product-add-->
<!--              v-if="editDialog"-->
<!--              v-model="edit"-->
<!--              @cancel="editDialog=false"-->
<!--      ></product-add>-->
<!--    </v-dialog>-->

<!--    <product-list-->
<!--            @buyItem="buyValue"-->
<!--            @editItem="editValue"-->
<!--    ></product-list>-->
<!--  </v-container>-->
</template>
<style>
  h1, h2 {
  }
</style>
<script>
export default {
    data() {
        return {
            buy: '',
            edit: '',
            buyDialog: false,
            editDialog: false
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

};
</script>


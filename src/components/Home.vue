<template>
    <v-container>
        <v-card flat>
            <v-row justify="center">
                <ProductAds/>
            </v-row>
        </v-card>
        <v-card flat>
            <product-List></product-List>
        </v-card>
    </v-container>
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

<style>

    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
    body {
        margin: 0px;
    }

</style>
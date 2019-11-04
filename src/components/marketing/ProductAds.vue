<template>
       <v-card flat width="30%" height="30%">
                <transition-group  tag="div">
                    <div
                            v-for="i in [currentIndex]" :key="i"
                    >
                        <product
                                v-if="currentProduct.imageUrl"
                                v-model=currentProduct
                        ></product>
                    </div>
                </transition-group>
       </v-card>
</template>

<script>
    export default {
        data() {
            return {
                timer: null,
                currentIndex: 0,
                items:[]
            };
        },

        mounted() {
                this.startSlide();
                this.getProdList();

        },

        methods: {
            startSlide: function() {
                this.timer = setInterval(this.next, 8000);
            },
            next: function() {
                this.currentIndex += 1;
            },
            prev: function() {
                this.currentIndex -= 1;
            },
            getProdList() {
                var me = this
                if(`${API_HOST}` == 'undefined')
                    window.API_HOST = localStorage.getItem('api_host')

                me.$http.get(`${API_HOST}/products`).then(function (e) {
                    me.items = e.data._embedded.products;
                })

            },

        },

        computed: {
            currentProduct: function() {
                return this.items[Math.abs(this.currentIndex) % this.items.length];
            }
        }
    };
</script>

<style scoped>

</style>
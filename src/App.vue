<template>
    <v-app id="keep">

        <v-app-bar
                app
                clipped-left
                color="amber"
        >
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-btn text  @click="$router.push('/')"><span class="title ml-3 mr-5">12&nbsp;<span class="font-weight-light">Street</span></span></v-btn>
            <v-text-field
                    v-if="$route.path == '/products'"
                    v-model="productSearch"
                    solo-inverted
                    flat
                    hide-details
                    label="Search"
                    prepend-inner-icon="search"
                    style="padding-left: 10px"
            ></v-text-field>

            <div class="flex-grow-1"></div>
            <v-btn text v-if="$route.path == '/products' && $store.state.login == true" @click="repositoryDialog = true"  >상품추가</v-btn>
            <v-btn text v-if="$route.path == '/products' && $store.state.login == true" @click="deleteDialog = true"  >상품삭제</v-btn>
<!--            <v-btn text-->
<!--                   v-if="$route.path == '/mypage' && oderBlackList && $store.state.login == true "-->
<!--                   @click="pageList()"-->
<!--                   style="background: red;" >블랙리스트</v-btn>-->
<!--            <v-btn text-->
<!--                   v-if="$route.path == '/mypage' && !oderBlackList && $store.state.login == true "-->
<!--                   @click="pageList()"  >구매리스트</v-btn>-->
            <v-btn text @click="dialog = true" v-if="$store.state.login == false">Login</v-btn>
            <v-btn text @click="logout" v-else>Logout</v-btn>
            <!--<v-btn text>-->
            <!--<v-icon>perm_identity</v-icon>-->
            <!--</v-btn>-->
        </v-app-bar>

        <v-navigation-drawer
                v-model="drawer"
                app
                clipped
                color="grey lighten-4"
        >
            <v-list
                    dense
                    class="grey lighten-4"
            >
                <user-info
                        :is-navi=true
                ></user-info>
                <v-divider
                        dark
                        class="my-4"
                        v-if="$store.state.login"
                ></v-divider>
                <template v-for="(item, i) in items">
                    <v-row
                            v-if="item.heading"
                            :key="i"
                            align="center"
                    >
                        <v-col cols="6">
                            <v-subheader v-if="item.heading">
                                {{ item.heading }}
                            </v-subheader>
                        </v-col>
                    </v-row>
                    <v-divider
                            v-else-if="item.divider"
                            :key="i"
                            dark
                            class="my-4"
                    ></v-divider>
                    <v-list-item
                            v-else
                            :key="i"
                            :to="item.routelink"
                            replace
                    >
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class="grey--text">
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
                <v-list-item
                        v-if="$store.state.login"
                        to='/mypage'
                        replace
                >
                    <v-list-item-action>
                        <v-icon>perm_identity</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="grey--text">
                            My Page
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </v-list>
        </v-navigation-drawer>

        <v-dialog
                v-model="dialog"
                width="500"
                persistent
        >
            <Login
                    :dialog.sync="dialog"
            ></Login>
        </v-dialog>

        <v-dialog
                v-model="repositoryDialog"
                width="500"
                persistent
        >
            <product-repository
                    :repositoryDialog.sync="repositoryDialog"
                    :edit=false>
            </product-repository>
        </v-dialog>

        <v-dialog
                v-model="deleteDialog"
                width="500"
                persistent
        >
            <product-delete
                    :deleteDialog.sync="deleteDialog"
            ></product-delete>
        </v-dialog>

        <v-snackbar
                v-model="snackbar"
                :color="snackbarColor"
                right
                :timeout="6000"
                top
        >
            {{snackbarMessage}}
            <v-btn
                    dark
                    text
                    @click="snackbar = false"
            >
                Close
            </v-btn>
        </v-snackbar>

        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: 'App',
        props: {
            source: String,
        },
        data: () => ({
            drawer: null,
            dialog: false,
            repositoryDialog: false,
            deleteDialog: false,
            oderBlackList:false,
            items: [
                {icon: 'home', text: 'Home', routelink: '/'},
                {icon: 'shopping_cart', text: 'Products', routelink: '/products'},
            ],
            snackbar: false,
            snackbarColor: '',
            snackbarMessage : '',
            productSearch: '',
        }),
        mounted() {
            if (localStorage.getItem('accessToken') != null) {
                this.$store.state.login = true;
                this.$store.state.nickname = localStorage.getItem('nickname');
                this.$store.state.money = localStorage.getItem('money');
                this.$store.state.address = localStorage.getItem('address');
                this.$store.state.accessToken = localStorage.getItem('accessToken');
            }
        },
        watch: {
            productSearch(newVal) {
                this.$EventBus.$emit('search', newVal)
            }
        },
        methods: {
            logout: function () {
                var me = this
                me.$store.dispatch('logout')
                this.$router.push('/')
            },
        }
    }
</script>

<style>
    #keep .v-navigation-drawer__border {
        display: none
    }
</style>

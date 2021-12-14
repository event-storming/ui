<template>
    <v-app id="keep">

        <v-app-bar
                app
                clipped-left
                color="red"
        >
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-btn text  @click="$router.push('/')"><span class="title ml-3 mr-5">12&nbsp;<span class="font-weight-light">Street</span></span></v-btn>
            <v-text-field
                    v-if="$route.path == '/products'"
                    v-model="productSearch"
                    solo-inverted
                    text
                    hide-details
                    label="Search"
                    prepend-inner-icon="search"
                    style="padding-left: 10px;"
            ></v-text-field>

            <div class="flex-grow-1"></div>

            <v-menu offset-y
                    v-if='$store.state.login == true'
            >
                <template v-slot:activator="{ on }">
                    <v-btn
                            text
                            dark
                            v-on="on"
                            style="color: #2c3e50"
                    >
                        <v-icon style="color: black; size: 10px">fas fa-list</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item
                            v-for="(menu, index) in menus"
                            :key="index"
                            @click="action(menu.id)"
                    >
                        <v-icon style="padding-right: 5px">{{menu.icon}}  </v-icon>
                        <v-list-item-title >{{ menu.title }} </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-btn text  @click="loginDialog = true" v-if="$store.state.login == false">Login</v-btn>
            <v-btn v-else text  @click="logout">Logout</v-btn>
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
                        to='/mypagecqrs'
                        replace
                >
                    <v-list-item-action>
                        <v-icon>perm_identity</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="grey--text">
                            My Page(CQRS)
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item
                        v-if="$store.state.login"
                        to='/mypagemashup'
                        replace
                >
                    <v-list-item-action>
                        <v-icon>perm_identity</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="grey--text">
                            My Page(UI mashup)
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </v-list>
        </v-navigation-drawer>

        <v-dialog
                v-model="loginDialog"
                width="500"
        >
            <Login
                    v-model="loginDialog"
                    @success="loginDialog = false"
            ></Login>
        </v-dialog>

        <v-dialog
                v-model="addDialog"
                width="500"
        >
            <product-add
                    v-model="value"
                    @cancel="addDialog=false"
            ></product-add>
        </v-dialog>



        <v-dialog
                v-model="deleteDialog"
                width="500"
                persistent
        >
            <product-delete
                    v-if="deleteDialog"
                    @cancel="deleteDialog=false"
            ></product-delete>
        </v-dialog>

        <v-snackbar
                v-model="snackbar"
                :color="snackbarColor"
                :right="snackbarPosition"
                :timeout="4000"
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
            value:Object
        },
        data: () => ({
            drawer: null,
            loginDialog: false,
            addDialog: false,
            deleteDialog: false,
            oderBlackList:false,
            items: [
                {icon: 'home', text: 'Home', routelink: '/'},
                {icon: 'shopping_cart', text: 'Products', routelink: '/products'},
            ],
            snackbar: false,
            snackbarColor: '',
            snackbarMessage : '',
            snackbarPosition: true,
            productSearch: '',
            menus:[
                {id:1 ,icon:'mdi-arrow-up-bold-box-outline', title:'상품 등록'},
                {id:2 ,icon:'mdi-arrow-down-bold-box-outline', title:'상품 삭제'},
            ]
        }),
        created() {
            // window.addEventListener('beforeunload', this.handler)
            if (localStorage.getItem('accessToken') != null) {
                this.$store.state.login = true;
                this.$store.state.nickname = localStorage.getItem('nickname');
                this.$store.state.mileage = localStorage.getItem('mileage');
                this.$store.state.address = localStorage.getItem('address');
                this.$store.state.accessToken = localStorage.getItem('accessToken');
                this.$store.state.role = localStorage.getItem('role');
                this.$store.state.userId = localStorage.getItem('userId')
                this.$http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
            }else{
                this.loginDialog = true
            }
        },
        mounted() {
        },
        watch: {
            productSearch(newVal) {
                this.$EventBus.$emit('search', newVal)
            }
        },
        methods: {
            handler: function handler(event) {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('nickname')
                localStorage.removeItem('mileage')
                localStorage.removeItem('address')
                localStorage.removeItem('role')
                localStorage.removeItem('userId')
            },
            logout: function () {
                var me = this
                me.$store.dispatch('logout')
                this.$router.push('/')
            },
            action(select){
                if(select == '1'){
                    this.addDialog= true;
                }else if(select == '2'){
                    this.deleteDialog= true;
                }
            }
        }
    }
</script>

<style>
    #keep .v-navigation-drawer__border {
        display: none
    }
</style>

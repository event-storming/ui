<template>
    <v-card class="elevation-12">
        <v-toolbar
                flat
        >
            <v-toolbar-title>Login</v-toolbar-title>
            <div class="flex-grow-1"></div>
        </v-toolbar>
        <v-card-text>

           <v-card flat style="padding: 15px">
               <v-row align="center" justify="center">
               <v-btn flat >GOOGLE</v-btn>
                   <div class="pa-2"></div>
               <v-btn flat >FACEBOOK</v-btn>
               </v-row>
           </v-card>

           <v-divider> </v-divider>

            <v-form>
                <v-text-field
                        label="Login"
                        name="login"
                        prepend-icon="person"
                        type="text"
                        v-model="userId"
                ></v-text-field>

                <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        prepend-icon="lock"
                        type="password"
                        v-model="userPw"
                ></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn block  color="green" @click="login">Login</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    // import VNumberSmarty from 'vuetify-number-smarty';

    export default {
        components: {
            // VNumberSmarty,
        },
        props: {
            source: String,
            dialog: Boolean
        },
        data: () => ({
            drawer: null,
            userId: '1@uengine.org',
            userPw: '1'
        }),
        methods: {
            login: function () {
                var me = this;
                let userId = me.userId;
                let userPw = me.userPw;
                me.$store.dispatch('login', { userId , userPw } )
                    .then(function() {
                        me.$emit('update:dialog', false)
                    })
                    // .catch(({message}) => this.msg = message)
            },
        }
    }
</script>

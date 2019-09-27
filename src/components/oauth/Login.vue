<template>
    <v-card class="elevation-12">
        <v-toolbar
                flat
        >
            <v-toolbar-title>Login</v-toolbar-title>
            <div class="flex-grow-1"></div>
        </v-toolbar>


        <v-card-text>
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

        <v-card-actions style="padding-bottom: 10px;">
            <v-btn block  color="green" @click="login">Login</v-btn>
        </v-card-actions>

        <v-divider></v-divider>
        <v-card flat>
            <v-col  justify="center" align="center" >
                <v-btn
                        color="#3c82f7"
                        style="width: 200px; font-size: 13px; color: white; "
                        @click="snsLogin('google')">
                    Sign in with Google
                </v-btn>
                <div class="pa-2"></div>
                <v-btn
                        color="#4267b2"
                        style="width: 200px; font-size: 13px; color: white; "
                        @click="snsLogin('faceBook')">
                    Sign in with Facebook
                </v-btn>
            </v-col>
        </v-card>
    </v-card>
</template>

<script>
    import { mdbBtn } from 'mdbvue';
    export default {
        components: {
            mdbBtn
        },
        props: {
            source: String,
        },
        data: () => ({
            drawer: null,
            userId: '1@uengine.org',
            userPw: '1',
            // googleSignInParams: {
            //     client_id: 'YOUR_APP_CLIENT_ID.apps.googleusercontent.com'
            // },
            // fbSignInParams: {
            //     scope: 'email,user_likes',
            //     return_scopes: true
            // }
        }),
        methods: {
            login: function () {
                var me = this;
                let userId = me.userId;
                let userPw = me.userPw;
                localStorage.setItem('userId', userId)
                me.$store.dispatch('login', { userId , userPw } )
                    .then(function() {
                        me.$emit('success',false);
                    })
                    // .catch(({message}) => this.msg = message)
            },
            snsLogin(who){

                var me =this
                var app = me.$getComponents('App')

                if(who == 'google'){
                    app.snackbar = true;
                    app.snackbarColor = 'error'
                    app.snackbarMessage = 'Google 로그인 서비스는 준비중입니다.'
                    app.snackbarPosition=false
                }else if(who=='facebook'){
                    app.snackbar = true;
                    app.snackbarColor = 'info'
                    app.snackbarMessage = 'FaceBook 로그인 서비스는 준비중입니다.'
                    app.snackbarPosition=false
                }

            },

        }
    }
</script>

<style>
    .login-button{
        display: inline-block;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: #3c82f7;
        color: #fff;
        box-shadow: 0 3px 0 #0f69ff;
    }

    .g-signin-button {
        padding: 4px 8px;
        border-radius: 3px;
        background-color: #3c82f7;
        color: #ffffff;
        width: 200px;
    }

    .fb-signin-button {
        /* This is where you control how the button looks. Be creative! */
        display: inline-block;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: #4267b2;
        color: #fff;
        width: 200px;
    }

</style>
<template>
    <v-card class="elevation-12">
        <v-toolbar
                flat
        >
            <v-toolbar-title>Login</v-toolbar-title>
            <div class="flex-grow-1"></div>
        </v-toolbar>


        <v-card-text>
           <v-card flat >
               <v-col  justify="center" align="center" >
                   <v-btn
                           style="display: inline-block;
                            padding: 4px 8px;
                            border-radius: 3px;
                            background-color: #3c82f7;
        color: #fff;
        box-shadow: 0 3px 0 #0f69ff;
        width: auto;"
                            @click="">
                       Sign in with Google
                   </v-btn>
                   <div class="pa-2"></div>
                   <fb-signin-button
                           @click="">
                       Sign in with Facebook
                   </fb-signin-button>
               </v-col>

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
            googleSignInParams: {
                client_id: 'YOUR_APP_CLIENT_ID.apps.googleusercontent.com'
            },
            fbSignInParams: {
                scope: 'email,user_likes',
                return_scopes: true
            }
        }),
        methods: {
            login: function () {
                var me = this;
                let userId = me.userId;
                let userPw = me.userPw;
                me.$store.dispatch('login', { userId , userPw } )
                    .then(function() {
                        me.$emit('success',false);
                    })
                    // .catch(({message}) => this.msg = message)
            },
            onSignInSuccess (googleUser) {
                // `googleUser` is the GoogleUser object that represents the just-signed-in user.
                // See https://developers.google.com/identity/sign-in/web/reference#users
                const profile = googleUser.getBasicProfile() // etc etc

            },
            onSignInError (error) {
                // `error` contains any error occurred.
                console.log('OH NOES', error)
            },
            onSignFaceBookSuccess (response) {
                FB.api('/me', dude => {
                    console.log(`Good to see you, ${dude.name}.`)
                })
            },
            onSignFaceBookError (error) {
                console.log('OH NOES', error)
            }

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
        /* This is where you control how the button looks. Be creative! */
        display: inline-block;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: #3c82f7;
        color: #fff;
        box-shadow: 0 3px 0 #0f69ff;
        width: auto;
    }

    .fb-signin-button {
        /* This is where you control how the button looks. Be creative! */
        display: inline-block;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: #4267b2;
        color: #fff;
        width: auto;
    }

</style>
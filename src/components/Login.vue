<template>
    <v-card class="elevation-12">
        <v-toolbar
                color="amber"
                flat
        >
            <v-toolbar-title>Login form</v-toolbar-title>
            <div class="flex-grow-1"></div>
        </v-toolbar>
        <v-card-text>
            <v-form>
                <v-text-field
                        label="Login"
                        name="login"
                        prepend-icon="person"
                        type="text"
                ></v-text-field>

                <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        prepend-icon="lock"
                        type="password"
                ></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary">Login</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        props: {
            source: String,
        },
        data: () => ({
            drawer: null,
        }),
    }
</script>

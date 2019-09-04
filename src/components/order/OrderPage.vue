<template>
    <v-card flat>
        <v-card-text>
            <form>
                <v-text-field
                        v-model="name"
                        :error-messages="nameErrors"
                        :counter="10"
                        label="To"
                        required
                        @input="$v.name.$touch()"
                        @blur="$v.name.$touch()"
                ></v-text-field>
                <v-text-field
                        v-model="address"
                        :error-messages="addressErrors"
                        label="Address"
                        required
                        @input="$v.address.$touch()"
                        @blur="$v.address.$touch()"
                ></v-text-field>
                <v-text-field v-model="phoneNumber"
                              v-mask="'###-####-####'"
                              label="PhoneNumber"
                              required
                ></v-text-field>
                <!--<the-mask mask="###-####-####" v-model="phoneNumber" type="tel" :masked=true placeholder="test your mask here"></the-mask>-->
                <!--<v-btn class="mr-4" @click="submit">submit</v-btn>-->
            </form>
        </v-card-text>
    </v-card>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {required, maxLength, email} from 'vuelidate/lib/validators'

    export default {
        mixins: [validationMixin],

        validations: {
            name: {required, maxLength: maxLength(10)},
            address: {required, email},
        },

        data: () => ({
            name: '',
            address: '',
            phoneNumber: ''
        }),

        computed: {
            nameErrors() {
                const errors = []
                if (!this.$v.name.$dirty) return errors
                !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
                !this.$v.name.required && errors.push('Name is required.')
                return errors
            },
            addressErrors() {
                const errors = []
                if (!this.$v.address.$dirty) return errors
                !this.$v.email.required && errors.push('Address is required')
                return errors
            },
        },

        methods: {
            submit() {
                this.$v.$touch()
            }
        },
    }
</script>

<style scoped>

</style>

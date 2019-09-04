<template>
    <v-card flat>
        <v-card-title>
            <!--{{ productInfo.name }} 결제 정보 작성-->
        </v-card-title>
        <v-card-text>
            <product-simple
                    :productInfo="productInfo"
            ></product-simple>
            <form>
                <v-row>
                    <v-col cols="15" sm="3" md="3">
                        <v-text-field
                                v-model="name"
                                :error-messages="nameErrors"
                                :counter="10"
                                label="To"
                                required
                                @input="$v.name.$touch()"
                                @blur="$v.name.$touch()"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="15" sm="3" md="6">
                        <v-text-field
                                v-model="address"
                                :error-messages="addressErrors"
                                label="Address"
                                required
                                @input="$v.address.$touch()"
                                @blur="$v.address.$touch()"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="15" sm="3" md="4">
                        <v-text-field
                                v-model="phoneNumber"
                                v-mask="'###-####-####'"
                                label="PhoneNumber"
                                :error-messages="phoneNumberErrors"
                                required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="15" sm="3" md="3">
                        <number-input v-model="qty" :min="1" :max="10" inline controls></number-input>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="15" sm="3" md="3">
                        <v-text-field
                                v-model="amount"
                                disabled
                                shaped
                                label="예상결제금액"
                                outlined
                        ></v-text-field>
                    </v-col>
                    <div style="margin-top: 26px;"> +</div>
                    <v-col cols="12" sm="6" md="2">
                        <v-text-field
                                value="2500"
                                disabled
                                shaped
                                label="배송비"
                                outlined
                        ></v-text-field>
                    </v-col>
                    <div style="margin-top: 26px;"> =</div>
                    <v-col cols="12" sm="6" md="3">
                        <v-text-field
                                v-model="totalAmount"
                                disabled
                                shaped
                                label="예상결제금액"
                                outlined
                        ></v-text-field>
                    </v-col>
                </v-row>
                <!--<the-mask mask="###-####-####" v-model="phoneNumber" type="tel" :masked=true placeholder="test your mask here"></the-mask>-->
                </v-row>
            </form>
            <div class="flex-grow-1"></div>
            <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="red accent-4" text>수정하기</v-btn>
            </v-card-actions>
        </v-card-text>
    </v-card>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {required, maxLength, email} from 'vuelidate/lib/validators'

    export default {
        mixins: [validationMixin],
        props: {
            productInfo: Object,
            dialog: Boolean
        },
        validations: {
            name: {required, maxLength: maxLength(10)},
            address: {required, email},
            phoneNumber: {required}
        },
        data: () => ({
            card: '',
            name: '',
            address: '',
            phoneNumber: '',
            amount: 0,
            qty: 1
        }),
        mounted() {
            this.name = this.$store.state.nickname
            this.address = this.$store.state.address

        },
        computed: {
            totalAmount() {
                return this.amount + 2500
            },
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
                !this.$v.address.required && errors.push('Address is required')
                return errors
            },
            phoneNumberErrors() {
                const errors = []
                if (!this.$v.phoneNumber.$dirty) return errors
                !this.$v.phoneNumber.required && errors.push('phoneNumber is required')
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

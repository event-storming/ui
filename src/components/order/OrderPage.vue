<template>
    <v-card flat>
        <v-overlay
                absolute
                :value="overlay"
        >
            <v-progress-circular
                    indeterminate
                    color="primary"
            ></v-progress-circular>
        </v-overlay>
        <v-card-title>
            <!--{{ productInfo.name }} 결제 정보 작성-->
        </v-card-title>
        <v-card-text>
            <product-simple
                    :productInfo="productInfo"
            ></product-simple>
            <v-card
                    class="mx-auto"
                    outlined
            >
                <form style="margin : 10px;">
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
                        <v-col cols="15" sm="3" md="5">
                            <v-text-field
                                    v-model="address"
                                    :error-messages="addressErrors"
                                    label="Address"
                                    required
                                    @input="$v.address.$touch()"
                                    @blur="$v.address.$touch()"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="15" sm="3" md="4">
                            <v-text-field
                                    v-model="phoneNumber"
                                    v-mask="'###-####-####'"
                                    label="PhoneNumber"
                                    :error-messages="phoneNumberErrors"
                                    required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="15" sm="3" md="3">
                            구매수량
                            <number-input v-model="qty" :min="1" :max="10" inline controls></number-input>
                        </v-col>
                    </v-row>


                    <!--<the-mask mask="###-####-####" v-model="phoneNumber" type="tel" :masked=true placeholder="test your mask here"></the-mask>-->
                </form>
            </v-card>
            <v-row style="margin-top: 5px;">
                <v-col cols="15" sm="3" md="3">
                    <v-text-field
                            v-model="productInfo.price"
                            disabled
                            shaped
                            label="구매금액"
                            outlined
                    ></v-text-field>
                </v-col>
                <div style="margin-top: 26px;"> x</div>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field
                            v-model="qty"
                            disabled
                            shaped
                            label="수량"
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

            <div class="flex-grow-1"></div>
            <v-card-actions>
                <div class="flex-grow-1"></div>
<<<<<<< HEAD
                <v-btn color="red accent-4" text @click="submit()">결제하기</v-btn>
=======
                <v-btn color="primary accent-4" text @click="check()">결제하기</v-btn>
>>>>>>> 0382a9ae150a71eebd5b102cb1e33012923103a7
                <v-btn color="red accent-4" text @click="close()">취소</v-btn>
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
            buyDialog: Boolean,
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
            qty: 1,
            overlay: false,
            snackbar: false
        }),
        mounted() {
            this.name = this.$store.state.nickname
            this.address = this.$store.state.address

        },
        computed: {
            // amount() {
            //     return this.productInfo.price * this.qty
            // },
            totalAmount() {
                return this.productInfo.price * this.qty
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
            close() {
                var me = this
                console.log(me.buyDialog)
                me.$emit('update:buyDialog', false)
                console.log(me.buyDialog)
            },
<<<<<<< HEAD
            submit() {
                var me = this
                console.log(me.card, me.qty,me.name,this.productInfo.price, me.address, me.phoneNumber,me.totalAmount);
                me.$EventBus.$emit('message', this.productInfo, me.address, me.phoneNumber,me.totalAmount);
                this.$router.push('/OrderFinish');

=======
            check() {
                var me = this
                me.$v.$touch();
                me.overlay = true;
                setTimeout(function () {
                    me.postOrder()
                }, 1000);
            },
            postOrder() {
                var me = this
                if ((me.nameErrors.length == 0) && (me.nameErrors.length == 0) && (me.nameErrors.length == 0)) {
                    // http localhost:8081/orders productId=1 quantity=3 customerName="홍길동" customerAddr="서울시"
                    let param = {
                        'productId': me.productInfo.id,
                        'quantity': me.qty,
                        'customerName': localStorage.getItem('userId'),
                        'customerAddr': me.address
                    }
                    me.$http.post(`${API_HOST}/orders`, param).then(function () {
                            setTimeout(function () {
                                me.callUser()
                            }, 1000)
                        }
                    )
                }
            },
            getComponent(componentName) {
                let component = null
                let parent = this.$parent
                while (parent && !component) {
                    if (parent.$options.name === componentName) {
                        component = parent
                    }
                    parent = parent.$parent
                }
                return component
            },
            callUser() {
                var me = this
                var app = me.getComponent('App')
                me.$http.get(`http://localhost:8088/users/${localStorage.getItem('userId')}`).then(function (e) {
                    me.$emit('update:buyDialog', false)
                    app.snackbar = true
                    me.overlay = false
                    me.snackbar = true
                    me.$store.state.nickname = e.data.nickname
                    me.$store.state.money = e.data.money
                    me.$store.state.address = e.data.address
                    console.log(e.data.money)
                    localStorage.setItem("nickname", e.data.nickname)
                    localStorage.setItem("money", e.data.money)
                    localStorage.setItem("address", e.data.address)
                })
>>>>>>> 0382a9ae150a71eebd5b102cb1e33012923103a7
            }
        },
    }
</script>

<style scoped>

</style>

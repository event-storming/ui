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
                                    v-model="userName"
                                    :error-messages="nameErrors"
                                    :counter="10"
                                    label="To"
                                    required
                                    @input="$v.userName.$touch()"
                                    @blur="$v.userName.$touch()"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="15" sm="3" md="5">
                            <v-text-field
                                    v-model="customerAddr"
                                    :error-messages="addressErrors"
                                    label="Address"
                                    required
                                    @input="$v.customerAddr.$touch()"
                                    @blur="$v.customerAddr.$touch()"
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
                            <number-input v-model="quantity" :min="1" :max="productInfo.stock" inline controls></number-input>
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
                            v-model="quantity"
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
                <v-btn color="primary accent-4" text @click="check()">결제하기</v-btn>
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
            userName: {required, maxLength: maxLength(10)},
            customerAddr: {required, email},
        },
        data: () => ({
            card: '',
            userName: '',
            customerAddr: '',
            phoneNumber: '',
            quantity: 1,
            overlay: false,
            snackbar: false
        }),
        mounted() {
            this.userName = this.$store.state.nickname
            this.customerAddr = this.$store.state.address

        },
        computed: {
            // amount() {
            //     return this.productInfo.price * this.qty
            // },
            totalAmount() {
                return this.productInfo.price * this.quantity
            },
            nameErrors() {
                const errors = []
                if (!this.$v.userName.$dirty) return errors
                !this.$v.userName.maxLength && errors.push('userName must be at most 10 characters long')
                !this.$v.userName.required && errors.push('userName is required.')
                return errors
            },
            addressErrors() {
                const errors = []
                if (!this.$v.customerAddr.$dirty) return errors
                !this.$v.customerAddr.required && errors.push('deliveryAddress is required')
                return errors
            },
            phoneNumberErrors() {
                const errors = []
                if (!this.$v.phoneNumber) return errors
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
                if ((me.nameErrors.length == 0) && (me.addressErrors.length == 0) && (me.nameErrors.length == 0)) {
                    // http localhost:8081/orders productId=1 quantity=3 customerName="홍길동" customerAddr="서울시"
                    let param = {
                        'productId': me.productInfo.id,
                        'quantity': me.quantity,
                        'customerId': localStorage.getItem('userId'),
                        'customerName': localStorage.getItem('nickname'),
                        'customerAddr': me.customerAddr
                    }
                    me.$http.post(`${API_HOST}/orders`, param).then(function () {
                        setTimeout(function () {
                            me.callUser()
                        }, 1000)
                    })
                }
            },
            callUser() {
                var me = this
                var app = me.$getComponents('App')
                me.$http.get(`${API_HOST}/users/${localStorage.getItem('userId')}`).then(function (e) {
                    me.$emit('update:buyDialog', false)
                    me.overlay = false
                    app.snackbar = true;
                    app.snackbarColor= 'success'
                    app.snackbarMessage = '구매 완료 하였습니다.'
                    me.$store.state.nickname = e.data.nickname
                    me.$store.state.money = e.data.money
                    me.$store.state.address = e.data.address
                    console.log(me.$store);
                    console.log(e.data.money)
                    localStorage.setItem("nickname", e.data.nickname)
                    localStorage.setItem("money", e.data.money)
                    localStorage.setItem("address", e.data.address)
                    var data = {
                        'productInfo' :  me.productInfo,
                        'customerAddr': me.customerAddr,
                        'phoneNumber': me.phoneNumber,
                        'quantity':me.quantity,
                        'totalAmount': me.totalAmount
                    }
                    me.$router.push({name: 'orderfinish', params: data});
                    // me.$EventBus.$emit('message', JSON.parse(JSON.stringify(data)));
                })
            }
        },
    }
</script>

<style scoped>

</style>
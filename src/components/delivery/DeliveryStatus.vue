<template>
    <v-card flat>
        <v-card-title class="title">{{ prodName }}</v-card-title>
        <v-card-text>
            <v-timeline>
                <v-timeline-item
                        v-for="(year, i) in years"
                        :key="i"
                        :color="year.color"
                        small
                >
                    <template v-slot:opposite>
        <span
                :class="`headline font-weight-bold ${year.color}--text`"
                v-text="year.year"
        ></span>
                    </template>
                </v-timeline-item>
            </v-timeline>
        </v-card-text>
    </v-card>

</template>

<script>
    export default {
        name: "DeliveryStatus",
        props: {
            prodName: String
        },
        data: () => ({
            years: [
                {
                    color: 'cyan',
                    year: '1960',
                },
                {
                    color: 'green',
                    year: '1970',
                },
                {
                    color: 'pink',
                    year: '1980',
                },
                {
                    color: 'amber',
                    year: '1990',
                },
                {
                    color: 'orange',
                    year: '2000',
                },
            ],
        }),
        mounted() {
            this.getStatus()
        },
        methods: {
            getStatus() {
                this.$http.get(`${API_HOST}/mypage/order/${this.$store.state.userId}`).then(function (e) {
                    console.log(e)
                })
            }
        }
    }
</script>

<style scoped>

</style>

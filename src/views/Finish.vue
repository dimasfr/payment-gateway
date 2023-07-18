<template>
    <div class="finish">
        <div class="finish__grid">
            <div class="finish__details">
                <h1 style="font-family: 'InterUI-Bold';">Thank You</h1>
                <h2>Order ID : {{ formSummary.label_order }}</h2>
                <p>Your order will be delivered {{ formPayment.payment_estimations[formPayment.payment_chosen_estimation] }} with {{ formPayment.payment_couriers[formPayment.payment_chosen_courier] }}</p>
                <span class="clickable-span home" @click="reset()">&larr; Go to homepage</span>
            </div>
            <div class="finish__summary">
                <app-summary></app-summary>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import summary from './Summary.vue'

export default defineComponent({
    components: {
        'app-summary' : summary,
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const storedState = computed(() => store.state);
        const formPayment = ref(storedState.value.formPayment);
        const formSummary = ref(storedState.value.formSummary);

        const newState = {
            formDelivery : {
                delivery_name: null,
                delivery_email: null,
                delivery_phone: null,
                delivery_address: null,
                delivery_dropshiper_status: false,
                delivery_dropshiper_name: null,
                delivery_dropshiper_phone: null,
            },
            formValid: {
                delivery_email: null,
                delivery_phone: null,
                delivery_address: null,
                delivery_address_length: 0,
                delivery_dropshiper_phone: null,
            },
            formPayment: {
                payment_estimations: ['today', '2 days', '1 day'],
                payment_couriers: ['GO-SEND', 'JNE', 'Personal Courier'],
                payment_prices: [15000, 9000, 29000],
                payment_saldos: [1500000, 0, 0],
                payment_method: ['e-Wallet', 'Bank Transfer', 'Virtual Account'],
                payment_chosen_estimation: 0,
                payment_chosen_courier: 0,
                payment_chosen_prices: 0,
                payment_chosen_method: 0,
            },
            formSummary: {
                summary_purchased: 10,
                summary_cost: 500000,
                summary_dropfee: 5900,
                summary_total: 500000,
                summary_label_price: '',
                label_estimation : null,
                label_method : null,
                label_button : 'Continue to payment',
                label_order : '',
                button_to : 'payment',
                button_visibility : true,
            },
            activeLink: {
                delivery: true,
                payment: false,
                finish: false
            }
        }

        const randomString = (length, chars) => {
            let result = '';
            for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        }

        const reset = () => {
            store.commit('RESET_STATE', newState)
            setTimeout(() => {
                router.push({ name: "delivery" })
            }, 1000);
        }

        let randomized = '';

        if (formSummary.value.label_order == '') {
            randomized = randomString(5, '23456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ');

            formSummary.value.label_order = randomized;

            store.commit('SET_FORM_SUMMARY',formSummary);
            store.dispatch('saveStateToLocalStorage');
        }

        return {
            formPayment,
            formSummary,
            randomized,
            reset
        }
    },
});
</script>

<style scoped lang="scss">
@mixin if-lessThan-768px{
    @media (max-width: 768px){
        @content;
    }
}
.finish{
    padding: 40px;
    height: 100%;
    @include if-lessThan-768px{
        padding: 25px;
        height: auto;
    }
    .finish__grid{
        display: grid;
        grid-template-columns: 3fr 2fr 2fr;
        height: 65vh;
        grid-gap: 25px;
        margin-top: 20px;
        align-items: center;
        justify-items: center;
        @include if-lessThan-768px{
            grid-template-columns: 1fr;
            grid-gap: 5px;
            height: 100%;
        }
        .finish__details{
            grid-column: 1/3;
            @include if-lessThan-768px{
                margin-bottom: 1px;
            }
            h1{
                padding-bottom: -5px;
                margin-bottom: 25px;
                font-weight: bold;
                color: #ff8a00;
                font-size: 27px;
                position: relative;
                z-index: 1;
                &::after{
                    position: absolute;
                    content: ' ';
                    width: 8em;
                    height: 7px;
                    background: #e9e9ec;
                    left: 0;
                    z-index: -1;
                    bottom: 2px;
                }
            }
            h2{
                font-size: 18px;
                font-weight: bold;
            }
            p{
                font-size: 15px;
                margin-bottom: 20px;
            }
            .home{
                font-size: 15px;
                color: #616161;
            }
        }
        .finish__summary{
            height: 100%;
            border-left: 2px solid #fff3e5;
            padding-left: 20px;
        }
    }
}
.clickable-span {
    cursor: pointer;
}

.clickable-span {
    color: #007bff;
}

.clickable-span:hover {
    color: #0056b3;
}
</style>
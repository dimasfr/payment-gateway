<template>
    <div class="summary">
        <div class="summary__purchased">
            <h1 style="font-family: 'InterUI-Bold';">Summary</h1>
            <p>{{ formSummary.summary_purchased }} items purchased</p>
            <hr class="summary__line" v-if="formSummary.label_estimation">
        </div>
        <div class="summary__estimation">
            <p>{{ formSummary.label_estimation }}</p>
            <h2>{{ formSummary.label_estimation ? formPayment.payment_estimations[formPayment.payment_chosen_estimation] + ' by ' + formPayment.payment_couriers[formPayment.payment_chosen_courier] : '' }}</h2>
            <hr class="summary__line" v-if="formSummary.label_method">
        </div>
        <div class="summary__payment">
            <p>{{ formSummary.label_method }}</p>
            <h2>{{ formSummary.label_method ? formPayment.payment_method[formPayment.payment_chosen_method] : '' }}</h2>
        </div>
        <div class="summary__total">
            <div class="summary__cost">
                <p>Cost of goods</p>
                <p>{{ formSummary.summary_cost.toLocaleString() }}</p>
                <p>{{ formDelivery.delivery_dropshiper_status ? 'Dropshiping Fee' : '' }}</p>
                <p>{{ formDelivery.delivery_dropshiper_status ? formSummary.summary_dropfee.toLocaleString() : '' }}</p>
                <p>{{ formSummary.label_estimation ? formPayment.payment_couriers[formPayment.payment_chosen_courier] + ' Shipment' : '' }}</p>
                <p>{{ formSummary.label_estimation ? formPayment.payment_prices[formPayment.payment_chosen_prices].toLocaleString() : '' }}</p>
                <h1>Total</h1>
                <h1>{{ formSummary.summary_total.toLocaleString() }}</h1>
            </div>
            <button v-bind:class="{ 'hide' : !formSummary.button_visibility }" @click="buttonSubmit()">{{ formSummary.label_button }}</button>
        </div>
    </div>
  </template>

<script>
import { defineComponent, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        const store = useStore();
        const router = useRouter();

        const storedState = computed(() => store.state);
        const formSummary = ref(storedState.value.formSummary);
        const formDelivery = ref(storedState.value.formDelivery);
        const formPayment = ref(storedState.value.formPayment);
        const formValid = ref(storedState.value.formValid);

        const buttonSubmit = () => {
            if (formDelivery.value.delivery_name && formValid.value.delivery_email && formValid.value.delivery_phone && formValid.value.delivery_address && formValid.value.delivery_address_length <= 120) {
                if (formDelivery.value.delivery_dropshiper_status && formDelivery.value.delivery_dropshiper_name && formValid.value.delivery_dropshiper_phone) {
                    router.push({ name: formSummary.value.button_to })
                } else if (!formDelivery.value.delivery_dropshiper_status) {
                    router.push({ name: formSummary.value.button_to })
                }
            }
        }

        return {
            formDelivery,
            formPayment,
            formSummary,
            buttonSubmit
        }
    }
});
</script>

<style scoped lang="scss">
    @mixin if-lessThan-768px{
        @media (max-width: 768px){
            @content;
        }
    }
    .summary{
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
        .summary__purchased{
            @include if-lessThan-768px{
                margin-bottom: 20px;
            }
            h1{
                font-size: 20px;
                font-weight: bold;
                font-family: 'InterUI-Bold';
                color: #ff8a00;
                @include if-lessThan-768px{
                    font-size: 15px;
                }
            }
            p{
                font-size: 16px;
                color: #656567;
                @include if-lessThan-768px{
                    font-size: 12px;
                }
            }
        }
        .summary__estimation{
            h2{
                font-size: 14px;
                font-weight: bold;
                color: #19d875;
            }
        }
        .summary__payment{
            h2{
                font-size: 14px;
                font-weight: bold;
                color: #19d875;
            }
        }
        .summary__total{
            width: 100%;
            align-self: end;
            .hide{
                display: none;
            }
            .summary__cost{
                display: grid;
                grid-template-columns: 3fr 1fr;
                margin-bottom: 10px;
                @include if-lessThan-768px{
                    margin-top: 20px;
                }
                p{
                    font-size: 12px;
                    margin-bottom: 5px;
                    color: #656567;
                    &:nth-child(even){
                        justify-self: end;
                        font-weight: bold;
                    }
                }
                h1{
                    font-size: 18px;
                    margin-top: 20px;
                    font-weight: bold;
                    color: #ff8a00;
                    &:nth-child(even){
                        justify-self: end;
                    }
                }
            }
            button{
                width: 100%;
                height: 50px;
                border: none;
                background: #ff8a00;
                color: #fff;
                border-radius: 3px;
                cursor: pointer;
                outline: none;
            }
        }
        .summary__line{
            margin-top: 20px;
            width: 80px;
            background: #D8D8D8;
        }
    }
</style>
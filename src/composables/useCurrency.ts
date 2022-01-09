import { ref } from 'vue'

const currency = ref(0);

export default function useCurrency() {

  return {
    currency,
  }

}
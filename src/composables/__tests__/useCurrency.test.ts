import useCurrency from '../useCurrency'
import { ref } from 'vue'

describe('useCurrency', () => {
  it('return object should only include currency', () => {
    const allCurrency = useCurrency();
    expect(allCurrency).toMatchObject({
      currency: ref(0)
    });
  });

  it('currency should be modifiable', () => {
    const { currency } = useCurrency();
    currency.value = 5;
    expect(useCurrency().currency.value).toEqual(5);
  });
})

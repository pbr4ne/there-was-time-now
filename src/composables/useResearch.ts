import useCurrency from '@/composables/useCurrency'
import useTime from '@/composables/useTime'
import { Engineering } from '@/entities/Engineering'
import { Research } from '@/entities/Research'

export default function useResearch() {
  const { currency } = useCurrency();
  const { expandTime } = useTime();

  const canSellResearch = (research: Research, units: number) => {
    if(research.total < units) {
      return false;
    }
    return true;
  }

  const sellResearchCost = (research: Research, units: number) => {
    return units * research.cost;
  }

  const sellResearch = (research: Research, units: number) => {
    research.total -= units;
    const cost = sellResearchCost(research, units);
    currency.value += cost;
  }

  const canBuyWorker = (research: Research) => {
    if(currency.value >= research.workerCost) {
      return true;
    }
    return false;
  }

  const buyWorkerCost = (research: Research) => {
    return research.workerCost;
  }

  const canSellWorker = (research: Research) => {
    if(research.numWorkers > 0) {
      return true;
    }
    return false;
  }

  const sellWorkerCost = (research: Research) => {
    return research.workerCost;
  } 

  const buyWorker = (research: Research) => {
    if(canBuyWorker(research)) {
      research.numWorkers++;
      currency.value -= 5;
      incrementResearch(research);
    }
  }

  const sellWorker = (research: Research) => {
    if(canSellWorker(research)){
      research.numWorkers--
      currency.value += 5;
    }
  }

  const incrementResearch = (research: Research) => {
    //todo - yuck do this better
    if(!research.isIncrementing) {
      const timer = setInterval(function() {
        research.isIncrementing = true;
        //todo - figure out how I want the progress bars to work
        research.current += research.speed;
        if(research.current >= 100) {
          clearInterval(timer);
          setTimeout(function() {
            research.current = 0;
            research.total += 1;
            research.isIncrementing = false;
            if(research instanceof Engineering) {
              expandTime(research.expand);
            }
          },200);
          setTimeout(function() {
            if(research.numWorkers > 0) {
              incrementResearch(research);
            }
          }, 10000 / research.numWorkers);
        }
      },100);
    }
  };

  return {
    buyWorker,
    buyWorkerCost,
    canBuyWorker,
    canSellResearch,
    canSellWorker,
    incrementResearch,
    sellResearch,
    sellResearchCost,
    sellWorker,
    sellWorkerCost,
  };
}

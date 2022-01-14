import { ref } from 'vue'
import useCurrency from '@/composables/useCurrency'
import useInitialize from '@/composables/useInitialize'
import useTime from '@/composables/useTime'
import useFlags from './useFlags'
import { Research, ResearchRequirement } from '@/entities/Research'

const sellIncrementList = [1, 5, 10];
const sellIncrementIndex = ref(0);

export default function useResearch() {
  const { currency } = useCurrency();
  const { researchList } = useInitialize();
  const { expandTime } = useTime();
  const { slowdownEnabled } = useFlags();

  const canSellResearch = (research: Research, units: number) => {
    if(research.total < units) {
      return false;
    }
    return true;
  }

  const sellResearchPrice = (research: Research, units: number) => {
    return units * research.price;
  }

  const sellResearch = (research: Research, units: number) => {
    research.total -= units;
    const cost = sellResearchPrice(research, units);
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

  const changeSellIncrement = () => {
    sellIncrementIndex.value++;
    if(sellIncrementIndex.value > sellIncrementList.length - 1) {
      sellIncrementIndex.value = 0;
    }
  }

  const sellIncrement = () => {
    return sellIncrementList[sellIncrementIndex.value];
  }

  const canIncrementResearch = (research: Research) => {
    return research.researchRequirementList.filter((researchRequirement: ResearchRequirement) => 
      researchList[researchRequirement.researchKey].total < researchRequirement.quantity
    ).length == 0
  }

  const consumeResearch = (researchRequirementList: Array<ResearchRequirement>) => {
    researchRequirementList.forEach((researchRequirement : ResearchRequirement) => {
      researchList[researchRequirement.researchKey].total -= researchRequirement.quantity;
    });
  }

  const incrementResearch = (research: Research) => {
    //todo - yuck do this better
    if(!research.isIncrementing) {
      consumeResearch(research.researchRequirementList);
      const timer = setInterval(function() {
        research.isIncrementing = true;

        //todo - figure out how I want the progress bars to work
        research.current += research.speed;
        if(research.current >= 100) {
          clearInterval(timer);
          setTimeout(function() {
            if(!research.isDevice) {
              research.current = 0;
              research.isIncrementing = false;
            }
            research.total += 1;
            if(slowdownEnabled.value) {
              expandTime(research.expand);
            }
          },200);
          setTimeout(() => restartIncrement(research), 10000);
        }
      },100);
    }
  };

  const restartIncrement = (research: Research) => {
    if(research.numWorkers > 0 && canIncrementResearch(research)) {
      incrementResearch(research);
    } else {
      setTimeout(() => restartIncrement(research), 10000);
    }
  }

  const startIncrements = () => {
    Object.values(researchList).forEach((research: any) => {
      if(research.numWorkers > 0 && canIncrementResearch(research)){
          incrementResearch(research);
        }
      }
    )
  }

  return {
    buyWorker,
    buyWorkerCost,
    canBuyWorker,
    canIncrementResearch,
    canSellResearch,
    canSellWorker,
    changeSellIncrement,
    incrementResearch,
    sellIncrement,
    sellResearch,
    sellResearchPrice,
    sellWorker,
    sellWorkerCost,
    startIncrements,
  };
}

import useTime from '@/composables/useTime'
import { Engineering } from '@/entities/Engineering'
import { Research } from '@/entities/Research'

export default function useResearch() {
  const { expandTime } = useTime();

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
        }
      },100);
    }
  };

  return {
    incrementResearch,
  };
}

import useTime from '@/composables/useTime'
import useInitialize from '@/composables/useInitialize'

export default function useEngineering() {
  const { expandTime } = useTime();
  const { engineeringList } = useInitialize();

  const incrementEngineering = (key: string) => {
    //todo - yuck do this better
    const engineering = engineeringList[key];
    if(!engineering.isIncrementing) {
      const timer = setInterval(function() {
        engineering.isIncrementing = true;
        //todo - figure out how I want the progress bars to work
        engineering.current += 10;
        if(engineering.current >= 100) {
          clearInterval(timer);
          setTimeout(function() {
            engineering.current = 0;
            engineering.total += 1;
            engineering.isIncrementing = false;
            //only expand time in engineering?????
            expandTime(2);
          },200);
        }
      },100);
    }
  };

  return {
    incrementEngineering,
  };
}
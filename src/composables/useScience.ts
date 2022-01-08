import { Science } from '@/entities/Science'

export default function useScience() {
  const incrementScience = (science: Science) => {
    //todo - yuck do this better
    if(!science.isIncrementing) {
      const timer = setInterval(function() {
        science.isIncrementing = true;
        //todo - figure out how I want the progress bars to work
        science.current += science.speed;
        if(science.current >= 100) {
          clearInterval(timer);
          setTimeout(function() {
            science.current = 0;
            science.total += 1;
            science.isIncrementing = false;
          },200);
        }
      },100);
    }
  };

  return {
    incrementScience,
  };
}

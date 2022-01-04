import { reactive } from 'vue'
import { scienceList as unreactiveScienceList } from '../entities/Science'

//todo - i probably don't need this to be accessible so i can make it not reactive
let scienceList = reactive(unreactiveScienceList);

export default function useScience() {
  const increment = (key) => {
    //todo - yuck do this better
    const science = scienceList.find(science => science.key === key);
    if(!science.incrementing) {
      let timer = setInterval(function() {
        science.incrementing = true;
        science.current += 1;
        if(science.current >= 100) {
          clearInterval(timer);
          setTimeout(function() {
            science.current = 0;
            science.total += 1;
            science.incrementing = false;
          },200);
        }
      },100);
    }
  };

  return {
    increment,
  };
}
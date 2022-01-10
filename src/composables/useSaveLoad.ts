import * as localforage from 'localforage/dist/localforage.js'
import { ref, watchEffect } from 'vue'
import { useStopwatch } from 'vue-timer-hook'
import { GameConstants } from '@/enum/Constants'

const saveStopwatch = useStopwatch(0, true);
const isLoading = ref(true);

export default function useSaveLoad() {

  const save = () => {
    console.log('saving...');
    localforage.setItem('bwah', 'fwah', function (err: any) {
    });
  };

  const load = () => {
    console.log('loading...');
    isLoading.value = true;
    localforage.getItem('bwah', function(err: any, value: any) {
      console.log(value);
      isLoading.value = false;
    });
  }

  watchEffect(() => {
    if(saveStopwatch.seconds.value % GameConstants.SAVE_INTERVAL === 0 && !isLoading.value){
      save();
    }
  });

  return {
    isLoading,
    load,
    save,
  }

}
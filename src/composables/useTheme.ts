import { ref } from 'vue'
import useInitialize from '@/composables/useInitialize'
import { ResearchKey } from '@/enum/Enums'

const lightMode = ref(false);
const otherThemeName = ref('Light Mode');

export default function useTheme() {

  const { scienceList } = useInitialize();

  //todo - change colours more dynamically
  const switchTheme = () => {
    if(lightMode.value) {
      lightMode.value = false;
      otherThemeName.value = "Light Mode";
      scienceList[ResearchKey.GENETIC_MEMORY].color = '#FEFAE0';
      scienceList[ResearchKey.CHRONOMOGRIFICATION].color = '#FFFFFF';
      
    } else {
      lightMode.value = true;
      otherThemeName.value = "Dark Mode";
      scienceList[ResearchKey.GENETIC_MEMORY].color = '#826107';
      scienceList[ResearchKey.CHRONOMOGRIFICATION].color = '#363431';
    }
  }

  return {
    otherThemeName,
    switchTheme,
    lightMode,
  }
}
import { ref } from 'vue'
import useInitialize from '@/composables/useInitialize'
import { ResearchKey } from '@/enum/Enums'

const lightMode = ref(false);
const otherThemeName = ref('Light Mode');

export default function useTheme() {

  const { researchList } = useInitialize();

  //todo - change colours more dynamically
  const switchTheme = () => {
    if(lightMode.value) {
      lightMode.value = false;
      otherThemeName.value = "Light Mode";
      researchList[ResearchKey.GENETIC_MEMORY].color = '#FEFAE0';
      researchList[ResearchKey.CHRONOMOGRIFICATION].color = '#FFFFFF';
      
    } else {
      lightMode.value = true;
      otherThemeName.value = "Dark Mode";
      researchList[ResearchKey.GENETIC_MEMORY].color = '#826107';
      researchList[ResearchKey.CHRONOMOGRIFICATION].color = '#363431';
    }
  }

  return {
    otherThemeName,
    switchTheme,
    lightMode,
  }
}
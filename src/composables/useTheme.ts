import { ref } from 'vue'

const lightMode = ref(false);
const otherThemeName = ref('Light Mode');

export default function useTheme() {

  const switchTheme = () => {
    if(lightMode.value) {
      lightMode.value = false;
      otherThemeName.value = "Light Mode";
    } else {
      lightMode.value = true;
      otherThemeName.value = "Dark Mode";
    }
  }

  return {
    otherThemeName,
    switchTheme,
    lightMode,
  }
}
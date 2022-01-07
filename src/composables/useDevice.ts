import useTime from '@/composables/useTime'
import useInitialize from '@/composables/useInitialize'

export default function useDevice() {
  const { expandTime } = useTime();
  const { deviceList } = useInitialize();

  const incrementDevice = (key: string) => {
    //todo - yuck do this better
    const device = deviceList[key];
    if(!device.isIncrementing) {
      const timer = setInterval(function() {
        device.isIncrementing = true;
        //todo - figure out how I want the progress bars to work
        device.current += 10;
        if(device.current >= 100) {
          clearInterval(timer);
          setTimeout(function() {
            device.total += 1;
          },200);
        }
      },100);
    }
  };

  return {
    incrementDevice,
  };
}
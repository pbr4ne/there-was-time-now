import { Device } from '@/entities/Device'

export default function useDevice() {
  const incrementDevice = (device: Device) => {
    //todo - yuck do this better
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
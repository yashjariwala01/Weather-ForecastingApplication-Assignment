import { RiSunFill, RiCloudyFill, RiFoggyFill, RiRainyFill, RiSnowyFill, RiThunderstormsFill, RiQuestionFill } from 'react-icons/ri';

export const getWeatherInfo = (code) => {
    const iconSize = 60;
    switch (code) {
      case 1100:
      case 1000:
        return { icon: <RiSunFill size={iconSize} />, description: 'Clear' };
      case 1001:
      case 1101:
      case 1102:
        return { icon: <RiCloudyFill size={iconSize} />, description: 'Cloudy' };
      case 2000:
      case 2001:
        return { icon: <RiFoggyFill size={iconSize} />, description: 'Fog' };
      case 3000:
      case 3001:
      case 3002:
        return { icon: <RiRainyFill size={iconSize} />, description: 'Rain' };
      case 4000:
      case 4001:
      case 4200:
      case 4201:
        return { icon: <RiSnowyFill size={iconSize} />, description: 'Snow' };
      case 5000:
      case 5001:
        return { icon: <RiThunderstormsFill size={iconSize} />, description: 'Thunderstorm' };
      default:
        return { icon: <RiQuestionFill size={iconSize} />, description: 'Unknown' };
    }
  };
import { SafetyProtocolInfoBox } from '/src/components/SafetyProtocol';
import { PrimaryButton } from '../UI/Buttons';
import Button from '../UI/Button';
import { useNavigate } from 'react-router-dom';

type Props = {
  template:any
};

const CONTENT = {
  title: 'Safety Protocols',
  subTitle:
    'To make your seacation safe and memorable, we have implemented protocols of International standards, followed by cruiselines across the globe.',
  InfoBox: [
    {
      title: '100% Fresh and Filtered Air',
      image: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/fresh-filtered-air.svg',
      titleClassName: 'lg:!col-span-5'
    },
    {
      title: 'Completely Sanitized',
      image: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/completely-sanitized.svg',
      titleClassName: 'lg:!col-span-5'

    },
    {
      title: 'Elevated Health Protocols',
      image: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/elevated-protocols.svg',
      titleClassName: 'lg:!col-span-5'
    },
    {
      title: 'Mandatory Web Check-in',
      image: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/web-check-in.svg',
      titleClassName: 'lg:!col-span-5'
    },
    {
      title: 'Bookings for Shore Excursions',
      image: 'https://images.cordeliacruises.com/cordelia_v2/public/assets/shore-excursions.svg'
    }
  ]
};
export default function SafetyProtocol({
  template = ""
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto mb-16 my-12 lg:mb-24">
      <div className="m-4 bg-white">
        <h3 className="text-xl lg:text-2xl mb-3 font-medium">
          {CONTENT.title}
        </h3>
        <p className="text-xs lg:text-base leading-5 opacity-[76%] mb-4 lg:mb-8 lg:w-full">
          {CONTENT.subTitle}
        </p>
        <Button text='Learn More' type='secondary' handleClick={() => navigate('/health-wave-policy')} />
        {template !== 2 ?
        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-10">
          {CONTENT.InfoBox.map((content, index) => {
            return <SafetyProtocolInfoBox content={content} key={index} />;
          })}
        </div> : null
        }
      </div>
    </div>
  );
}

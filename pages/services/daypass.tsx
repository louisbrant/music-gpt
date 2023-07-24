// pages/DayPass.tsx
import React from 'react';
import DayPassPage from '../../components/Services/DayPassPage';
const dayPassOptions = [
    {
      title: 'Day Pass Classic',
      description: 'Enjoy a classic recovery experience with a Whole Body Cryotherapy session and Normatec Compression Therapy Massage, perfect for reducing inflammation and promoting relaxation.',
      img: '/serviceimages/cryomale.jpeg', // Update with the actual path to your image
      details: '', // Update with actual details if needed
    },
    {
      title: 'Day Pass Heat',
      description: 'Upgrade your recovery with a Cryotherapy session, Normatec Compression Therapy Massage, and an Infrared Sauna session, ideal for detoxification and improved circulation. Includes Day Pass Classic.',
      img: '/serviceimages/sauna.jpg', // Update with the actual path to your image
      details: '', // Update with actual details if needed
    },
    {
      title: 'Day Pass Heat +',
      description: 'Feel the heat. Get all the benefits from our Infrared Sauna with a full hour session. Includes Day Pass Classic.',
      img: '/serviceimages/NovaJoy.jpg', // Update with the actual path to your image
      details: '', // Update with actual details if needed
    },
    {
      title: 'Day Pass Stretch +',
      description: 'Elevate your recovery experience with our signature Stretch & Theragun Massage for focused relief and relaxation. This package includes Day Pass Classic and Heat for a comprehensive approach to rejuvenation.',
      img: '/serviceimages/shoulderpain.jpg', // Update with the actual path to your image
      details: '', // Update with actual details if needed
    },
  ];
  
  const DayPass: React.FC = () => {
    return (
      <DayPassPage dayPassOptions={dayPassOptions} />
    )
  }
  
  export default DayPass;
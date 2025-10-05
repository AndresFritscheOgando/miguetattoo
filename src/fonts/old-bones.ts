import localFont from 'next/font/local';

export const OldBones = localFont({
  src: [
    {
      path: '../../public/fonts/oldbones.regular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-old-bones',
  display: 'swap',
});

export default OldBones;

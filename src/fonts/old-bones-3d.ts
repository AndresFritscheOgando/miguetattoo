import localFont from 'next/font/local';

export const OldBones3D = localFont({
  src: [
    {
      path: '../../public/fonts/oldbones.3d.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-old-bones-3d',
  display: 'swap',
});

export default OldBones3D;

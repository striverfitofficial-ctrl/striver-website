import EnvironmentPage from '@/components/EnvironmentPage/EnvironmentPage';

export const metadata = {
  title: 'For Office - Striverfit',
  description: 'Quick, guided 20–30 minute sessions that busy professionals can complete during lunch breaks or before/after work, boosting workplace wellness.',
};

export default function OfficeEnvironment() {
  return (
    <EnvironmentPage 
      title="For Office"
      description="Quick, guided 20–30 minute sessions that busy professionals can complete during lunch breaks or before/after work, boosting workplace wellness."
      bgImage="/images/Image_3.png"
    />
  );
}

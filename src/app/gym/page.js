import EnvironmentPage from '@/components/EnvironmentPage/EnvironmentPage';

export const metadata = {
  title: 'For Gym - Striverfit',
  description: 'Sleek minimalist design blends perfectly with modern studio aesthetics while delivering premium results for serious lifters.',
};

export default function GymEnvironment() {
  return (
    <EnvironmentPage 
      title="For Gym"
      description="Sleek minimalist design blends perfectly with modern studio aesthetics while delivering premium results for serious lifters."
      bgImage="/images/Image_1.png"
    />
  );
}

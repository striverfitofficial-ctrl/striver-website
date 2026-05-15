import EnvironmentPage from '@/components/EnvironmentPage/EnvironmentPage';

export const metadata = {
  title: 'For Home - Striverfit',
  description: 'Compact and apartment-friendly design that fits seamlessly into any living space without taking over your home gym corner.',
};

export default function HomeEnvironment() {
  return (
    <EnvironmentPage 
      title="For Home"
      description="Compact and apartment-friendly design that fits seamlessly into any living space without taking over your home gym corner."
      bgImage="/images/Image_2.png"
    />
  );
}

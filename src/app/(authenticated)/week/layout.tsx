import { PageLayout } from '@/components/layout/PageLayout';
import { PropsWithChildren } from 'react';

const WeekLayout = ({ children }: PropsWithChildren) => {
  return (
    <PageLayout>{children}</PageLayout>
  );
};

export default WeekLayout;
import React from 'react';
import MainLayout from '../MainLayout';

function CenteredLayout({ children }: JSX.ElementChildrenAttribute): JSX.Element {
  return (
    <MainLayout>
      <div className="lg:max-w-screen-lg md:max-w-screen-md max-w-screen-sm mx-auto md:flex md:flex-col md:h-full justify-center px-0 md:px-12 xl:px-0 md:pb-12">
        {children}
      </div>
    </MainLayout>
  );
}

export default CenteredLayout;

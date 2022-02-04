import CenteredLayout from 'components/layouts/CenteredLayout';
import SocialLinks from 'components/molecules/contact/SocialLinks';
import React from 'react';

function ContactPage() {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start px-8 md:px-0">
      <div className="flex-auto grow-0">
        <h1 className="font-bold text-2xl mt-4 md:mt-0 text-center md:text-left mb-6 p-0 text-black align-baseline">Say Hello</h1>
        <div className="md:text-left text-center">If you'd like to say "hello", feel free to get in touch.</div>
        <SocialLinks />
      </div>
    </div>
  );
}

ContactPage.layout = CenteredLayout;

export default ContactPage;

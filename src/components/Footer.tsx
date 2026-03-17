import React from 'react';
import { Globe, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const sections = [
    {
      title: 'ESCROW SERVICES',
      links: [
        'Vehicle Escrow', 'Domain and Website Escrow', 'Domain Name Holding Escrow',
        'General Merchandise Escrow', 'Milestone Escrow', 'Broker Escrow',
        'IPv4 Escrow', 'Mergers and Acquisitions', 'PPE Escrow', 'Art Escrow'
      ]
    },
    {
      title: 'SUPPORT',
      links: [
        'Fee Calculator', 'Payment Options', 'Approved Carriers', 'Security',
        'Fraud Prevention', 'Common Questions', 'Report A Bug'
      ]
    },
    {
      title: 'PARTNERS',
      links: [
        'Benefits', 'Get Started', 'Our Partners', 'Partner Enquiry', 'API Guide'
      ]
    },
    {
      title: 'COMPANY',
      links: [
        'About Us', 'Awards', 'In the News', 'Contact Us'
      ],
      phone: '+1-415-801-2270'
    }
  ];

  return (
    <footer className="bg-[#002a42] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          <div className="md:col-span-1">
            <h3 className="text-[10px] font-bold tracking-widest mb-6 opacity-80">LANGUAGE</h3>
            <div className="relative inline-block w-full">
              <button className="w-full bg-white/5 border border-white/20 rounded px-4 py-2 flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span className="mr-2">🇬🇧</span> English
                </div>
                <Globe className="w-4 h-4 opacity-60" />
              </button>
            </div>
          </div>

          {sections.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-[10px] font-bold tracking-widest mb-6 opacity-80 uppercase">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a href="#" className="text-xs hover:text-[#3bb75e] transition-colors">{link}</a>
                  </li>
                ))}
                {section.phone && (
                  <li className="pt-4">
                    <a href={`tel:${section.phone}`} className="text-xs flex items-center hover:text-[#3bb75e]">
                      <Phone className="w-3 h-3 mr-2" /> {section.phone}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-12 text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center mr-2">
              <div className="w-5 h-5 border-2 border-[#003b5c] rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-[#3bb75e]"></div>
              </div>
            </div>
            <span className="text-2xl font-bold tracking-tight">ESCROW<span className="text-[#3bb75e]">.COM</span></span>
            <span className="text-[10px] ml-1 opacity-60">TM</span>
          </div>

          <div className="flex flex-wrap justify-center space-x-6 text-[10px] font-bold tracking-widest mb-6 opacity-80 uppercase">
            <a href="#" className="hover:text-[#3bb75e]">Privacy Policy</a>
            <span className="opacity-20">|</span>
            <a href="#" className="hover:text-[#3bb75e]">Licenses and Complaints</a>
            <span className="opacity-20">|</span>
            <a href="#" className="hover:text-[#3bb75e]">Legal</a>
          </div>

          <p className="text-[10px] opacity-60 mb-2">Copyright © 1999-2026 Escrow.com, Inc. All rights reserved</p>
          <p className="text-[10px] opacity-60">A company of Freelancer Limited</p>
        </div>
      </div>
      
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button className="bg-[#2F6BC6] text-white px-6 py-3 rounded-full shadow-2xl flex items-center font-bold text-sm hover:bg-[#0069d9] transition-colors">
          <div className="mr-2">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          </div>
          Chat with Escrow.com
        </button>
      </div>
    </footer>
  );
};

export default Footer;

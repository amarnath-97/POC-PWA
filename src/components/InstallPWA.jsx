import React, { useEffect, useState, useRef } from 'react';

export default function InstallPWAButton() {
  const promptRef = useRef(null);
  const [available, setAvailable] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  useEffect(() => {
    if (window.__MY_APP_PWA__?.deferredPrompt) {
      promptRef.current = window.__MY_APP_PWA__.deferredPrompt;
      setAvailable(true);
    }
  
    const onAvail = () => {
      promptRef.current = window.__MY_APP_PWA__.deferredPrompt;
      setAvailable(Boolean(promptRef.current));
    };
    window.addEventListener('myapp:pwa-install-available', onAvail);
    return () => window.removeEventListener('myapp:pwa-install-available', onAvail);
  }, []);

  useEffect(() => {
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, [window.matchMedia("(display-mode: standalone)").matches]);

  const onClick = async () => {
    const p = promptRef.current;
    if (!p) {
      console.log('No prompt available');
      return;
    }
    p.prompt();
    const choice = await p.userChoice;
    console.log('userChoice', choice);
    promptRef.current = null;
    window.__deferredPrompt = null;
    setAvailable(false);
  };

  if (isStandalone) {
    return null;
  }
  return <section className='flex flex-col md:flex-row w-full p-6 pb-12 space-y-12 md:p-10 lg:max-w-homeScreen'>
  <div className='flex flex-col items-start justify-center md:w-1/2 space-y-12'>
    <div className='flex flex-col items-start space-y-4'>
      <h2 className="text-6xl font-bold">Your care, <span className='font-bold text-blue'>one tap away</span></h2>
      <p className='text-2xl font-medium text-themeBlack'>Install SkyMD for faster care, follow-ups, and prescriptions</p>
      <p className='text-2xl font-medium text-themeBlack'>- no App Store needed.</p>
    </div>
    <div className="w-full flex space-x-4">
      <div className='p-3 rounded-xl bg-themeBlack/10 w-fit h-fit mb-4'>
        <svg className='w-10 h-10 text-themeBlack' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="21.17" x2="12" y1="8" y2="8"></line><line x1="3.95" x2="8.54" y1="6.06" y2="14"></line><line x1="10.88" x2="15.46" y1="21.94" y2="14"></line>
        </svg>
      </div>
      <div className='w-full flex flex-col items-start justify-start space-y-2'>
        <div className='flex flex-col items-start justify-start space-y-1'>
          <h3 className='text-xl font-medium'>Using Chrome?</h3>
          <p className="text-themeBlack font-medium text-lg">Just tap below and select Install when prompted.</p>
        </div>
        <button onClick={onClick} className='w-full h-8 !p-5 text-lg md:max-w-md' disabled={!available}>Install App</button>
      </div>
    </div>
    <div className="w-full flex space-x-4">
      <div className='p-3 rounded-xl bg-themeBlack/10 w-fit h-fit mb-4'>
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"></path>
        </svg>
      </div>
      <div className='w-full flex flex-col items-start justify-start space-y-4'>
        <div className='flex flex-col items-start justify-start space-y-1'>
          <h3 className='text-xl font-medium'>On iPhone or iPad?</h3>
          <p className="text-themeBlack font-medium text-lg">Follow these simple steps:</p>
        </div>
        <div className='flex flex-col items-start justify-start space-y-2'>
          <div className='flex items-center justify-start space-x-2'>
            <span className='font-bold bg-themeBlack/10 text-themeBlack rounded-full w-7 h-7 flex items-center justify-center'>1</span> 
            <span className='text-lg font-medium'>Tap Share</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" x2="12" y1="2" y2="15"></line></svg>
          </div>
          <div className='flex items-center justify-start space-x-2'>
            <span className='font-bold bg-themeBlack/10 text-themeBlack rounded-full w-7 h-7 flex items-center justify-center'>2</span>
            <span className='text-lg font-medium'>Add to Home Screen</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M8 12h8"></path><path d="M12 8v8"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="relative flex justify-center items-center md:w-1/2 h-full">
    <div className="relative animate-float">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-[3rem] blur-2xl transform scale-105"></div>
      <img src="https://sky-app-anywhere.lovable.app/assets/phone-mockup-BFqIxe6O.png" alt="SkyMD App on mobile device" className="relative w-full max-w-md lg:max-w-md drop-shadow-2xl h-full object-cover"/>
    </div>
    </div>
  </section>;
}
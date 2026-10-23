import React, { useState, useEffect } from 'react';
import { 
  auth, 
  onAuthStateChanged, 
  signInWithGoogle, 
  signOutUser, 
  User 
} from './firebase';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TherapeuticsPipeline } from './components/TherapeuticsPipeline';
import { RecentBreakthroughs } from './components/RecentBreakthroughs';
import { InteractiveWorkbench } from './components/InteractiveWorkbench';
import { GeminiIntelligenceConsole } from './components/GeminiIntelligenceConsole';
import { LeadershipAndEthics } from './components/LeadershipAndEthics';
import { Footer } from './components/Footer';
import { AstraVoiceModal } from './components/AstraVoiceModal';
import { ResearchPortalModal } from './components/ResearchPortalModal';
import { SectionsMenuModal } from './components/SectionsMenuModal';
import { ScrollBottomToggle } from './components/ScrollBottomToggle';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { FloatingAIAgentToggle } from './components/FloatingAIAgentToggle';

function MainApp() {
  const [user, setUser] = useState<User | null>(null);
  const [isLiveVoiceOpen, setIsLiveVoiceOpen] = useState<boolean>(false);
  const [isPortalOpen, setIsPortalOpen] = useState<boolean>(false);
  const [isSectionsMenuOpen, setIsSectionsMenuOpen] = useState<boolean>(false);
  const [isAIConsoleOpen, setIsAIConsoleOpen] = useState<boolean>(false);
  const { theme } = useTheme();

  // Enforce page opening at the VERY TOP (0, 0) on fresh load or page refresh
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const signedInUser = await signInWithGoogle();
      if (signedInUser) {
        setIsPortalOpen(true);
      }
    } catch (err: any) {
      if (err?.code !== 'auth/popup-closed-by-user' && err?.code !== 'auth/cancelled-popup-request') {
        console.warn('Google Sign-In notice:', err?.message || err);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setIsPortalOpen(false);
    } catch (err) {
      console.error('Sign-Out failed:', err);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen w-full max-w-full overflow-x-hidden transition-colors duration-200 font-sans selection:bg-cyan-500 selection:text-slate-950 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Global Viewport Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Top Bar Navigation */}
      <Navbar
        user={user}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenLiveVoice={() => setIsLiveVoiceOpen(true)}
        onOpenSectionsMenu={() => setIsSectionsMenuOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onExploreWorkbench={() => scrollToSection('workbench')}
          onExploreAI={() => setIsAIConsoleOpen(true)}
        />

        {/* Therapeutics Pipeline Matrix */}
        <TherapeuticsPipeline />

        {/* Recent Research Breakthroughs Section */}
        <RecentBreakthroughs />

        {/* Interactive 3D & Science Workbench */}
        <InteractiveWorkbench
          user={user}
          onOpenPortal={() => setIsPortalOpen(true)}
        />

        {/* Leadership, Ethics & Global Facilities */}
        <LeadershipAndEthics />
      </main>

      {/* Institutional Footer */}
      <Footer onOpenAIConsole={() => setIsAIConsoleOpen(true)} />

      {/* BioAstra AI Scientific Intelligence Console Modal */}
      <GeminiIntelligenceConsole
        isOpen={isAIConsoleOpen}
        onClose={() => setIsAIConsoleOpen(false)}
      />

      {/* All Sections Mega-Menu Drawer Modal */}
      <SectionsMenuModal
        isOpen={isSectionsMenuOpen}
        onClose={() => setIsSectionsMenuOpen(false)}
        onOpenLiveVoice={() => setIsLiveVoiceOpen(true)}
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenAIConsole={() => setIsAIConsoleOpen(true)}
      />

      {/* AstraVoice Live Audio Modal */}
      <AstraVoiceModal
        isOpen={isLiveVoiceOpen}
        onClose={() => setIsLiveVoiceOpen(false)}
      />

      {/* Research Portal & Lab Notes Modal */}
      <ResearchPortalModal
        isOpen={isPortalOpen}
        user={user}
        onClose={() => setIsPortalOpen(false)}
        onSignIn={handleSignIn}
      />

      {/* Floating Scroll-to-Bottom / Top Direct Toggle Widget */}
      <ScrollBottomToggle />

      {/* Floating BioAstra AI Agent Toggle Button (Bottom-Left Corner) */}
      <FloatingAIAgentToggle
        onOpenLiveVoice={() => setIsLiveVoiceOpen(true)}
        onOpenAIConsole={() => setIsAIConsoleOpen(true)}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MainApp />
      </LanguageProvider>
    </ThemeProvider>
  );
}

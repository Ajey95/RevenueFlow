import Hero from './components/Hero';
import ProblemStatement from './components/ProblemStatement';
import SolutionOverview from './components/SolutionOverview';
import ProductDemo from './components/ProductDemo';
import TargetPersonas from './components/TargetPersonas';
import FeaturesDeepDive from './components/FeaturesDeepDive';
import IntegrationsShowcase from './components/IntegrationsShowcase';
import PricingSection from './components/PricingSection';
import CustomerSuccessStories from './components/CustomerSuccessStories';
import TechnologySection from './components/TechnologySection';
import SecurityCompliance from './components/SecurityCompliance';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import BackendStatus from './components/BackendStatus';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div id="hero">
        <Hero />
      </div>
      <div id="problems">
        <ProblemStatement />
      </div>
      <div id="solution">
        <SolutionOverview />
      </div>
      <div id="demo">
        <ProductDemo />
      </div>
      <div id="customers">
        <TargetPersonas />
      </div>
      <div id="features">
        <FeaturesDeepDive />
      </div>
      <div id="integrations">
        <IntegrationsShowcase />
      </div>
      <div id="pricing">
        <PricingSection />
      </div>
      <div id="success-stories">
        <CustomerSuccessStories />
      </div>
      <div id="technology">
        <TechnologySection />
      </div>
      <div id="security">
        <SecurityCompliance />
      </div>
      <div id="cta">
        <CallToAction />
      </div>
      <Footer />
      <BackendStatus />
    </div>
  );
}

export default App;
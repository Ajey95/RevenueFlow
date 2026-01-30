import React from 'react';
import { Code, Database, Brain, Shield, Cloud, Zap } from 'lucide-react';

const TechnologySection = () => {
  const techStack = [
    {
      category: 'Frontend',
      technologies: ['React 18', 'TypeScript', 'Tailwind CSS'],
      icon: Code,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      category: 'Backend',
      technologies: ['Node.js', 'Express', 'GraphQL'],
      icon: Database,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      category: 'AI/ML',
      technologies: ['Vultr AI', 'ChromaDB', 'TensorFlow'],
      icon: Brain,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      category: 'Database',
      technologies: ['PostgreSQL', 'Redis', 'ClickHouse'],
      icon: Shield,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      category: 'Infrastructure',
      technologies: ['Vultr Cloud', 'VKE', 'Load Balancer'],
      icon: Cloud,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-50'
    },
    {
      category: 'Performance',
      technologies: ['CDN', 'Caching', 'Optimization'],
      icon: Zap,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    }
  ];

  const aiCapabilities = [
    {
      title: 'Machine Learning',
      description: 'Predictive modeling and behavioral analysis',
      features: ['Lead scoring algorithms', 'Deal outcome prediction', 'Customer behavior analysis', 'Revenue forecasting']
    },
    {
      title: 'Natural Language Processing',
      description: 'Email and communication analysis',
      features: ['Sentiment analysis', 'Intent detection', 'Content summarization', 'Automated categorization']
    },
    {
      title: 'Computer Vision',
      description: 'Document processing and analysis',
      features: ['Contract analysis', 'Document classification', 'Data extraction', 'Quality assessment']
    },
    {
      title: 'Automation',
      description: 'Intelligent workflow orchestration',
      features: ['Smart routing', 'Conditional logic', 'Process optimization', 'Error handling']
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Built on Cutting-Edge
            <span className="block text-cyan-500">AI Technology</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Discover the advanced technology stack that powers RevenueFlow's intelligent automation
          </p>
        </div>

        {/* Tech Stack Visualization */}
        <div className="bg-slate-50 rounded-2xl p-8 md:p-12 mb-16">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">
            Enterprise-Grade Technology Stack
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <div key={index} className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-${tech.color.split('-')[1]}-500`}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-10 h-10 ${tech.bgColor} rounded-lg flex items-center justify-center`}>
                    <tech.icon className={`w-5 h-5 ${tech.color}`} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">{tech.category}</h4>
                </div>
                <ul className="space-y-2">
                  {tech.technologies.map((technology, techIndex) => (
                    <li key={techIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                      <span className="text-slate-600">{technology}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* AI Capabilities */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8">
            AI Capabilities That Drive Results
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiCapabilities.map((capability, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <h4 className="text-xl font-bold text-slate-900 mb-3">{capability.title}</h4>
                <p className="text-slate-600 mb-4">{capability.description}</p>
                <ul className="space-y-2">
                  {capability.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Diagram */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Scalable Architecture Built for Growth
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cloud className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-2">Cloud-Native</h4>
              <p className="text-slate-300 text-sm">
                Built on Vultr Cloud infrastructure for maximum reliability and scalability
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-2">AI-First</h4>
              <p className="text-slate-300 text-sm">
                Every component designed with artificial intelligence at its core
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-2">Secure</h4>
              <p className="text-slate-300 text-sm">
                Enterprise-grade security with SOC 2 compliance and encryption
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
              View Technical Documentation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
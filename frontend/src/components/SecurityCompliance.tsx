import React from 'react';
import { Shield, Lock, Eye, Users, CheckCircle, Award } from 'lucide-react';

const SecurityCompliance = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: 'Encryption',
      description: 'AES-256 encryption at rest and in transit',
      details: 'All data is encrypted using industry-standard AES-256 encryption both when stored and during transmission'
    },
    {
      icon: Users,
      title: 'Authentication',
      description: 'Multi-factor authentication (MFA)',
      details: 'Secure access with MFA, SSO integration, and advanced authentication protocols'
    },
    {
      icon: Shield,
      title: 'Access Control',
      description: 'Role-based permissions (RBAC)',
      details: 'Granular access controls with role-based permissions and audit trails'
    },
    {
      icon: Eye,
      title: 'Monitoring',
      description: '24/7 security monitoring',
      details: 'Continuous security monitoring with real-time threat detection and response'
    }
  ];

  const complianceStandards = [
    {
      name: 'SOC 2 Type II',
      description: 'Audited security controls and processes',
      status: 'Certified',
      icon: Award
    },
    {
      name: 'GDPR',
      description: 'European data protection compliance',
      status: 'Compliant',
      icon: CheckCircle
    },
    {
      name: 'CCPA',
      description: 'California Consumer Privacy Act',
      status: 'Compliant',
      icon: CheckCircle
    },
    {
      name: 'ISO 27001',
      description: 'Information security management',
      status: 'In Progress',
      icon: Award
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Enterprise-Grade Security
            <span className="block text-cyan-500">& Compliance</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Your data security is our top priority. We maintain the highest standards of security and compliance.
          </p>
        </div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm mb-3">{feature.description}</p>
              <p className="text-slate-500 text-xs">{feature.details}</p>
            </div>
          ))}
        </div>

        {/* Compliance Standards */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8">
            Compliance & Certifications
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceStandards.map((standard, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <standard.icon className="w-8 h-8 text-slate-600" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{standard.name}</h4>
                <p className="text-slate-600 text-sm mb-3">{standard.description}</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  standard.status === 'Certified' ? 'bg-green-100 text-green-800' :
                  standard.status === 'Compliant' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {standard.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Security Promise */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white">
          <div className="text-center">
            <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Your Data, Your Control
            </h3>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
              We believe in complete transparency when it comes to your data. You own your data, 
              and we provide the tools to manage, export, or delete it at any time.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 rounded-xl p-6">
                <h4 className="text-lg font-bold text-cyan-400 mb-2">Data Ownership</h4>
                <p className="text-slate-300 text-sm">
                  Your data belongs to you. We never sell or share your information with third parties.
                </p>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-6">
                <h4 className="text-lg font-bold text-cyan-400 mb-2">Easy Export</h4>
                <p className="text-slate-300 text-sm">
                  Export your data in standard formats at any time with our self-service tools.
                </p>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-6">
                <h4 className="text-lg font-bold text-cyan-400 mb-2">Right to Delete</h4>
                <p className="text-slate-300 text-sm">
                  Request complete data deletion at any time, and we'll permanently remove it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityCompliance;
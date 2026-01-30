// backend/src/utils/validation.js - Data Validation Utilities
const logger = require('./logger');

class ValidationService {
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validateLeadData(leadData) {
    const errors = [];

    if (!leadData.email) {
      errors.push('Email is required');
    } else if (!this.validateEmail(leadData.email)) {
      errors.push('Invalid email format');
    }

    if (!leadData.company) {
      errors.push('Company name is required');
    }

    if (leadData.companySize && !['small', 'medium', 'large'].includes(leadData.companySize)) {
      errors.push('Invalid company size');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static validateDealData(dealData) {
    const errors = [];

    if (!dealData.company) {
      errors.push('Company name is required');
    }

    if (!dealData.value || dealData.value <= 0) {
      errors.push('Deal value must be greater than 0');
    }

    if (!dealData.stage) {
      errors.push('Deal stage is required');
    }

    if (dealData.probability && (dealData.probability < 0 || dealData.probability > 100)) {
      errors.push('Probability must be between 0 and 100');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potentially harmful characters
      .substring(0, 1000); // Limit length
  }

  static validateApiKey(apiKey) {
    return apiKey && typeof apiKey === 'string' && apiKey.length > 10;
  }
}

module.exports = ValidationService;
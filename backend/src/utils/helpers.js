// backend/src/utils/helpers.js - General Helper Functions
const crypto = require('crypto');
const logger = require('./logger');

class Helpers {
  static generateId() {
    return crypto.randomBytes(16).toString('hex');
  }

  static formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  static formatPercentage(value) {
    return `${Math.round(value * 100) / 100}%`;
  }

  static calculatePercentageChange(oldValue, newValue) {
    if (oldValue === 0) return newValue > 0 ? 100 : 0;
    return ((newValue - oldValue) / oldValue) * 100;
  }

  static delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static getCurrentQuarter() {
    const now = new Date();
    const quarter = Math.floor((now.getMonth() + 3) / 3);
    return `Q${quarter} ${now.getFullYear()}`;
  }

  static isWorkingHours() {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    
    // Monday-Friday, 9 AM - 6 PM
    return day >= 1 && day <= 5 && hour >= 9 && hour < 18;
  }

  static maskEmail(email) {
    const [user, domain] = email.split('@');
    const maskedUser = user.substring(0, 2) + '*'.repeat(user.length - 2);
    return `${maskedUser}@${domain}`;
  }

  static retry(fn, maxRetries = 3, delay = 1000) {
    return new Promise((resolve, reject) => {
      let attempts = 0;
      
      const attempt = async () => {
        try {
          attempts++;
          const result = await fn();
          resolve(result);
        } catch (error) {
          if (attempts >= maxRetries) {
            reject(error);
          } else {
            logger.warn(`Retry attempt ${attempts}/${maxRetries} failed:`, error.message);
            setTimeout(attempt, delay * attempts);
          }
        }
      };
      
      attempt();
    });
  }
}

module.exports = Helpers;
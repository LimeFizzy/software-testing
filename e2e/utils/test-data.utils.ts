import type { UserRegistrationData } from '../types/test-data.types';

export const generateTestUserData = (): UserRegistrationData => {
  const timestamp = Date.now();

  return {
    email: `testuser_${timestamp}@test.com`,
    password: 'SecurePass123!',
    firstName: 'John',
    lastName: 'Doe',
    country: 'United States',
    city: 'New York',
    address: '123 Test Street',
    zipCode: '10001',
    phone: '+1-555-0123',
  };
};

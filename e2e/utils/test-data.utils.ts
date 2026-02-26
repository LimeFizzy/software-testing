import * as fs from 'fs';
import * as path from 'path';
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

export const loadTestUsersFromFile = (
  filePath: string = path.resolve(__dirname, '../test-data/ecom-users.json')
): UserRegistrationData[] => {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as UserRegistrationData[];
};

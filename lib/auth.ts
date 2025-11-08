// Mock authentication utilities
export const mockUsers = {
  customers: [
    {
      email: 'customer@example.com',
      password: 'password123',
      name: 'John Doe',
      id: 'c1'
    }
  ],
  providers: [
    {
      email: 'provider@example.com',
      password: 'password123',
      name: 'Sarah Smith',
      businessName: 'Pro Pet Grooming',
      id: 'p1'
    }
  ]
};

export function authenticateCustomer(email: string, password: string) {
  const user = mockUsers.customers.find(
    u => u.email === email && u.password === password
  );
  if (user) {
    localStorage.setItem('customerAuth', JSON.stringify(user));
    return { success: true, user };
  }
  return { success: false, error: 'Invalid email or password' };
}

export function authenticateProvider(email: string, password: string) {
  const user = mockUsers.providers.find(
    u => u.email === email && u.password === password
  );
  if (user) {
    localStorage.setItem('providerAuth', JSON.stringify(user));
    return { success: true, user };
  }
  return { success: false, error: 'Invalid email or password' };
}

export function registerCustomer(name: string, email: string, password: string) {
  const newUser = {
    email,
    password,
    name,
    id: `c${mockUsers.customers.length + 1}`
  };
  mockUsers.customers.push(newUser);
  localStorage.setItem('customerAuth', JSON.stringify(newUser));
  return { success: true, user: newUser };
}

export function registerProvider(data: any) {
  const newUser = {
    email: data.email,
    password: data.password,
    name: data.fullName,
    businessName: data.businessName,
    phone: data.phone,
    id: `p${mockUsers.providers.length + 1}`
  };
  mockUsers.providers.push(newUser);
  localStorage.setItem('providerAuth', JSON.stringify(newUser));
  return { success: true, user: newUser };
}

export function getCustomerAuth() {
  if (typeof window === 'undefined') return null;
  const auth = localStorage.getItem('customerAuth');
  return auth ? JSON.parse(auth) : null;
}

export function getProviderAuth() {
  if (typeof window === 'undefined') return null;
  const auth = localStorage.getItem('providerAuth');
  return auth ? JSON.parse(auth) : null;
}

export function logoutCustomer() {
  localStorage.removeItem('customerAuth');
}

export function logoutProvider() {
  localStorage.removeItem('providerAuth');
}

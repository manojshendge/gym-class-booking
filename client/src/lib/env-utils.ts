// Environment variable access functions
export const getEnvVar = (key: string, defaultValue?: string): string => {
  return import.meta.env[key] || defaultValue || '';
};

// This is a mock function signature to match what was attempted to be imported in App.tsx
export const ask_secrets = () => {
  // In a real implementation, this would prompt the user for missing secrets
  console.warn("Secrets management functionality not fully implemented");
  return null;
};
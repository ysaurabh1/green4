import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { ArrowLeft, Shield, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AdminLoginProps {
  onNavigate: (page: 'home' | 'products' | 'user-dashboard' | 'admin-dashboard') => void;
  onAdminLogin: (isAdmin: boolean) => void;
}

export function AdminLogin({ onNavigate, onAdminLogin }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock admin credentials
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        toast.success('Admin login successful!');
        onAdminLogin(true);
        onNavigate('admin-dashboard');
      } else {
        setError('Invalid username or password. Please try again.');
        toast.error('Login failed');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => onNavigate('home')}
          className="text-gray-600 hover:text-green-600"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        {/* Login Card */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-2xl">Admin Login</CardTitle>
              <p className="text-gray-600 mt-2">
                Access the carbon tax management system
              </p>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                    disabled={isLoading}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="text-sm text-blue-800 mb-2">Demo Credentials:</h4>
              <div className="text-xs text-blue-700 space-y-1">
                <div><strong>Username:</strong> admin</div>
                <div><strong>Password:</strong> admin123</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Note */}
        <div className="text-center text-sm text-gray-600">
          <p>This is a secure admin portal for carbon tax management.</p>
          <p>Unauthorized access is prohibited.</p>
        </div>
      </div>
    </div>
  );
}
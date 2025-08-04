import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  ArrowLeft,
  User,
  Mail,
  Lock,
  Briefcase,
  Leaf,
} from "lucide-react";
import { User as UserType } from "../App";
import { toast } from "sonner@2.0.3";

interface AuthenticationPageProps {
  onNavigate: (
    page:
      | "home"
      | "products"
      | "user-dashboard"
      | "admin-dashboard"
      | "admin-login"
      | "calculator"
      | "manufacturer"
      | "transparency"
      | "projects"
      | "wallet"
      | "auth",
  ) => void;
  onLogin: (user: UserType) => void;
}

export function AuthenticationPage({
  onNavigate,
  onLogin,
}: AuthenticationPageProps) {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "consumer" as "consumer" | "manufacturer" | "admin",
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Demo login logic
    if (loginForm.email && loginForm.password) {
      const mockUser: UserType = {
        id: Date.now().toString(),
        name: loginForm.email.split("@")[0],
        email: loginForm.email,
        role: "consumer",
        walletBalance: 5000,
        totalTaxPaid: 1250,
        purchaseCount: 8,
        purchases: [],
      };

      toast.success("Login successful!");
      onLogin(mockUser);
    } else {
      toast.error("Please fill in all fields");
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !registerForm.name ||
      !registerForm.email ||
      !registerForm.password ||
      !registerForm.role
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (
      registerForm.password !== registerForm.confirmPassword
    ) {
      toast.error("Passwords do not match");
      return;
    }

    if (registerForm.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // Demo registration logic
    const newUser: UserType = {
      id: Date.now().toString(),
      name: registerForm.name,
      email: registerForm.email,
      role: registerForm.role,
      walletBalance:
        registerForm.role === "consumer" ? 5000 : 0,
      totalTaxPaid: 0,
      purchaseCount: 0,
      purchases: [],
    };

    toast.success(
      "Registration successful! Welcome to the Carbon Tax Management System.",
    );
    onLogin(newUser);
  };

  const handleDemoLogin = (
    role: "consumer" | "manufacturer" | "admin",
  ) => {
    const demoUsers = {
      consumer: {
        id: "demo_consumer",
        name: "Demo Consumer",
        email: "consumer@demo.com",
        role: "consumer" as const,
        walletBalance: 5000,
        totalTaxPaid: 1250,
        purchaseCount: 8,
        purchases: [],
      },
      manufacturer: {
        id: "demo_manufacturer",
        name: "Demo Manufacturer",
        email: "manufacturer@demo.com",
        role: "manufacturer" as const,
        walletBalance: 0,
        totalTaxPaid: 0,
        purchaseCount: 0,
        purchases: [],
      },
      admin: {
        id: "demo_admin",
        name: "Demo Admin",
        email: "admin@demo.com",
        role: "admin" as const,
        walletBalance: 0,
        totalTaxPaid: 0,
        purchaseCount: 0,
        purchases: [],
      },
    };

    toast.success(`Logged in as ${role}`);
    onLogin(demoUsers[role]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => onNavigate("home")}
                className="text-gray-600 hover:text-green-600"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl text-gray-900">
                Authentication
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Leaf className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl text-gray-900 mb-2">
            Join the Carbon Tax Revolution
          </h2>
          <p className="text-gray-600">
            Sign in to access your dashboard and contribute to a
            sustainable future
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Authentication Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Access Your Account</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">
                    Register
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="login"
                  className="space-y-4"
                >
                  <form
                    onSubmit={handleLoginSubmit}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="Enter your email"
                          value={loginForm.email}
                          onChange={(e) =>
                            setLoginForm({
                              ...loginForm,
                              email: e.target.value,
                            })
                          }
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="Enter your password"
                          value={loginForm.password}
                          onChange={(e) =>
                            setLoginForm({
                              ...loginForm,
                              password: e.target.value,
                            })
                          }
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      Sign In
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent
                  value="register"
                  className="space-y-4"
                >
                  <form
                    onSubmit={handleRegisterSubmit}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="register-name">
                        Full Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-name"
                          type="text"
                          placeholder="Enter your full name"
                          value={registerForm.name}
                          onChange={(e) =>
                            setRegisterForm({
                              ...registerForm,
                              name: e.target.value,
                            })
                          }
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="Enter your email"
                          value={registerForm.email}
                          onChange={(e) =>
                            setRegisterForm({
                              ...registerForm,
                              email: e.target.value,
                            })
                          }
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-role">
                        Account Type
                      </Label>
                      <Select
                        value={registerForm.role}
                        onValueChange={(
                          value:
                            | "consumer"
                            | "manufacturer"
                            | "admin",
                        ) =>
                          setRegisterForm({
                            ...registerForm,
                            role: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select account type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consumer">
                            Consumer - Buy sustainable products
                          </SelectItem>
                          <SelectItem value="manufacturer">
                            Manufacturer - List eco-friendly
                            products
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-password"
                          type="password"
                          placeholder="Create a password"
                          value={registerForm.password}
                          onChange={(e) =>
                            setRegisterForm({
                              ...registerForm,
                              password: e.target.value,
                            })
                          }
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-confirm-password">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-confirm-password"
                          type="password"
                          placeholder="Confirm your password"
                          value={registerForm.confirmPassword}
                          onChange={(e) =>
                            setRegisterForm({
                              ...registerForm,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Demo Login Options */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Demo Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 mb-4">
                Try the system with demo accounts to explore
                different user roles and features.
              </p>

              <div className="space-y-3">
                <Button
                  onClick={() => handleDemoLogin("consumer")}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <User className="h-4 w-4 mr-3" />
                  <div className="text-left">
                    <p>Demo Consumer Account</p>
                    <p className="text-xs text-gray-500">
                      Browse products, calculate tax, make
                      purchases
                    </p>
                  </div>
                </Button>

                <Button
                  onClick={() =>
                    handleDemoLogin("manufacturer")
                  }
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Briefcase className="h-4 w-4 mr-3" />
                  <div className="text-left">
                    <p>Demo Manufacturer Account</p>
                    <p className="text-xs text-gray-500">
                      Upload products, view analytics, track
                      performance
                    </p>
                  </div>
                </Button>
              </div>

              <div className="pt-4 border-t">
                <h4 className="mb-3">Platform Features</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Transparent carbon tax calculation</li>
                  <li>• Blockchain-verified transactions</li>
                  <li>• Real-time renewable project funding</li>
                  <li>• Complete audit trail and reporting</li>
                  <li>• Multi-role access control</li>
                </ul>
              </div>

              <div className="pt-4 border-t">
                <h4 className="mb-3">Security & Privacy</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• End-to-end encryption</li>
                  <li>• Multi-signature wallet security</li>
                  <li>• GDPR compliant data handling</li>
                  <li>• Regular security audits</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="mt-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Why Join Our Platform?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600">🌱</span>
                  </div>
                  <h4 className="mb-2">Environmental Impact</h4>
                  <p className="text-sm text-gray-600">
                    Your carbon tax contributions directly fund
                    renewable energy projects
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600">🔍</span>
                  </div>
                  <h4 className="mb-2">
                    Complete Transparency
                  </h4>
                  <p className="text-sm text-gray-600">
                    Track exactly where your tax money goes with
                    blockchain verification
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-600">🚀</span>
                  </div>
                  <h4 className="mb-2">Future-Ready</h4>
                  <p className="text-sm text-gray-600">
                    Be part of the next generation of
                    sustainable commerce and governance
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
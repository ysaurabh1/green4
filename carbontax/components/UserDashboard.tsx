import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { 
  LayoutDashboard, 
  History, 
  Wallet, 
  LogOut, 
  TrendingUp, 
  Package, 
  Coins,
  ArrowLeft
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { User } from '../App';

interface UserDashboardProps {
  user: User;
  onNavigate: (page: 'home' | 'products' | 'user-dashboard' | 'admin-dashboard' | 'admin-login') => void;
}

export function UserDashboard({ user, onNavigate }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'history' | 'wallet'>('dashboard');

  // Calculate tax breakdown by category
  const taxByCategory = user.purchases.reduce((acc, purchase) => {
    const category = 'Electronics'; // Simplified for demo
    acc[category] = (acc[category] || 0) + purchase.carbonTax;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(taxByCategory).map(([category, amount]) => ({
    name: category,
    value: amount,
    color: category === 'Electronics' ? '#4CAF50' : '#2196F3'
  }));

  const sidebarItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'history', icon: History, label: 'Purchase History' },
    { id: 'wallet', icon: Wallet, label: 'Wallet' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r">
        <div className="p-6 border-b">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('home')}
            className="mb-4 text-gray-600 hover:text-green-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h2 className="text-gray-900">Welcome, {user.name}</h2>
          <p className="text-sm text-gray-600">Carbon Tax Dashboard</p>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t">
            <button
              onClick={() => onNavigate('home')}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl text-gray-900 mb-2">Dashboard Overview</h1>
              <p className="text-gray-600">Track your environmental impact and tax contributions</p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm text-gray-600">Total Tax Paid</CardTitle>
                  <Coins className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-gray-900">₹{user.totalTaxPaid.toLocaleString()}</div>
                  <p className="text-xs text-green-600 mt-1">Contributing to green projects</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm text-gray-600">Wallet Balance</CardTitle>
                  <Wallet className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-gray-900">₹{user.walletBalance.toLocaleString()}</div>
                  <p className="text-xs text-blue-600 mt-1">Available for purchases</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm text-gray-600">Products Bought</CardTitle>
                  <Package className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-gray-900">{user.purchaseCount}</div>
                  <p className="text-xs text-orange-600 mt-1">Eco-friendly purchases</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts and Tables */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Tax Categories Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Tax by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Tax Amount']} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center mt-4">
                    {chartData.map((entry, index) => (
                      <div key={index} className="flex items-center mr-4">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: entry.color }}
                        ></div>
                        <span className="text-sm text-gray-600">{entry.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Purchases */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Purchases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {user.purchases.slice(0, 3).map((purchase) => (
                      <div key={purchase.id} className="flex items-center space-x-4">
                        <ImageWithFallback
                          src={purchase.productImage}
                          alt={purchase.productName}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{purchase.productName}</p>
                          <p className="text-xs text-gray-500">{purchase.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-900">₹{purchase.totalPrice.toLocaleString()}</p>
                          <p className="text-xs text-green-600">Tax: ₹{purchase.carbonTax}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl text-gray-900 mb-2">Purchase History</h1>
              <p className="text-gray-600">Complete record of your eco-friendly purchases</p>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Base Price</TableHead>
                      <TableHead>Carbon Tax</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Payment</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {user.purchases.map((purchase) => (
                      <TableRow key={purchase.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <ImageWithFallback
                              src={purchase.productImage}
                              alt={purchase.productName}
                              className="w-10 h-10 object-cover rounded"
                            />
                            <span className="text-gray-900">{purchase.productName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600">{purchase.date}</TableCell>
                        <TableCell>₹{purchase.basePrice.toLocaleString()}</TableCell>
                        <TableCell className="text-green-600">₹{purchase.carbonTax.toLocaleString()}</TableCell>
                        <TableCell className="text-gray-900">₹{purchase.totalPrice.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{purchase.paymentMethod}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'wallet' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl text-gray-900 mb-2">Wallet Management</h1>
              <p className="text-gray-600">Manage your token wallet for carbon tax payments</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wallet className="h-5 w-5 text-blue-600" />
                    <span>Current Balance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl text-gray-900 mb-4">₹{user.walletBalance.toLocaleString()}</div>
                  <div className="flex space-x-4">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Add Funds
                    </Button>
                    <Button variant="outline">
                      Transaction History
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span>Impact Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Contributions:</span>
                      <span className="text-green-600">₹{user.totalTaxPaid.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trees Planted:</span>
                      <span className="text-green-600">{Math.floor(user.totalTaxPaid / 50)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">CO₂ Offset:</span>
                      <span className="text-green-600">{Math.floor(user.totalTaxPaid / 25)} kg</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
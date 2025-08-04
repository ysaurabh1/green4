import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Leaf, DollarSign, TreePine, Factory, Calculator, Shield, Eye, Briefcase, Wallet, User } from 'lucide-react';
import { RenewableProject, Purchase } from '../App';

interface HomePageProps {
  onNavigate: (page: 'home' | 'products' | 'user-dashboard' | 'admin-dashboard' | 'admin-login' | 'calculator' | 'manufacturer' | 'transparency' | 'projects' | 'wallet' | 'auth') => void;
  totalTaxCollected: number;
  projectsData: RenewableProject[];
  co2OffsetAchieved: number;
  purchases: Purchase[];
}

export function HomePage({ onNavigate, totalTaxCollected, projectsData, co2OffsetAchieved, purchases }: HomePageProps) {
  // Calculate data for charts
  const taxByCategory = purchases.reduce((acc, purchase) => {
    const existing = acc.find(item => item.name === purchase.productName.split(' ')[0]);
    if (existing) {
      existing.value += purchase.carbonTax;
    } else {
      acc.push({ name: purchase.productName.split(' ')[0], value: purchase.carbonTax });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const taxUsageData = [
    { name: 'Solar', amount: 30000000, projects: 12 },
    { name: 'Wind', amount: 45000000, projects: 8 },
    { name: 'Hydro', amount: 25000000, projects: 5 },
    { name: 'Other', amount: 15000000, projects: 3 }
  ];

  const COLORS = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl text-gray-900">Carbon Tax Management</h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => onNavigate('home')}
                className="text-green-600 border-b-2 border-green-600 pb-1"
              >
                Home
              </button>
              <button 
                onClick={() => onNavigate('calculator')}
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Calculator
              </button>
              <button 
                onClick={() => onNavigate('products')}
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Products
              </button>
              <button 
                onClick={() => onNavigate('transparency')}
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Transparency
              </button>
              <button 
                onClick={() => onNavigate('projects')}
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Projects
              </button>
              <button 
                onClick={() => onNavigate('wallet')}
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Gov Wallet
              </button>
              <button 
                onClick={() => onNavigate('user-dashboard')}
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Dashboard
              </button>
              <button 
                onClick={() => onNavigate('manufacturer')}
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Manufacturer
              </button>
              <button 
                onClick={() => onNavigate('admin-login')}
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Admin
              </button>
            </nav>

            <Button 
              onClick={() => onNavigate('auth')}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl mb-6 text-gray-900">
            Decentralized Carbon Tax
            <span className="text-green-600 block">Management System</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transparent, blockchain-powered carbon taxation that funds renewable energy projects
            and creates a sustainable future for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => onNavigate('calculator')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Calculate Carbon Tax
            </Button>
            <Button 
              onClick={() => onNavigate('transparency')}
              variant="outline" 
              className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3"
            >
              <Eye className="h-5 w-5 mr-2" />
              View Transparency Portal
            </Button>
          </div>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl text-center mb-12 text-gray-900">System Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Total Carbon Tax Collected</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-green-600">₹{(totalTaxCollected / 10000000).toFixed(1)} Cr</div>
                <p className="text-xs text-muted-foreground">
                  From {purchases.length}+ verified transactions
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Projects Funded</CardTitle>
                <Factory className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-blue-600">{projectsData.length} Active</div>
                <p className="text-xs text-muted-foreground">
                  Solar, Wind & Hydro Projects
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">CO₂ Offset Achieved</CardTitle>
                <TreePine className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-green-600">{co2OffsetAchieved.toLocaleString()} tons</div>
                <p className="text-xs text-muted-foreground">
                  Equivalent to 35,000 trees planted
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Charts */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl text-center mb-12 text-gray-900">Tax Collection & Usage Analytics</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Pie Chart - Tax by Product Type */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Tax Collected by Product Type</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={taxByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {taxByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`₹${value}`, 'Tax Amount']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Bar Chart - Tax Usage */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Tax Usage by Energy Type</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={taxUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `₹${(value / 10000000).toFixed(1)}Cr`} />
                    <Tooltip formatter={(value) => [`₹${(value as number / 10000000).toFixed(1)} Cr`, 'Investment']} />
                    <Bar dataKey="amount" fill="#4CAF50" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Map View Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Renewable Energy Projects Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Factory className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg mb-2">Interactive Project Map</h3>
                  <p className="text-gray-600 mb-4">
                    View locations of all funded renewable energy projects across India
                  </p>
                  <Button 
                    onClick={() => onNavigate('projects')}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    View All Projects
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl text-center mb-12 text-gray-900">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg mb-3">1. Calculate Carbon Tax</h3>
              <p className="text-gray-600">
                Every product has a carbon footprint. Our system calculates the appropriate tax based on CO₂ emissions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg mb-3">2. Secure Blockchain Storage</h3>
              <p className="text-gray-600">
                All transactions are recorded on blockchain for complete transparency and immutable audit trails.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TreePine className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg mb-3">3. Fund Green Projects</h3>
              <p className="text-gray-600">
                Collected taxes directly fund renewable energy projects, creating measurable environmental impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl text-white mb-4">Ready to Make a Difference?</h2>
          <p className="text-green-100 mb-8 text-lg">
            Join the movement towards a sustainable future through transparent carbon taxation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => onNavigate('calculator')}
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Start Calculating
            </Button>
            <Button 
              onClick={() => onNavigate('transparency')}
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3"
            >
              <Eye className="h-5 w-5 mr-2" />
              Explore Transparency
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
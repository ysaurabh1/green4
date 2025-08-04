import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { ArrowLeft, Eye, DollarSign, Calendar, MapPin, ExternalLink, Download } from 'lucide-react';
import { Purchase, RenewableProject } from '../App';

interface TaxTransparencyPortalProps {
  onNavigate: (page: 'home' | 'products' | 'user-dashboard' | 'admin-dashboard' | 'admin-login' | 'calculator' | 'manufacturer' | 'transparency' | 'projects' | 'wallet' | 'auth') => void;
  purchases: Purchase[];
  projects: RenewableProject[];
  totalCollected: number;
}

export function TaxTransparencyPortal({ onNavigate, purchases, projects, totalCollected }: TaxTransparencyPortalProps) {
  const [dateFilter, setDateFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');

  // Calculate spending data
  const totalSpent = projects.reduce((sum, project) => sum + project.amountInvested, 0);
  const availableBalance = totalCollected - totalSpent;

  // Filter transactions
  const filteredPurchases = purchases.filter(purchase => {
    const matchesDate = !dateFilter || purchase.date.includes(dateFilter);
    const matchesCategory = !categoryFilter || categoryFilter === 'all' || purchase.productName.toLowerCase().includes(categoryFilter.toLowerCase());
    return matchesDate && matchesCategory;
  });

  const categories = ['Electronics', 'Clothing', 'Accessories', 'Stationery'];
  const regions = ['Tamil Nadu', 'Gujarat', 'Kerala', 'Maharashtra'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost"
                onClick={() => onNavigate('home')}
                className="text-gray-600 hover:text-green-600"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Eye className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl text-gray-900">Tax Transparency Portal</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Total Collected</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-green-600">₹{(totalCollected / 10000000).toFixed(1)} Cr</div>
              <p className="text-xs text-muted-foreground">
                From carbon tax on products
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-blue-600">₹{(totalSpent / 10000000).toFixed(1)} Cr</div>
              <p className="text-xs text-muted-foreground">
                On renewable energy projects
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Available Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-purple-600">₹{(availableBalance / 10000000).toFixed(1)} Cr</div>
              <p className="text-xs text-muted-foreground">
                Ready for new projects
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Transparency Score</CardTitle>
              <Eye className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-green-600">100%</div>
              <p className="text-xs text-muted-foreground">
                All transactions public
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle>Filter Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date Range</Label>
                <Input
                  id="date"
                  type="month"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Product Type</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select value={regionFilter} onValueChange={setRegionFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All regions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    {regions.slice(1).map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  onClick={() => {
                    setDateFilter('');
                    setCategoryFilter('all');
                    setRegionFilter('all');
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tax Collection Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Transactions */}
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Latest Tax Collections</CardTitle>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Tax Collected</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>TX Hash</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPurchases.slice(0, 10).map((purchase) => (
                      <TableRow key={purchase.id}>
                        <TableCell>{purchase.productName}</TableCell>
                        <TableCell className="text-green-600">₹{purchase.carbonTax}</TableCell>
                        <TableCell>{purchase.date}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost" className="p-0 h-auto">
                            <code className="text-xs">{purchase.txHash}</code>
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Project Funding */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>How Tax Money is Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4>{project.name}</h4>
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {project.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg text-blue-600">₹{(project.amountInvested / 10000000).toFixed(1)} Cr</p>
                      <Badge variant={
                        project.status === 'completed' ? 'default' : 
                        project.status === 'ongoing' ? 'secondary' : 'outline'
                      }>
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Impact Metrics */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Environmental Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-green-600">🌱</span>
                </div>
                <h3 className="text-lg mb-2">CO₂ Reduced</h3>
                <p className="text-2xl text-green-600 mb-1">16,500 tons</p>
                <p className="text-sm text-gray-600">Equivalent to 35,000 trees</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-blue-600">⚡</span>
                </div>
                <h3 className="text-lg mb-2">Clean Energy</h3>
                <p className="text-2xl text-blue-600 mb-1">2,500 MW</p>
                <p className="text-sm text-gray-600">Renewable capacity added</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-purple-600">🏠</span>
                </div>
                <h3 className="text-lg mb-2">Homes Powered</h3>
                <p className="text-2xl text-purple-600 mb-1">1.2 Million</p>
                <p className="text-sm text-gray-600">Clean energy access</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
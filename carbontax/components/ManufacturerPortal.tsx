import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { ArrowLeft, Upload, BarChart3, ExternalLink, Factory, TrendingUp, Package, DollarSign } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner@2.0.3';

interface ManufacturerPortalProps {
  onNavigate: (page: 'home' | 'products' | 'user-dashboard' | 'admin-dashboard' | 'admin-login' | 'calculator' | 'manufacturer' | 'transparency' | 'projects' | 'wallet' | 'auth') => void;
  userRole: 'consumer' | 'manufacturer' | 'admin';
}

interface ProductData {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  co2Emission: number;
  description: string;
  unitsSold: number;
  carbonTaxGenerated: number;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  txHash: string;
}

export function ManufacturerPortal({ onNavigate, userRole }: ManufacturerPortalProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'products' | 'analytics' | 'blockchain'>('upload');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    basePrice: '',
    co2Emission: '',
    description: ''
  });

  // Mock manufacturer data
  const [manufacturerProducts] = useState<ProductData[]>([
    {
      id: '1',
      name: 'Eco-Friendly Laptop',
      category: 'Electronics',
      basePrice: 50000,
      co2Emission: 125,
      description: 'Energy-efficient laptop with recycled materials',
      unitsSold: 2500,
      carbonTaxGenerated: 312500,
      status: 'approved',
      submittedDate: '2024-01-15',
      txHash: '0xabc123...def456'
    },
    {
      id: '2',
      name: 'Solar Power Bank',
      category: 'Electronics',
      basePrice: 3000,
      co2Emission: 7.5,
      description: 'Portable solar charging device',
      unitsSold: 5000,
      carbonTaxGenerated: 37500,
      status: 'approved',
      submittedDate: '2024-01-10',
      txHash: '0xdef456...ghi789'
    },
    {
      id: '3',
      name: 'Green Smartphone',
      category: 'Electronics',
      basePrice: 25000,
      co2Emission: 85,
      description: 'Sustainable smartphone with bio-plastic casing',
      unitsSold: 0,
      carbonTaxGenerated: 0,
      status: 'pending',
      submittedDate: '2024-01-20',
      txHash: '0xghi789...jkl012'
    }
  ]);

  const categories = ['Electronics', 'Clothing', 'Accessories', 'Stationery', 'Automotive', 'Home & Garden'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.basePrice || !formData.co2Emission) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Mock submission
    toast.success('Product submitted for review! You will be notified once approved.');
    setFormData({
      name: '',
      category: '',
      basePrice: '',
      co2Emission: '',
      description: ''
    });
  };

  const totalUnitsSold = manufacturerProducts.reduce((sum, product) => sum + product.unitsSold, 0);
  const totalCarbonTax = manufacturerProducts.reduce((sum, product) => sum + product.carbonTaxGenerated, 0);
  const approvedProducts = manufacturerProducts.filter(p => p.status === 'approved').length;

  if (userRole !== 'manufacturer') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Access Restricted</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p>This portal is only accessible to registered manufacturers.</p>
            <Button onClick={() => onNavigate('auth')} className="bg-green-600 hover:bg-green-700 text-white">
              Login as Manufacturer
            </Button>
            <Button onClick={() => onNavigate('home')} variant="outline">
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                <Factory className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl text-gray-900">Manufacturer Portal</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          {[
            { id: 'upload', label: 'Upload Product', icon: Upload },
            { id: 'products', label: 'My Products', icon: Package },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'blockchain', label: 'Blockchain', icon: ExternalLink }
          ].map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              variant={activeTab === tab.id ? "default" : "ghost"}
              className={`flex-1 ${activeTab === tab.id ? 'bg-white shadow-sm' : ''}`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </Button>
          ))}
        </div>

        {activeTab === 'upload' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="h-5 w-5 mr-2 text-green-600" />
                    Upload New Product
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Product Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Enter product name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="basePrice">Base Price (₹) *</Label>
                        <Input
                          id="basePrice"
                          type="number"
                          value={formData.basePrice}
                          onChange={(e) => handleInputChange('basePrice', e.target.value)}
                          placeholder="Enter base price"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="co2Emission">CO₂ Emission (kg) *</Label>
                        <Input
                          id="co2Emission"
                          type="number"
                          step="0.1"
                          value={formData.co2Emission}
                          onChange={(e) => handleInputChange('co2Emission', e.target.value)}
                          placeholder="Enter CO₂ emission per unit"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Product Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Describe your product, materials used, sustainability features..."
                        rows={4}
                      />
                    </div>

                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <Upload className="h-4 w-4 mr-2" />
                      Submit for Review
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Guidelines */}
            <div>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Submission Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <AlertDescription>
                      All product submissions require admin approval before going live on the platform.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-3">
                    <h4>Required Information:</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Accurate product name and category</li>
                      <li>• Real base price (excluding taxes)</li>
                      <li>• Verified CO₂ emission data</li>
                      <li>• Detailed product description</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4>Carbon Tax Calculation:</h4>
                    <p className="text-sm text-gray-600">
                      Carbon tax is automatically calculated at ₹20 per kg of CO₂ emission.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2 text-green-600" />
                My Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Base Price</TableHead>
                      <TableHead>CO₂ Emission</TableHead>
                      <TableHead>Units Sold</TableHead>
                      <TableHead>Tax Generated</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {manufacturerProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>₹{product.basePrice.toLocaleString()}</TableCell>
                        <TableCell>{product.co2Emission} kg</TableCell>
                        <TableCell>{product.unitsSold.toLocaleString()}</TableCell>
                        <TableCell>₹{product.carbonTaxGenerated.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              product.status === 'approved' ? 'default' : 
                              product.status === 'pending' ? 'secondary' : 'destructive'
                            }
                          >
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{product.submittedDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Summary Cards */}
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Total Products</CardTitle>
                <Package className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-green-600">{manufacturerProducts.length}</div>
                <p className="text-xs text-muted-foreground">
                  {approvedProducts} approved, {manufacturerProducts.length - approvedProducts} pending
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Units Sold</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-blue-600">{totalUnitsSold.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Across all approved products
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Carbon Tax Generated</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-green-600">₹{totalCarbonTax.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Contributing to renewable energy
                </p>
              </CardContent>
            </Card>

            {/* Product Performance */}
            <div className="md:col-span-3">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Product Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {manufacturerProducts.filter(p => p.status === 'approved').map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4>{product.name}</h4>
                          <p className="text-sm text-gray-600">{product.unitsSold} units sold</p>
                        </div>
                        <div className="text-right">
                          <p className="text-green-600">₹{product.carbonTaxGenerated.toLocaleString()}</p>
                          <p className="text-xs text-gray-600">Tax generated</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'blockchain' && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ExternalLink className="h-5 w-5 mr-2 text-green-600" />
                Blockchain Transaction History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Transaction Hash</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {manufacturerProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {product.txHash}
                          </code>
                        </TableCell>
                        <TableCell>{product.submittedDate}</TableCell>
                        <TableCell>
                          <Badge variant={product.status === 'approved' ? 'default' : 'secondary'}>
                            {product.status === 'approved' ? 'Confirmed' : 'Pending'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => window.open('https://etherscan.io', '_blank')}
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
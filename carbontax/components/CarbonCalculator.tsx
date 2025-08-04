import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Calculator, ExternalLink, Leaf } from 'lucide-react';
import { Product } from '../App';

interface CarbonCalculatorProps {
  onNavigate: (page: 'home' | 'products' | 'user-dashboard' | 'admin-dashboard' | 'admin-login' | 'calculator' | 'manufacturer' | 'transparency' | 'projects' | 'wallet' | 'auth') => void;
  products: Product[];
}

export function CarbonCalculator({ onNavigate, products }: CarbonCalculatorProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customBrand, setCustomBrand] = useState('');
  const [customModel, setCustomModel] = useState('');
  const [calculationResult, setCalculationResult] = useState<{
    co2Emitted: number;
    basePrice: number;
    gst: number;
    carbonTax: number;
    totalPrice: number;
    txHash: string;
  } | null>(null);

  const categories = ['Electronics', 'Clothing', 'Accessories', 'Stationery'];
  
  const filteredProducts = selectedCategory 
    ? products.filter(p => p.category === selectedCategory)
    : [];

  const handleCalculate = () => {
    if (!selectedProduct) return;

    const gst = selectedProduct.basePrice * 0.18; // 18% GST
    const result = {
      co2Emitted: selectedProduct.co2Emission,
      basePrice: selectedProduct.basePrice,
      gst: gst,
      carbonTax: selectedProduct.carbonTax,
      totalPrice: selectedProduct.basePrice + gst + selectedProduct.carbonTax,
      txHash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 8)}`
    };

    setCalculationResult(result);
  };

  const handleReset = () => {
    setSelectedCategory('');
    setSelectedProduct(null);
    setCustomBrand('');
    setCustomModel('');
    setCalculationResult(null);
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
                onClick={() => onNavigate('home')}
                className="text-gray-600 hover:text-green-600"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl text-gray-900">Carbon Tax Calculator</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-5 w-5 mr-2 text-green-600" />
                Product Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category">Product Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product category" />
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

              {selectedCategory && (
                <div className="space-y-2">
                  <Label htmlFor="product">Product Type</Label>
                  <Select 
                    value={selectedProduct?.id || ''} 
                    onValueChange={(value) => {
                      const product = products.find(p => p.id === value);
                      setSelectedProduct(product || null);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select product type" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredProducts.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {selectedProduct && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand (Optional)</Label>
                    <Input
                      id="brand"
                      value={customBrand}
                      onChange={(e) => setCustomBrand(e.target.value)}
                      placeholder={selectedProduct.brand || "Enter brand name"}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model">Model (Optional)</Label>
                    <Input
                      id="model"
                      value={customModel}
                      onChange={(e) => setCustomModel(e.target.value)}
                      placeholder={selectedProduct.model || "Enter model name"}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      onClick={handleCalculate}
                      className="bg-green-600 hover:bg-green-700 text-white flex-1"
                    >
                      Calculate Carbon Tax
                    </Button>
                    <Button 
                      onClick={handleReset}
                      variant="outline"
                    >
                      Reset
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Leaf className="h-5 w-5 mr-2 text-green-600" />
                Calculation Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {calculationResult ? (
                <div className="space-y-6">
                  {/* Product Info */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg mb-2">Product Details</h3>
                    <p><strong>Product:</strong> {selectedProduct?.name}</p>
                    {customBrand && <p><strong>Brand:</strong> {customBrand}</p>}
                    {customModel && <p><strong>Model:</strong> {customModel}</p>}
                  </div>

                  {/* Environmental Impact */}
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-lg mb-2 text-green-800">Environmental Impact</h3>
                    <div className="flex items-center">
                      <Leaf className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-lg">
                        <strong>{calculationResult.co2Emitted} kg</strong> CO₂ emitted
                      </span>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <h3 className="text-lg">Price Breakdown</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Base Price:</span>
                        <span>₹{calculationResult.basePrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GST (18%):</span>
                        <span>₹{calculationResult.gst.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Carbon Tax:</span>
                        <span>₹{calculationResult.carbonTax.toLocaleString()}</span>
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between text-lg">
                        <span><strong>Total Price:</strong></span>
                        <span><strong>₹{calculationResult.totalPrice.toLocaleString()}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Blockchain Info */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg mb-2 text-blue-800">Blockchain Transaction</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Transaction Hash:
                    </p>
                    <div className="flex items-center justify-between bg-white p-2 rounded border">
                      <code className="text-sm">{calculationResult.txHash}</code>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="ml-2"
                        onClick={() => window.open('https://etherscan.io', '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button 
                      onClick={() => onNavigate('products')}
                      className="bg-green-600 hover:bg-green-700 text-white flex-1"
                    >
                      Purchase This Product
                    </Button>
                    <Button 
                      onClick={handleReset}
                      variant="outline"
                    >
                      Calculate Another
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg text-gray-600 mb-2">No Calculation Yet</h3>
                  <p className="text-gray-500">
                    Select a product and click "Calculate Carbon Tax" to see the results
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <div className="mt-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>How Carbon Tax is Calculated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600">1</span>
                  </div>
                  <h4 className="mb-2">CO₂ Emissions</h4>
                  <p className="text-sm text-gray-600">
                    Each product has a calculated carbon footprint based on manufacturing, transport, and lifecycle
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600">2</span>
                  </div>
                  <h4 className="mb-2">Tax Rate</h4>
                  <p className="text-sm text-gray-600">
                    Carbon tax is calculated at ₹20 per kg of CO₂ equivalent emissions
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-600">3</span>
                  </div>
                  <h4 className="mb-2">Green Investment</h4>
                  <p className="text-sm text-gray-600">
                    100% of carbon tax collected goes directly to renewable energy projects
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
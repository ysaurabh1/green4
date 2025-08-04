import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Leaf, ShoppingCart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Product } from '../App';

interface ProductListPageProps {
  products: Product[];
  onNavigate: (page: 'home' | 'products' | 'user-dashboard' | 'admin-dashboard' | 'admin-login') => void;
  onProductSelect: (product: Product) => void;
}

export function ProductListPage({ products, onNavigate, onProductSelect }: ProductListPageProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('home')}
                className="text-gray-600 hover:text-green-600"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div className="flex items-center space-x-2">
                <Leaf className="h-8 w-8 text-green-600" />
                <span className="text-xl text-gray-900">EcoTax</span>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => onNavigate('home')}
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => onNavigate('products')}
                className="text-green-600 border-b-2 border-green-600 pb-1"
              >
                Products
              </button>
              <button 
                onClick={() => onNavigate('user-dashboard')}
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Dashboard
              </button>
              <button 
                onClick={() => onNavigate('admin-login')}
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Admin
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">Eco-Friendly Products</h1>
          <p className="text-gray-600">
            All products include transparent carbon tax calculations to support environmental projects.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
              <div className="relative">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <Badge 
                  className="absolute top-3 right-3 bg-green-100 text-green-700"
                >
                  {product.category}
                </Badge>
              </div>
              
              <CardContent className="p-4 space-y-4">
                <div>
                  <h3 className="text-gray-900 group-hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Base Price:</span>
                    <span className="text-gray-900">₹{product.basePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Carbon Tax:</span>
                    <span className="text-orange-600">₹{product.carbonTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-900">Total Price:</span>
                    <span className="text-green-600">
                      ₹{(product.basePrice + product.carbonTax).toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button 
                  onClick={() => onProductSelect(product)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Environmental Impact Info */}
        <div className="mt-12 bg-green-50 rounded-2xl p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl text-gray-900">Your Carbon Tax Makes a Difference</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every rupee of carbon tax from your purchases goes directly to verified environmental 
              projects including reforestation, renewable energy, and carbon capture initiatives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
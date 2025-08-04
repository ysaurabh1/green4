import React, { useState } from 'react';
import { HomePage } from './components/HomePage';
import { ProductListPage } from './components/ProductListPage';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLogin } from './components/AdminLogin';
import { PurchaseModal } from './components/PurchaseModal';
import { CarbonCalculator } from './components/CarbonCalculator';
import { ManufacturerPortal } from './components/ManufacturerPortal';
import { TaxTransparencyPortal } from './components/TaxTransparencyPortal';
import { RenewableProjectsPage } from './components/RenewableProjectsPage';
import { GovernmentWalletPage } from './components/GovernmentWalletPage';
import { AuthenticationPage } from './components/AuthenticationPage';
import { Toaster } from './components/ui/sonner';

export type Product = {
  id: string;
  name: string;
  image: string;
  basePrice: number;
  carbonTax: number;
  category: string;
  co2Emission: number;
  brand?: string;
  model?: string;
  manufacturerId?: string;
};

export type Purchase = {
  id: string;
  productName: string;
  productImage: string;
  basePrice: number;
  carbonTax: number;
  totalPrice: number;
  date: string;
  paymentMethod: string;
  txHash?: string;
  co2Emission: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'consumer' | 'manufacturer' | 'admin';
  walletBalance: number;
  totalTaxPaid: number;
  purchaseCount: number;
  purchases: Purchase[];
};

export type RenewableProject = {
  id: string;
  name: string;
  location: string;
  type: 'solar' | 'wind' | 'hydro';
  amountInvested: number;
  status: 'ongoing' | 'completed' | 'planned';
  co2ReductionEstimate: number;
  fundSource: string;
  txHash: string;
  image: string;
};

export type GovernmentWallet = {
  address: string;
  balance: number;
  totalCollected: number;
  totalSpent: number;
  verifiedTransactions: number;
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'products' | 'user-dashboard' | 'admin-dashboard' | 'admin-login' | 'calculator' | 'manufacturer' | 'transparency' | 'projects' | 'wallet' | 'auth'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [user, setUser] = useState<User>({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'consumer',
    walletBalance: 5000,
    totalTaxPaid: 1250,
    purchaseCount: 8,
    purchases: [
      {
        id: '1',
        productName: 'Eco-Friendly Laptop',
        productImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop',
        basePrice: 50000,
        carbonTax: 2500,
        totalPrice: 52500,
        date: '2024-01-15',
        paymentMethod: 'Token Wallet',
        txHash: '0x1234...abcd',
        co2Emission: 125
      },
      {
        id: '2',
        productName: 'Solar Power Bank',
        productImage: 'https://images.unsplash.com/photo-1609592806596-68bb6c4c5eb5?w=300&h=200&fit=crop',
        basePrice: 3000,
        carbonTax: 150,
        totalPrice: 3150,
        date: '2024-01-10',
        paymentMethod: 'INR',
        txHash: '0x5678...efgh',
        co2Emission: 7.5
      }
    ]
  });

  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Eco-Friendly Laptop',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop',
      basePrice: 50000,
      carbonTax: 2500,
      category: 'Electronics',
      co2Emission: 125,
      brand: 'EcoTech',
      model: 'Green Pro 15',
      manufacturerId: 'mfg_001'
    },
    {
      id: '2',
      name: 'Solar Power Bank',
      image: 'https://images.unsplash.com/photo-1609592806596-68bb6c4c5eb5?w=300&h=200&fit=crop',
      basePrice: 3000,
      carbonTax: 150,
      category: 'Electronics',
      co2Emission: 7.5,
      brand: 'SolarTech',
      model: 'PowerBoost 20K',
      manufacturerId: 'mfg_002'
    },
    {
      id: '3',
      name: 'Organic Cotton T-Shirt',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=200&fit=crop',
      basePrice: 800,
      carbonTax: 40,
      category: 'Clothing',
      co2Emission: 2,
      brand: 'EcoWear',
      model: 'Organic Classic',
      manufacturerId: 'mfg_003'
    },
    {
      id: '4',
      name: 'Bamboo Phone Case',
      image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=200&fit=crop',
      basePrice: 500,
      carbonTax: 25,
      category: 'Accessories',
      co2Emission: 1.25,
      brand: 'BambooLife',
      model: 'Protective Pro',
      manufacturerId: 'mfg_004'
    },
    {
      id: '5',
      name: 'Recycled Paper Notebook',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=200&fit=crop',
      basePrice: 200,
      carbonTax: 10,
      category: 'Stationery',
      co2Emission: 0.5,
      brand: 'GreenPages',
      model: 'Eco Journal A5',
      manufacturerId: 'mfg_005'
    },
    {
      id: '6',
      name: 'LED Smart Bulb',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
      basePrice: 1200,
      carbonTax: 60,
      category: 'Electronics',
      co2Emission: 3,
      brand: 'SmartLight',
      model: 'Efficient Plus',
      manufacturerId: 'mfg_006'
    }
  ]);

  const [renewableProjects] = useState<RenewableProject[]>([
    {
      id: '1',
      name: 'Solar Plant in Tamil Nadu',
      location: 'Tamil Nadu, India',
      type: 'solar',
      amountInvested: 30000000,
      status: 'ongoing',
      co2ReductionEstimate: 5000,
      fundSource: 'Carbon Tax Collection Q1 2024',
      txHash: '0xabc123...def456',
      image: 'https://images.unsplash.com/photo-1545972154-9bb223aac798?w=400&h=250&fit=crop'
    },
    {
      id: '2',
      name: 'Wind Farm in Gujarat',
      location: 'Gujarat, India',
      type: 'wind',
      amountInvested: 45000000,
      status: 'completed',
      co2ReductionEstimate: 8000,
      fundSource: 'Carbon Tax Collection Q4 2023',
      txHash: '0xdef456...ghi789',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=250&fit=crop'
    },
    {
      id: '3',
      name: 'Hydro Power Plant in Kerala',
      location: 'Kerala, India',
      type: 'hydro',
      amountInvested: 25000000,
      status: 'planned',
      co2ReductionEstimate: 3500,
      fundSource: 'Carbon Tax Collection Q2 2024',
      txHash: '0xghi789...jkl012',
      image: 'https://images.unsplash.com/photo-1594736797933-d0b22ad17bb1?w=400&h=250&fit=crop'
    }
  ]);

  const [governmentWallet] = useState<GovernmentWallet>({
    address: '0x742d35Cc9570C4669b85B5B65fF045f1F5e6B5a8',
    balance: 125000000,
    totalCollected: 85000000,
    totalSpent: 60000000,
    verifiedTransactions: 1247
  });

  const handlePurchase = (product: Product, paymentMethod: string) => {
    const purchase: Purchase = {
      id: Date.now().toString(),
      productName: product.name,
      productImage: product.image,
      basePrice: product.basePrice,
      carbonTax: product.carbonTax,
      totalPrice: product.basePrice + product.carbonTax,
      date: new Date().toISOString().split('T')[0],
      paymentMethod,
      txHash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 8)}`,
      co2Emission: product.co2Emission
    };

    setUser(prev => ({
      ...prev,
      purchases: [purchase, ...prev.purchases],
      totalTaxPaid: prev.totalTaxPaid + product.carbonTax,
      purchaseCount: prev.purchaseCount + 1,
      walletBalance: paymentMethod === 'Token Wallet' ? prev.walletBalance - (product.basePrice + product.carbonTax) : prev.walletBalance
    }));

    setSelectedProduct(null);
  };

  const handleAdminLogin = (isAuthenticated: boolean) => {
    setIsAdminAuthenticated(isAuthenticated);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentPage('home');
  };

  const handleUserLogin = (userData: User) => {
    setCurrentUser(userData);
    setCurrentPage('home');
  };

  const handleUserLogout = () => {
    setCurrentUser(null);
    setCurrentPage('auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {currentPage === 'home' && (
        <HomePage 
          onNavigate={setCurrentPage}
          totalTaxCollected={governmentWallet.totalCollected}
          projectsData={renewableProjects}
          co2OffsetAchieved={16500}
          purchases={user.purchases}
        />
      )}
      
      {currentPage === 'calculator' && (
        <CarbonCalculator 
          onNavigate={setCurrentPage}
          products={products}
        />
      )}
      
      {currentPage === 'manufacturer' && (
        <ManufacturerPortal 
          onNavigate={setCurrentPage}
          userRole={currentUser?.role || 'consumer'}
        />
      )}
      
      {currentPage === 'transparency' && (
        <TaxTransparencyPortal 
          onNavigate={setCurrentPage}
          purchases={user.purchases}
          projects={renewableProjects}
          totalCollected={governmentWallet.totalCollected}
        />
      )}
      
      {currentPage === 'projects' && (
        <RenewableProjectsPage 
          onNavigate={setCurrentPage}
          projects={renewableProjects}
        />
      )}
      
      {currentPage === 'wallet' && (
        <GovernmentWalletPage 
          onNavigate={setCurrentPage}
          wallet={governmentWallet}
          transactions={user.purchases}
        />
      )}
      
      {currentPage === 'auth' && (
        <AuthenticationPage 
          onNavigate={setCurrentPage}
          onLogin={handleUserLogin}
        />
      )}
      
      {currentPage === 'admin-login' && (
        <AdminLogin 
          onNavigate={setCurrentPage}
          onAdminLogin={handleAdminLogin}
        />
      )}
      
      {currentPage === 'products' && (
        <ProductListPage 
          products={products}
          onNavigate={setCurrentPage}
          onProductSelect={setSelectedProduct}
        />
      )}
      
      {currentPage === 'user-dashboard' && (
        <UserDashboard 
          user={user}
          onNavigate={setCurrentPage}
        />
      )}
      
      {currentPage === 'admin-dashboard' && isAdminAuthenticated && (
        <AdminDashboard 
          onNavigate={setCurrentPage}
          onAdminLogout={handleAdminLogout}
          purchases={user.purchases}
        />
      )}
      
      {currentPage === 'admin-dashboard' && !isAdminAuthenticated && (
        <AdminLogin 
          onNavigate={setCurrentPage}
          onAdminLogin={handleAdminLogin}
        />
      )}

      {selectedProduct && (
        <PurchaseModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onPurchase={handlePurchase}
          userWalletBalance={user.walletBalance}
        />
      )}

      <Toaster />
    </div>
  );
}
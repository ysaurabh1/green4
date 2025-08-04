import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { ArrowLeft, Wallet, Shield, ExternalLink, Download, RefreshCw, Copy, CheckCircle } from 'lucide-react';
import { GovernmentWallet, Purchase } from '../App';
import { toast } from 'sonner@2.0.3';

interface GovernmentWalletPageProps {
  onNavigate: (page: 'home' | 'products' | 'user-dashboard' | 'admin-dashboard' | 'admin-login' | 'calculator' | 'manufacturer' | 'transparency' | 'projects' | 'wallet' | 'auth') => void;
  wallet: GovernmentWallet;
  transactions: Purchase[];
}

export function GovernmentWalletPage({ onNavigate, wallet, transactions }: GovernmentWalletPageProps) {
  const [refreshing, setRefreshing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate blockchain refresh
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
    toast.success('Wallet balance updated from blockchain');
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    toast.success('Wallet address copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    const csvContent = [
      ['Date', 'Product', 'Tax Amount', 'TX Hash', 'Status'],
      ...transactions.map(tx => [
        tx.date,
        tx.productName,
        tx.carbonTax.toString(),
        tx.txHash || '',
        'Verified'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'government_wallet_audit_trail.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Audit trail downloaded successfully');
  };

  // Calculate efficiency percentage
  const efficiencyPercentage = Math.round((wallet.totalSpent / wallet.totalCollected) * 100);

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
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl text-gray-900">Government Carbon Tax Wallet</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Wallet Address Card */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wallet className="h-5 w-5 mr-2 text-green-600" />
              Official Government Wallet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Wallet Address</label>
                <div className="flex items-center space-x-2 mt-1">
                  <code className="bg-gray-100 px-3 py-2 rounded text-sm flex-1">
                    {wallet.address}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopyAddress}
                    className="flex-shrink-0"
                  >
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open('https://etherscan.io', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Badge variant="default" className="bg-green-600">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified Government Wallet
                </Badge>
                <Badge variant="secondary">
                  Multi-Signature Enabled
                </Badge>
                <Badge variant="secondary">
                  Public Audit Trail
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Balance */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Current Balance</CardTitle>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleRefresh}
                disabled={refreshing}
                className="p-1 h-auto"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-green-600">₹{(wallet.balance / 10000000).toFixed(2)} Cr</div>
              <p className="text-xs text-muted-foreground">
                Live balance from blockchain
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Total Collected</CardTitle>
              <Wallet className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-blue-600">₹{(wallet.totalCollected / 10000000).toFixed(2)} Cr</div>
              <p className="text-xs text-muted-foreground">
                All-time carbon tax collection
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Total Spent</CardTitle>
              <ExternalLink className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-purple-600">₹{(wallet.totalSpent / 10000000).toFixed(2)} Cr</div>
              <p className="text-xs text-muted-foreground">
                On renewable energy projects
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Verified Transactions</CardTitle>
              <Shield className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-green-600">{wallet.verifiedTransactions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                100% transparency achieved
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Fund Utilization */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle>Fund Utilization Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Funds Deployed for Renewable Projects</span>
                <span className="text-green-600">{efficiencyPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-600 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${efficiencyPercentage}%` }}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h4 className="text-green-800">Renewable Energy</h4>
                  <p className="text-2xl text-green-600">{efficiencyPercentage}%</p>
                  <p className="text-sm text-green-600">₹{(wallet.totalSpent / 10000000).toFixed(1)} Cr deployed</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h4 className="text-blue-800">Available for Projects</h4>
                  <p className="text-2xl text-blue-600">{100 - efficiencyPercentage}%</p>
                  <p className="text-sm text-blue-600">₹{(wallet.balance / 10000000).toFixed(1)} Cr ready</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <h4 className="text-purple-800">Administrative</h4>
                  <p className="text-2xl text-purple-600">0%</p>
                  <p className="text-sm text-purple-600">No admin fees charged</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Verified Spending Records</CardTitle>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={handleDownloadCSV}>
                <Download className="h-4 w-4 mr-2" />
                Download CSV
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => window.open('https://etherscan.io', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Blockchain
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Product/Source</TableHead>
                    <TableHead>Tax Amount</TableHead>
                    <TableHead>Transaction Hash</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.slice(0, 10).map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.productName}</TableCell>
                      <TableCell className="text-green-600">₹{transaction.carbonTax.toLocaleString()}</TableCell>
                      <TableCell>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {transaction.txHash}
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-green-600">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => window.open('https://etherscan.io', '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {transactions.length > 10 && (
              <div className="text-center mt-4">
                <Button variant="outline">
                  Load More Transactions
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Audit Information */}
        <div className="mt-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Audit & Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="mb-3">Blockchain Audit Trail</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• All transactions immutably recorded on blockchain</li>
                    <li>• Multi-signature wallet requires 3/5 government approvals</li>
                    <li>• Smart contract automatically deploys funds to approved projects</li>
                    <li>• Real-time public visibility of all fund movements</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3">Compliance Standards</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• ISO 14001 Environmental Management compliance</li>
                    <li>• Paris Agreement contribution tracking</li>
                    <li>• UN Sustainable Development Goals alignment</li>
                    <li>• Regular third-party financial audits</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
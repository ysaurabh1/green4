import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { 
  BarChart3, 
  Plus, 
  FileText, 
  ArrowLeft, 
  DollarSign, 
  TreePine, 
  Users,
  Upload,
  LogOut
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { Purchase } from '../App';

interface AdminDashboardProps {
  onNavigate: (page: 'home' | 'products' | 'user-dashboard' | 'admin-dashboard' | 'admin-login') => void;
  onAdminLogout: () => void;
  purchases: Purchase[];
}

export function AdminDashboard({ onNavigate, onAdminLogout, purchases }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'add-project' | 'logs'>('overview');
  const [projectName, setProjectName] = useState('');
  const [projectBudget, setProjectBudget] = useState('');

  // Calculate admin stats
  const totalTaxCollected = purchases.reduce((sum, p) => sum + p.carbonTax, 0);
  const activeProjects = 8; // Mock data
  const fundSpent = Math.floor(totalTaxCollected * 0.7); // 70% spent

  const sidebarItems = [
    { id: 'overview', icon: BarChart3, label: 'Overview' },
    { id: 'add-project', icon: Plus, label: 'Add Project' },
    { id: 'logs', icon: FileText, label: 'Transaction Logs' }
  ];

  const mockProjects = [
    { id: 1, name: 'Amazon Reforestation', budget: 150000, spent: 120000, status: 'Active' },
    { id: 2, name: 'Solar Farm Gujarat', budget: 300000, spent: 280000, status: 'Active' },
    { id: 3, name: 'Ocean Cleanup', budget: 200000, spent: 50000, status: 'Active' }
  ];

  const mockTransactions = purchases.map(purchase => ({
    id: purchase.id,
    userName: 'User ' + purchase.id.slice(-3),
    taxAmount: purchase.carbonTax,
    date: purchase.date,
    purpose: 'Product Purchase Tax'
  }));

  const handleAddProject = () => {
    if (!projectName || !projectBudget) {
      toast.error('Please fill in all fields');
      return;
    }
    
    toast.success('Project added successfully!');
    setProjectName('');
    setProjectBudget('');
  };

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
          <h2 className="text-gray-900">Admin Dashboard</h2>
          <p className="text-sm text-gray-600">Carbon Tax Management</p>
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
              onClick={onAdminLogout}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Admin Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl text-gray-900 mb-2">System Overview</h1>
              <p className="text-gray-600">Monitor carbon tax collection and environmental projects</p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm text-gray-600">Total Tax Collected</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-gray-900">₹{totalTaxCollected.toLocaleString()}</div>
                  <p className="text-xs text-green-600 mt-1">From all transactions</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm text-gray-600">Active Projects</CardTitle>
                  <TreePine className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-gray-900">{activeProjects}</div>
                  <p className="text-xs text-blue-600 mt-1">Environmental initiatives</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm text-gray-600">Fund Deployed</CardTitle>
                  <Users className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-gray-900">₹{fundSpent.toLocaleString()}</div>
                  <p className="text-xs text-orange-600 mt-1">70% of collected tax</p>
                </CardContent>
              </Card>
            </div>

            {/* Projects Table */}
            <Card>
              <CardHeader>
                <CardTitle>Current Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Name</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Spent</TableHead>
                      <TableHead>Remaining</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockProjects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="text-gray-900">{project.name}</TableCell>
                        <TableCell>₹{project.budget.toLocaleString()}</TableCell>
                        <TableCell className="text-green-600">₹{project.spent.toLocaleString()}</TableCell>
                        <TableCell>₹{(project.budget - project.spent).toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-700">{project.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'add-project' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl text-gray-900 mb-2">Add New Project</h1>
              <p className="text-gray-600">Create a new environmental project to allocate carbon tax funds</p>
            </div>

            <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g., Mangrove Restoration Project"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-budget">Project Budget (₹)</Label>
                  <Input
                    id="project-budget"
                    type="number"
                    value={projectBudget}
                    onChange={(e) => setProjectBudget(e.target.value)}
                    placeholder="e.g., 250000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-image">Project Image</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload project image</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={handleAddProject} className="bg-green-600 hover:bg-green-700 text-white">
                    Create Project
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setProjectName('');
                      setProjectBudget('');
                    }}
                  >
                    Clear Form
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl text-gray-900 mb-2">Transaction Logs</h1>
              <p className="text-gray-600">Complete record of all carbon tax transactions</p>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>User Name</TableHead>
                      <TableHead>Tax Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Purpose</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="text-gray-600">#{transaction.id.slice(-8)}</TableCell>
                        <TableCell className="text-gray-900">{transaction.userName}</TableCell>
                        <TableCell className="text-green-600">₹{transaction.taxAmount.toLocaleString()}</TableCell>
                        <TableCell className="text-gray-600">{transaction.date}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{transaction.purpose}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Export Options */}
            <div className="flex space-x-4">
              <Button variant="outline">
                Export CSV
              </Button>
              <Button variant="outline">
                Export PDF
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Generate Report
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
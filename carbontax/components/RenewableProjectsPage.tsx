import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, MapPin, Calendar, DollarSign, TreePine, ExternalLink, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RenewableProject } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RenewableProjectsPageProps {
  onNavigate: (page: 'home' | 'products' | 'user-dashboard' | 'admin-dashboard' | 'admin-login' | 'calculator' | 'manufacturer' | 'transparency' | 'projects' | 'wallet' | 'auth') => void;
  projects: RenewableProject[];
}

export function RenewableProjectsPage({ onNavigate, projects }: RenewableProjectsPageProps) {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredProjects = projects.filter(project => {
    const matchesType = !typeFilter || typeFilter === 'all' || project.type === typeFilter;
    const matchesStatus = !statusFilter || statusFilter === 'all' || project.status === statusFilter;
    return matchesType && matchesStatus;
  });

  const totalInvestment = projects.reduce((sum, project) => sum + project.amountInvested, 0);
  const totalCO2Reduction = projects.reduce((sum, project) => sum + project.co2ReductionEstimate, 0);
  const completedProjects = projects.filter(p => p.status === 'completed').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'ongoing': return 'secondary';
      case 'planned': return 'outline';
      default: return 'outline';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'solar': return '☀️';
      case 'wind': return '💨';
      case 'hydro': return '💧';
      default: return '⚡';
    }
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
                <TreePine className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl text-gray-900">Renewable Energy Projects</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Total Projects</CardTitle>
              <TreePine className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-green-600">{projects.length}</div>
              <p className="text-xs text-muted-foreground">
                {completedProjects} completed, {projects.length - completedProjects} in progress
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Total Investment</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-blue-600">₹{(totalInvestment / 10000000).toFixed(1)} Cr</div>
              <p className="text-xs text-muted-foreground">
                From carbon tax collections
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">CO₂ Impact</CardTitle>
              <TreePine className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-green-600">{totalCO2Reduction.toLocaleString()} tons</div>
              <p className="text-xs text-muted-foreground">
                Annual CO₂ reduction target
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Clean Energy</CardTitle>
              <span className="text-lg">⚡</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-purple-600">2,500 MW</div>
              <p className="text-xs text-muted-foreground">
                Renewable capacity added
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filter Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm">Project Type</label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="solar">Solar Energy</SelectItem>
                    <SelectItem value="wind">Wind Energy</SelectItem>
                    <SelectItem value="hydro">Hydro Energy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="planned">Planned</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  onClick={() => {
                    setTypeFilter('all');
                    setStatusFilter('all');
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative">
                <ImageWithFallback
                  src={project.image}
                  alt={project.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 text-2xl bg-white rounded-full w-10 h-10 flex items-center justify-center">
                  {getTypeIcon(project.type)}
                </div>
              </div>

              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <span>{project.name}</span>
                </CardTitle>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {project.location}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Investment</p>
                    <p className="text-lg text-blue-600">₹{(project.amountInvested / 10000000).toFixed(1)} Cr</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">CO₂ Impact</p>
                    <p className="text-lg text-green-600">{project.co2ReductionEstimate} tons/year</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Fund Source</p>
                  <p className="text-sm bg-gray-100 p-2 rounded">{project.fundSource}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    Funded 2024
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open('https://etherscan.io', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View TX
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <TreePine className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg text-gray-600 mb-2">No Projects Found</h3>
            <p className="text-gray-500">
              Try adjusting your filters to see more projects
            </p>
          </div>
        )}

        {/* Impact Summary */}
        <div className="mt-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Environmental Impact Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <h3 className="text-lg mb-2">Global Impact</h3>
                  <p className="text-sm text-gray-600">
                    These projects contribute to India's commitment to achieve 500 GW renewable energy capacity by 2030
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👥</span>
                  </div>
                  <h3 className="text-lg mb-2">Community Benefits</h3>
                  <p className="text-sm text-gray-600">
                    Creating local jobs and providing clean energy access to rural communities across India
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔮</span>
                  </div>
                  <h3 className="text-lg mb-2">Future Projects</h3>
                  <p className="text-sm text-gray-600">
                    More projects planned as carbon tax collections grow, targeting 100% renewable energy
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
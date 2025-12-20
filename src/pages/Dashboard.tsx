import React from 'react';
import { Header } from '@/components/layout/Header';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AlertCard } from '@/components/dashboard/AlertCard';
import { ViolationPieChart } from '@/components/charts/ViolationPieChart';
import { TrendLineChart } from '@/components/charts/TrendLineChart';
import { LocationBarChart } from '@/components/charts/LocationBarChart';
import {
  mockDashboardStats,
  mockAlerts,
  violationsByTypeData,
  violationsByLocationData,
  timeBasedTrendsData,
} from '@/data/mockData';
import {
  AlertTriangle,
  Camera,
  WifiOff,
  FolderOpen,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const recentAlerts = mockAlerts.slice(0, 4);

  return (
    <div className="min-h-screen">
      <Header
        title="Dashboard"
        subtitle="Real-time surveillance overview"
      />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Violations Today"
            value={mockDashboardStats.totalViolationsToday}
            change={mockDashboardStats.violationChange}
            trend="up"
            icon={AlertTriangle}
            iconColor="text-violation-cigarette"
          />
          <StatsCard
            title="Active Cameras"
            value={mockDashboardStats.activeCameras}
            icon={Camera}
            iconColor="text-status-online"
          />
          <StatsCard
            title="Cameras Offline"
            value={mockDashboardStats.offlineCameras}
            icon={WifiOff}
            iconColor="text-status-offline"
          />
          <StatsCard
            title="Open Cases"
            value={mockDashboardStats.openCases}
            icon={FolderOpen}
            iconColor="text-status-warning"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ViolationPieChart data={violationsByTypeData} />
          <div className="lg:col-span-2">
            <TrendLineChart
              data={timeBasedTrendsData}
              title="Violation Trends (Today)"
              xKey="time"
            />
          </div>
        </div>

        {/* Location Chart */}
        <LocationBarChart data={violationsByLocationData} />

        {/* Recent Alerts */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Recent Alerts
              </h3>
              <p className="text-sm text-muted-foreground">
                Latest detection events from active cameras
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate('/alerts')}>
              View All
              <TrendingUp className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentAlerts.map((alert, index) => (
              <div key={alert.id} style={{ animationDelay: `${index * 100}ms` }}>
                <AlertCard
                  alert={alert}
                  onClick={() => navigate(`/alerts/${alert.id}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React from 'react';
import { Header } from '@/components/layout/Header';
import { ViolationPieChart } from '@/components/charts/ViolationPieChart';
import { TrendLineChart } from '@/components/charts/TrendLineChart';
import { LocationBarChart } from '@/components/charts/LocationBarChart';
import {
  violationsByTypeData,
  violationsByLocationData,
  timeBasedTrendsData,
  weeklyTrendsData,
} from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Download,
  FileText,
  Calendar,
  TrendingUp,
  TrendingDown,
  BarChart3,
} from 'lucide-react';

const Analytics: React.FC = () => {
  const summaryStats = [
    { label: 'Total Violations', value: '2,847', change: 12.5, trend: 'up' },
    { label: 'Average per Day', value: '94', change: -5.2, trend: 'down' },
    { label: 'Peak Hour', value: '4:00 PM', change: 0, trend: 'neutral' },
    { label: 'Most Common', value: 'Cigarette', change: 0, trend: 'neutral' },
  ];

  return (
    <div className="min-h-screen">
      <Header
        title="Analytics & Reports"
        subtitle="Comprehensive violation statistics and trends"
      />

      <div className="p-6 space-y-6">
        {/* Controls */}
        <div className="glass-card rounded-xl p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Last 30 Days
              </Button>
              <Badge variant="secondary">Jan 1 - Jan 30, 2024</Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryStats.map((stat, index) => (
            <div
              key={index}
              className="glass-card rounded-xl p-5 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                {stat.trend !== 'neutral' && (
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      stat.trend === 'up' ? 'text-status-offline' : 'text-status-online'
                    }`}
                  >
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{Math.abs(stat.change)}%</span>
                  </div>
                )}
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ViolationPieChart data={violationsByTypeData} />
          <TrendLineChart
            data={weeklyTrendsData}
            title="Weekly Trends"
            xKey="day"
          />
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrendLineChart
            data={timeBasedTrendsData}
            title="Hourly Distribution"
            xKey="time"
          />
          <LocationBarChart data={violationsByLocationData} />
        </div>

        {/* Heatmap Placeholder */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Violation Heatmap
              </h3>
              <p className="text-sm text-muted-foreground">
                Distribution of violations by day and hour
              </p>
            </div>
            <Button variant="outline" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Customize
            </Button>
          </div>

          {/* Heatmap Grid */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-12 text-xs text-muted-foreground">Mon</span>
              <div className="flex-1 grid grid-cols-24 gap-1">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-sm"
                    style={{
                      backgroundColor: `hsl(var(--primary) / ${Math.random() * 0.8 + 0.1})`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-12 text-xs text-muted-foreground">Tue</span>
              <div className="flex-1 grid grid-cols-24 gap-1">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-sm"
                    style={{
                      backgroundColor: `hsl(var(--primary) / ${Math.random() * 0.8 + 0.1})`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-12 text-xs text-muted-foreground">Wed</span>
              <div className="flex-1 grid grid-cols-24 gap-1">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-sm"
                    style={{
                      backgroundColor: `hsl(var(--primary) / ${Math.random() * 0.8 + 0.1})`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-12 text-xs text-muted-foreground">Thu</span>
              <div className="flex-1 grid grid-cols-24 gap-1">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-sm"
                    style={{
                      backgroundColor: `hsl(var(--primary) / ${Math.random() * 0.8 + 0.1})`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-12 text-xs text-muted-foreground">Fri</span>
              <div className="flex-1 grid grid-cols-24 gap-1">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-sm"
                    style={{
                      backgroundColor: `hsl(var(--primary) / ${Math.random() * 0.8 + 0.1})`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-12 text-xs text-muted-foreground">Sat</span>
              <div className="flex-1 grid grid-cols-24 gap-1">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-sm"
                    style={{
                      backgroundColor: `hsl(var(--primary) / ${Math.random() * 0.6})`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-12 text-xs text-muted-foreground">Sun</span>
              <div className="flex-1 grid grid-cols-24 gap-1">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-sm"
                    style={{
                      backgroundColor: `hsl(var(--primary) / ${Math.random() * 0.4})`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-xs text-muted-foreground">Less</span>
            <div className="flex gap-1">
              {[0.1, 0.3, 0.5, 0.7, 0.9].map((opacity) => (
                <div
                  key={opacity}
                  className="w-4 h-4 rounded-sm"
                  style={{
                    backgroundColor: `hsl(var(--primary) / ${opacity})`,
                  }}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

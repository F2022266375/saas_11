import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { AlertCard } from '@/components/dashboard/AlertCard';
import { mockAlerts, ViolationType, AlertStatus, getViolationTypeLabel } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Filter,
  Calendar,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const violationTypes: ViolationType[] = ['cigarette', 'vape', 'cake', 'csd'];
const alertStatuses: AlertStatus[] = ['new', 'reviewed', 'dismissed', 'escalated'];

const Alerts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<ViolationType[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<AlertStatus[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleType = (type: ViolationType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleStatus = (status: AlertStatus) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedStatuses([]);
    setSearchQuery('');
  };

  const filteredAlerts = mockAlerts.filter((alert) => {
    const matchesSearch =
      searchQuery === '' ||
      alert.cameraName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(alert.type);

    const matchesStatus =
      selectedStatuses.length === 0 || selectedStatuses.includes(alert.status);

    return matchesSearch && matchesType && matchesStatus;
  });

  const hasActiveFilters =
    selectedTypes.length > 0 || selectedStatuses.length > 0 || searchQuery !== '';

  const newAlertsCount = mockAlerts.filter((a) => a.status === 'new').length;

  return (
    <div className="min-h-screen">
      <Header
        title="Violation Alerts"
        subtitle={`${newAlertsCount} new alerts requiring attention`}
      />

      <div className="p-6 space-y-6">
        {/* Search and Filter Bar */}
        <div className="glass-card rounded-xl p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by camera, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant={showFilters ? 'secondary' : 'outline'}
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <Badge variant="default" className="ml-2 h-5 min-w-5 px-1.5">
                    {selectedTypes.length + selectedStatuses.length}
                  </Badge>
                )}
              </Button>

              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Date Range
              </Button>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-border space-y-4 animate-slide-up">
              {/* Violation Types */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Violation Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {violationTypes.map((type) => (
                    <Button
                      key={type}
                      variant={selectedTypes.includes(type) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => toggleType(type)}
                      className={cn(
                        selectedTypes.includes(type) &&
                          (type === 'cigarette' || type === 'vape'
                            ? 'bg-violation-cigarette hover:bg-violation-cigarette/90'
                            : type === 'cake'
                            ? 'bg-violation-cake hover:bg-violation-cake/90'
                            : 'bg-violation-csd hover:bg-violation-csd/90')
                      )}
                    >
                      {type === 'cigarette' && '🚬'}
                      {type === 'vape' && '💨'}
                      {type === 'cake' && '🍰'}
                      {type === 'csd' && '🥤'}
                      <span className="ml-1">{getViolationTypeLabel(type)}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {alertStatuses.map((status) => (
                    <Button
                      key={status}
                      variant={selectedStatuses.includes(status) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => toggleStatus(status)}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredAlerts.length} of {mockAlerts.length} alerts
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Button variant="ghost" size="sm">
              Newest First
            </Button>
          </div>
        </div>

        {/* Alert Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredAlerts.map((alert, index) => (
            <div
              key={alert.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <AlertCard alert={alert} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAlerts.length === 0 && (
          <div className="glass-card rounded-xl p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No alerts found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters to see more results.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;

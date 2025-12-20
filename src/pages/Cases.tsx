import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { mockCases, CaseStatus, getViolationTypeLabel } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Search,
  Plus,
  ChevronRight,
  User,
  Clock,
  MapPin,
  FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const statusConfig: Record<CaseStatus, { label: string; variant: string }> = {
  open: { label: 'Open', variant: 'destructive' },
  under_review: { label: 'Under Review', variant: 'warning' },
  closed: { label: 'Closed', variant: 'secondary' },
};

const Cases: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<CaseStatus | 'all'>('all');
  const [selectedCase, setSelectedCase] = useState(mockCases[0]);

  const filteredCases = mockCases.filter((c) => {
    const matchesSearch =
      searchQuery === '' ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || c.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen">
      <Header
        title="Case Management"
        subtitle="Track and manage violation cases"
      />

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cases List */}
          <div className="lg:col-span-1 space-y-4">
            {/* Search and Filters */}
            <div className="glass-card rounded-xl p-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search cases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                {(['all', 'open', 'under_review', 'closed'] as const).map((status) => (
                  <Button
                    key={status}
                    variant={selectedStatus === status ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedStatus(status)}
                    className="flex-1"
                  >
                    {status === 'all'
                      ? 'All'
                      : status === 'under_review'
                      ? 'Review'
                      : status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Cases List */}
            <div className="space-y-2">
              {filteredCases.map((caseItem) => (
                <button
                  key={caseItem.id}
                  className={cn(
                    'w-full glass-card rounded-xl p-4 text-left transition-all',
                    'hover:shadow-md',
                    selectedCase.id === caseItem.id &&
                      'ring-2 ring-primary ring-offset-2 ring-offset-background'
                  )}
                  onClick={() => setSelectedCase(caseItem)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="font-mono font-semibold text-foreground">
                        {caseItem.id}
                      </span>
                      <Badge
                        variant={caseItem.violationType as any}
                        className="ml-2"
                      >
                        {caseItem.violationType}
                      </Badge>
                    </div>
                    <Badge
                      variant={
                        caseItem.status === 'open'
                          ? 'destructive'
                          : caseItem.status === 'under_review'
                          ? 'warning'
                          : 'secondary'
                      }
                    >
                      {statusConfig[caseItem.status].label}
                    </Badge>
                  </div>

                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{caseItem.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5" />
                      <span>{caseItem.assignedOfficer}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(caseItem.createdAt), 'PPp')}
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </button>
              ))}

              {filteredCases.length === 0 && (
                <div className="glass-card rounded-xl p-8 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No cases found</p>
                </div>
              )}
            </div>
          </div>

          {/* Case Details */}
          <div className="lg:col-span-2 glass-card rounded-xl p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold font-mono">{selectedCase.id}</h2>
                  <Badge
                    variant={
                      selectedCase.status === 'open'
                        ? 'destructive'
                        : selectedCase.status === 'under_review'
                        ? 'warning'
                        : 'secondary'
                    }
                    className="text-sm"
                  >
                    {statusConfig[selectedCase.status].label}
                  </Badge>
                </div>
                <p className="text-muted-foreground">
                  Created {format(new Date(selectedCase.createdAt), 'PPP')}
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline">Edit Case</Button>
                {selectedCase.status !== 'closed' && (
                  <Button variant="default">Update Status</Button>
                )}
              </div>
            </div>

            {/* Status Workflow */}
            <div className="glass-card bg-secondary/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                {['open', 'under_review', 'closed'].map((status, index) => (
                  <React.Fragment key={status}>
                    <div
                      className={cn(
                        'flex flex-col items-center',
                        selectedCase.status === status && 'text-primary'
                      )}
                    >
                      <div
                        className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center mb-2',
                          selectedCase.status === status
                            ? 'bg-primary text-primary-foreground'
                            : ['open', 'under_review', 'closed'].indexOf(status) <
                              ['open', 'under_review', 'closed'].indexOf(selectedCase.status)
                            ? 'bg-status-online text-white'
                            : 'bg-muted text-muted-foreground'
                        )}
                      >
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium">
                        {status === 'open'
                          ? 'Open'
                          : status === 'under_review'
                          ? 'Under Review'
                          : 'Closed'}
                      </span>
                    </div>
                    {index < 2 && (
                      <div
                        className={cn(
                          'flex-1 h-1 mx-4 rounded-full',
                          ['open', 'under_review', 'closed'].indexOf(status) <
                            ['open', 'under_review', 'closed'].indexOf(selectedCase.status)
                            ? 'bg-status-online'
                            : 'bg-muted'
                        )}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">Violation Type</label>
                <div className="flex items-center gap-2">
                  <Badge variant={selectedCase.violationType as any}>
                    {getViolationTypeLabel(selectedCase.violationType)}
                  </Badge>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">Location</label>
                <p className="font-medium">{selectedCase.location}</p>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">Assigned Officer</label>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {selectedCase.assignedOfficer.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium">{selectedCase.assignedOfficer}</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">Related Alerts</label>
                <p className="font-medium">{selectedCase.alertIds.length} alert(s)</p>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Case Notes</h3>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Note
                </Button>
              </div>

              <div className="space-y-2">
                {selectedCase.notes.map((note, index) => (
                  <div key={index} className="bg-secondary/50 rounded-lg p-3">
                    <p className="text-sm">{note}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {format(new Date(selectedCase.updatedAt), 'PPp')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cases;

import React, { useMemo } from 'react';
import { Users, UserCheck, DollarSign, Activity } from 'lucide-react';
import { Card } from '../common/Card';
import { formatCurrency } from '../../utils/formatters';
import './SummaryCards.css';

const SummaryCard = ({ title, value, icon, colorClass }) => (
  <Card className="summary-card">
    <div className={`summary-icon-wrapper ${colorClass}`}>
      {icon}
    </div>
    <div className="summary-content">
      <span className="summary-label">{title}</span>
      <span className="summary-value">{value}</span>
    </div>
  </Card>
);

export const SummaryCards = ({ data }) => {
  const metrics = useMemo(() => {
    if (!data || data.length === 0) return { total: 0, active: 0, avgSalary: 0, avgRating: 0 };
    
    const total = data.length;
    const active = data.filter(e => e.isActive).length;
    const totalSalary = data.reduce((sum, e) => sum + e.salary, 0);
    const totalRating = data.reduce((sum, e) => sum + e.performanceRating, 0);
    
    return {
      total,
      active,
      avgSalary: totalSalary / total,
      avgRating: Math.round(totalRating / total)
    };
  }, [data]);

  return (
    <div className="summary-cards-container">
      <SummaryCard 
        title="Total Employees" 
        value={metrics.total} 
        icon={<Users size={24} />} 
        colorClass="summary-icon-primary"
      />
      <SummaryCard 
        title="Active Employees" 
        value={metrics.active} 
        icon={<UserCheck size={24} />} 
        colorClass="summary-icon-success"
      />
      <SummaryCard 
        title="Average Salary" 
        value={formatCurrency(metrics.avgSalary)} 
        icon={<DollarSign size={24} />} 
        colorClass="summary-icon-warning"
      />
      <SummaryCard 
        title="Avg Performance" 
        value={`${metrics.avgRating}%`} 
        icon={<Activity size={24} />} 
        colorClass="summary-icon-info"
      />
    </div>
  );
};

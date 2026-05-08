import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Card } from '../common/Card';
import { formatCurrency } from '../../utils/formatters';
import './AnalyticsCharts.css';

export const AnalyticsCharts = ({ data }) => {
  // Process data for Department Pie Chart
  const deptData = useMemo(() => {
    if (!data) return [];
    const counts = data.reduce((acc, emp) => {
      acc[emp.department] = (acc[emp.department] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [data]);

  // Process data for Salary by Department Bar Chart
  const salaryData = useMemo(() => {
    if (!data) return [];
    const deptStats = data.reduce((acc, emp) => {
      if (!acc[emp.department]) {
        acc[emp.department] = { sum: 0, count: 0 };
      }
      acc[emp.department].sum += emp.salary;
      acc[emp.department].count += 1;
      return acc;
    }, {});

    return Object.entries(deptStats).map(([name, stats]) => ({
      name,
      avgSalary: Math.round(stats.sum / stats.count)
    }));
  }, [data]);

  const COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: 'var(--surface-color)', padding: '10px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <p style={{ color: 'var(--text-primary)', margin: 0, fontWeight: 600 }}>{label || payload[0].name}</p>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            {payload[0].dataKey === 'avgSalary' 
              ? `Avg Salary: ${formatCurrency(payload[0].value)}` 
              : `Count: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="charts-container">
      <Card className="chart-card">
        <h3 className="chart-header">Employees per Department</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={deptData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {deptData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: 'var(--text-primary)' }}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="chart-card">
        <h3 className="chart-header">Average Salary by Department</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salaryData} margin={{ top: 10, right: 10, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--bg-color)' }} />
              <Bar dataKey="avgSalary" fill="var(--primary-color)" radius={[4, 4, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

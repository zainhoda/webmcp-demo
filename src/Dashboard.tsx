import { useSyncExternalStore } from 'react';
import { dashboardManager } from './DashboardManager';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import './App.css';

export function Dashboard() {
  const state = useSyncExternalStore(
    (l) => dashboardManager.subscribe(l),
    () => dashboardManager.getState()
  );

  const { selectedPeriod, selectedChart, highlightedMetric } = state;

  const monthlySales = dashboardManager.getFilteredSalesData(selectedPeriod);
  const productCategories = dashboardManager.getProductCategoryData();
  const regionalSales = dashboardManager.getRegionalSalesData();
  const dailyTraffic = dashboardManager.getDailyTrafficData();
  const metrics = dashboardManager.getDashboardMetrics();

  return (
    <div className="app dashboard">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="logo">📊 Analytics Dashboard</h1>
          <div className="period-selector">
            <button
              className={selectedPeriod === 'monthly' ? 'active' : ''}
              onClick={() => dashboardManager.setSelectedPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              className={selectedPeriod === 'quarterly' ? 'active' : ''}
              onClick={() => dashboardManager.setSelectedPeriod('quarterly')}
            >
              Quarterly
            </button>
            <button
              className={selectedPeriod === 'yearly' ? 'active' : ''}
              onClick={() => dashboardManager.setSelectedPeriod('yearly')}
            >
              Yearly
            </button>
          </div>
        </div>
      </header>

      {/* Metrics Cards */}
      <div className="metrics-container">
        <div
          className={`metric-card ${highlightedMetric === 'revenue' ? 'highlighted' : ''}`}
          onClick={() => dashboardManager.setHighlightedMetric('revenue')}
        >
          <div className="metric-icon">💰</div>
          <div className="metric-content">
            <div className="metric-label">Total Revenue</div>
            <div className="metric-value">${metrics.totalRevenue.toLocaleString()}</div>
            <div className="metric-trend positive">↑ {metrics.growthRate}%</div>
          </div>
        </div>

        <div
          className={`metric-card ${highlightedMetric === 'sales' ? 'highlighted' : ''}`}
          onClick={() => dashboardManager.setHighlightedMetric('sales')}
        >
          <div className="metric-icon">🛍️</div>
          <div className="metric-content">
            <div className="metric-label">Total Sales</div>
            <div className="metric-value">{metrics.totalSales.toLocaleString()}</div>
            <div className="metric-trend positive">↑ 8.2%</div>
          </div>
        </div>

        <div
          className={`metric-card ${highlightedMetric === 'customers' ? 'highlighted' : ''}`}
          onClick={() => dashboardManager.setHighlightedMetric('customers')}
        >
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <div className="metric-label">Total Customers</div>
            <div className="metric-value">{metrics.totalCustomers.toLocaleString()}</div>
            <div className="metric-trend positive">↑ 15.3%</div>
          </div>
        </div>

        <div
          className={`metric-card ${highlightedMetric === 'aov' ? 'highlighted' : ''}`}
          onClick={() => dashboardManager.setHighlightedMetric('aov')}
        >
          <div className="metric-icon">📈</div>
          <div className="metric-content">
            <div className="metric-label">Avg Order Value</div>
            <div className="metric-value">${metrics.averageOrderValue.toFixed(2)}</div>
            <div className="metric-trend positive">↑ 4.1%</div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-container">
        {/* Sales & Revenue Chart */}
        <div
          className={`chart-card large ${selectedChart === 'sales' ? 'highlighted' : ''}`}
          onClick={() => dashboardManager.setSelectedChart('sales')}
        >
          <h3>Sales & Revenue Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#718096" />
              <YAxis stroke="#718096" />
              <Tooltip
                contentStyle={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#667eea"
                strokeWidth={3}
                dot={{ fill: '#667eea', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#48bb78"
                strokeWidth={3}
                dot={{ fill: '#48bb78', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Product Categories Chart */}
        <div
          className={`chart-card ${selectedChart === 'categories' ? 'highlighted' : ''}`}
          onClick={() => dashboardManager.setSelectedChart('categories')}
        >
          <h3>Product Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productCategories}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {productCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Regional Sales Chart */}
        <div
          className={`chart-card ${selectedChart === 'regional' ? 'highlighted' : ''}`}
          onClick={() => dashboardManager.setSelectedChart('regional')}
        >
          <h3>Regional Sales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionalSales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="region" stroke="#718096" />
              <YAxis stroke="#718096" />
              <Tooltip
                contentStyle={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="sales" fill="#764ba2" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Traffic Chart */}
        <div
          className={`chart-card large ${selectedChart === 'traffic' ? 'highlighted' : ''}`}
          onClick={() => dashboardManager.setSelectedChart('traffic')}
        >
          <h3>Daily Website Traffic</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dailyTraffic}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#718096" />
              <YAxis stroke="#718096" />
              <Tooltip
                contentStyle={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="visits"
                stackId="1"
                stroke="#f093fb"
                fill="#f093fb"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="conversions"
                stackId="2"
                stroke="#f5576c"
                fill="#f5576c"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Growth Chart */}
        <div className="chart-card">
          <h3>Customer Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#718096" />
              <YAxis stroke="#718096" />
              <Tooltip
                contentStyle={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Area
                type="monotone"
                dataKey="customers"
                stroke="#667eea"
                fill="#667eea"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

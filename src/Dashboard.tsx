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
import { motion } from 'framer-motion';
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
      <motion.header 
        className="header"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header-content">
          <motion.h1 
            className="logo"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 200 }}
          >
            📊 Analytics Dashboard
          </motion.h1>
          <motion.div 
            className="period-selector"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.button
              className={selectedPeriod === 'monthly' ? 'active' : ''}
              onClick={() => dashboardManager.setSelectedPeriod('monthly')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Monthly
            </motion.button>
            <motion.button
              className={selectedPeriod === 'quarterly' ? 'active' : ''}
              onClick={() => dashboardManager.setSelectedPeriod('quarterly')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Quarterly
            </motion.button>
            <motion.button
              className={selectedPeriod === 'yearly' ? 'active' : ''}
              onClick={() => dashboardManager.setSelectedPeriod('yearly')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Yearly
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      {/* Metrics Cards */}
      <motion.div 
        className="metrics-container"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.3
            }
          }
        }}
      >
        <motion.div
          className={`metric-card ${highlightedMetric === 'revenue' ? 'highlighted' : ''}`}
          onClick={() => dashboardManager.setHighlightedMetric('revenue')}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          animate={{ y: highlightedMetric === 'revenue' ? -4 : 0 }}
          whileHover={{ scale: 1.03, y: -8 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <motion.div 
            className="metric-icon"
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          >
            💰
          </motion.div>
          <div className="metric-content">
            <div className="metric-label">Total Revenue</div>
            <motion.div 
              className="metric-value"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
            >
              ${metrics.totalRevenue.toLocaleString()}
            </motion.div>
            <div className="metric-trend positive">↑ {metrics.growthRate}%</div>
          </div>
        </motion.div>

        <motion.div
          className={`metric-card ${highlightedMetric === 'sales' ? 'highlighted' : ''}`}
          onClick={() => dashboardManager.setHighlightedMetric('sales')}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          animate={{ y: highlightedMetric === 'sales' ? -4 : 0 }}
          whileHover={{ scale: 1.03, y: -8 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <motion.div 
            className="metric-icon"
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
          >
            🛍️
          </motion.div>
          <div className="metric-content">
            <div className="metric-label">Total Sales</div>
            <motion.div 
              className="metric-value"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
            >
              {metrics.totalSales.toLocaleString()}
            </motion.div>
            <div className="metric-trend positive">↑ 8.2%</div>
          </div>
        </motion.div>

        <motion.div
          className={`metric-card ${highlightedMetric === 'customers' ? 'highlighted' : ''}`}
          onClick={() => dashboardManager.setHighlightedMetric('customers')}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          animate={{ y: highlightedMetric === 'customers' ? -4 : 0 }}
          whileHover={{ scale: 1.03, y: -8 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <motion.div 
            className="metric-icon"
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
          >
            👥
          </motion.div>
          <div className="metric-content">
            <div className="metric-label">Total Customers</div>
            <motion.div 
              className="metric-value"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
            >
              {metrics.totalCustomers.toLocaleString()}
            </motion.div>
            <div className="metric-trend positive">↑ 15.3%</div>
          </div>
        </motion.div>

        <motion.div
          className={`metric-card ${highlightedMetric === 'aov' ? 'highlighted' : ''}`}
          onClick={() => dashboardManager.setHighlightedMetric('aov')}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          animate={{ y: highlightedMetric === 'aov' ? -4 : 0 }}
          whileHover={{ scale: 1.03, y: -8 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <motion.div 
            className="metric-icon"
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
          >
            📈
          </motion.div>
          <div className="metric-content">
            <div className="metric-label">Avg Order Value</div>
            <motion.div 
              className="metric-value"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
            >
              ${metrics.averageOrderValue.toFixed(2)}
            </motion.div>
            <div className="metric-trend positive">↑ 4.1%</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Charts Grid */}
      <motion.div 
        className="charts-container"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.8
            }
          }
        }}
      >
        {/* Sales & Revenue Chart */}
        <motion.div
          className={`chart-card large ${selectedChart === 'sales' ? 'highlighted' : ''}`}
          onClick={() => dashboardManager.setSelectedChart('sales')}
          variants={{
            hidden: { opacity: 0, scale: 0.8, y: 20 },
            visible: { opacity: 1, scale: 1, y: 0 }
          }}
          animate={{ y: selectedChart === 'sales' ? -4 : 0 }}
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
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
        </motion.div>

        {/* Product Categories Chart */}
        <motion.div
          className={`chart-card ${selectedChart === 'categories' ? 'highlighted' : ''}`}
          onClick={() => dashboardManager.setSelectedChart('categories')}
          variants={{
            hidden: { opacity: 0, scale: 0.8, y: 20 },
            visible: { opacity: 1, scale: 1, y: 0 }
          }}
          animate={{ y: selectedChart === 'categories' ? -4 : 0 }}
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
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
        </motion.div>

        {/* Regional Sales Chart */}
        <motion.div
          className={`chart-card ${selectedChart === 'regional' ? 'highlighted' : ''}`}
          onClick={() => dashboardManager.setSelectedChart('regional')}
          variants={{
            hidden: { opacity: 0, scale: 0.8, y: 20 },
            visible: { opacity: 1, scale: 1, y: 0 }
          }}
          animate={{ y: selectedChart === 'regional' ? -4 : 0 }}
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
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
        </motion.div>

        {/* Daily Traffic Chart */}
        <motion.div
          className={`chart-card large ${selectedChart === 'traffic' ? 'highlighted' : ''}`}
          onClick={() => dashboardManager.setSelectedChart('traffic')}
          variants={{
            hidden: { opacity: 0, scale: 0.8, y: 20 },
            visible: { opacity: 1, scale: 1, y: 0 }
          }}
          animate={{ y: selectedChart === 'traffic' ? -4 : 0 }}
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
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
        </motion.div>

        {/* Customer Growth Chart */}
        <motion.div 
          className="chart-card"
          variants={{
            hidden: { opacity: 0, scale: 0.8, y: 20 },
            visible: { opacity: 1, scale: 1, y: 0 }
          }}
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
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
        </motion.div>
      </motion.div>
    </div>
  );
}

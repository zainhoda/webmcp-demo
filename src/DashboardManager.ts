import {
  monthlySalesData,
  productCategoryData,
  regionalSalesData,
  dailyTrafficData,
  dashboardMetrics,
} from './data/DashboardData';
import type {
  SalesDataPoint,
  ProductCategoryData,
  RegionalSalesData,
  DailyTrafficData,
  DashboardMetrics,
} from './data/DashboardData';

export interface DashboardState {
  selectedPeriod: 'monthly' | 'quarterly' | 'yearly';
  selectedChart: string | null;
  highlightedMetric: string | null;
  modalChart: string | null;
  modalMetric: string | null;
}

class DashboardManager {
  private state: DashboardState = {
    selectedPeriod: 'monthly',
    selectedChart: null,
    highlightedMetric: null,
    modalChart: null,
    modalMetric: null,
  };

  private listeners: Set<() => void> = new Set();

  constructor() {}

  // React Integration
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  // Getters
  getState(): DashboardState {
    return this.state;
  }

  getMonthlySalesData(): SalesDataPoint[] {
    return monthlySalesData;
  }

  getProductCategoryData(): ProductCategoryData[] {
    return productCategoryData;
  }

  getRegionalSalesData(): RegionalSalesData[] {
    return regionalSalesData;
  }

  getDailyTrafficData(): DailyTrafficData[] {
    return dailyTrafficData;
  }

  getDashboardMetrics(): DashboardMetrics {
    return dashboardMetrics;
  }

  getAllDashboardData() {
    return {
      monthlySales: monthlySalesData,
      productCategories: productCategoryData,
      regionalSales: regionalSalesData,
      dailyTraffic: dailyTrafficData,
      metrics: dashboardMetrics,
    };
  }

  // Filter by period
  getFilteredSalesData(period: 'monthly' | 'quarterly' | 'yearly'): SalesDataPoint[] {
    if (period === 'quarterly') {
      // Group by quarters
      const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
      return quarters.map((quarter, index) => {
        const start = index * 3;
        const quarterData = monthlySalesData.slice(start, start + 3);
        return {
          month: quarter,
          sales: quarterData.reduce((sum, d) => sum + d.sales, 0),
          revenue: quarterData.reduce((sum, d) => sum + d.revenue, 0),
          customers: quarterData.reduce((sum, d) => sum + d.customers, 0),
        };
      });
    } else if (period === 'yearly') {
      // Aggregate to yearly
      return [{
        month: '2024',
        sales: monthlySalesData.reduce((sum, d) => sum + d.sales, 0),
        revenue: monthlySalesData.reduce((sum, d) => sum + d.revenue, 0),
        customers: monthlySalesData.reduce((sum, d) => sum + d.customers, 0),
      }];
    }
    return monthlySalesData;
  }

  // Actions
  setSelectedPeriod(period: 'monthly' | 'quarterly' | 'yearly') {
    this.state = { ...this.state, selectedPeriod: period };
    this.notify();
  }

  setSelectedChart(chartName: string | null) {
    this.state = { ...this.state, selectedChart: chartName };
    this.notify();
  }

  setHighlightedMetric(metric: string | null) {
    this.state = { ...this.state, highlightedMetric: metric };
    this.notify();
  }

  setModalChart(chartName: string | null) {
    this.state = { ...this.state, modalChart: chartName };
    this.notify();
  }

  setModalMetric(metric: string | null) {
    this.state = { ...this.state, modalMetric: metric };
    this.notify();
  }

  // Get specific data by chart name
  getDataByChartName(chartName: string) {
    switch (chartName) {
      case 'sales':
        return this.getFilteredSalesData(this.state.selectedPeriod);
      case 'categories':
        return this.getProductCategoryData();
      case 'regional':
        return this.getRegionalSalesData();
      case 'traffic':
        return this.getDailyTrafficData();
      default:
        return this.getAllDashboardData();
    }
  }
}

export const dashboardManager = new DashboardManager();

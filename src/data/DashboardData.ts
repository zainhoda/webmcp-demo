export interface SalesDataPoint {
  month: string;
  sales: number;
  revenue: number;
  customers: number;
}

export interface ProductCategoryData {
  name: string;
  value: number;
  color: string;
}

export interface RegionalSalesData {
  region: string;
  sales: number;
}

export interface DailyTrafficData {
  day: string;
  visits: number;
  conversions: number;
}

export const monthlySalesData: SalesDataPoint[] = [
  { month: 'Jan', sales: 4200, revenue: 24500, customers: 890 },
  { month: 'Feb', sales: 5100, revenue: 31200, customers: 1120 },
  { month: 'Mar', sales: 6300, revenue: 42800, customers: 1450 },
  { month: 'Apr', sales: 5800, revenue: 38900, customers: 1280 },
  { month: 'May', sales: 7200, revenue: 51300, customers: 1680 },
  { month: 'Jun', sales: 8100, revenue: 58700, customers: 1920 },
  { month: 'Jul', sales: 9400, revenue: 67200, customers: 2150 },
  { month: 'Aug', sales: 8700, revenue: 62100, customers: 2010 },
  { month: 'Sep', sales: 7500, revenue: 54800, customers: 1790 },
  { month: 'Oct', sales: 8900, revenue: 64300, customers: 2080 },
  { month: 'Nov', sales: 10200, revenue: 73500, customers: 2340 },
  { month: 'Dec', sales: 11800, revenue: 86400, customers: 2680 },
];

export const productCategoryData: ProductCategoryData[] = [
  { name: 'Electronics', value: 35, color: '#667eea' },
  { name: 'Clothing', value: 25, color: '#764ba2' },
  { name: 'Home & Garden', value: 20, color: '#f093fb' },
  { name: 'Sports', value: 12, color: '#48bb78' },
  { name: 'Books', value: 8, color: '#f5576c' },
];

export const regionalSalesData: RegionalSalesData[] = [
  { region: 'North America', sales: 45000 },
  { region: 'Europe', sales: 38000 },
  { region: 'Asia Pacific', sales: 52000 },
  { region: 'Latin America', sales: 18000 },
  { region: 'Middle East', sales: 12000 },
];

export const dailyTrafficData: DailyTrafficData[] = [
  { day: 'Mon', visits: 3200, conversions: 280 },
  { day: 'Tue', visits: 3800, conversions: 340 },
  { day: 'Wed', visits: 4100, conversions: 390 },
  { day: 'Thu', visits: 4500, conversions: 420 },
  { day: 'Fri', visits: 5200, conversions: 510 },
  { day: 'Sat', visits: 5800, conversions: 580 },
  { day: 'Sun', visits: 4200, conversions: 410 },
];

export interface DashboardMetrics {
  totalRevenue: number;
  totalSales: number;
  totalCustomers: number;
  averageOrderValue: number;
  growthRate: number;
}

export const dashboardMetrics: DashboardMetrics = {
  totalRevenue: 655700,
  totalSales: 93300,
  totalCustomers: 19390,
  averageOrderValue: 70.26,
  growthRate: 12.5,
};

import { dashboardManager } from "./DashboardManager";
import "./Notification.css";

let notificationContainer: HTMLDivElement | null = null;

function createContainer() {
    if (notificationContainer) return notificationContainer;

    notificationContainer = document.createElement("div");
    notificationContainer.className = "notification-container";
    document.body.appendChild(notificationContainer);
    return notificationContainer;
}

export function showAlert(message: string) {
    const container = createContainer();

    const notification = document.createElement("div");
    notification.className = "notification";

    notification.innerHTML = `
        <div class="notification-icon">🔔</div>
        <div class="notification-content">${message}</div>
    `;

    container.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.classList.add("fade-out");
        setTimeout(() => {
            notification.remove();
            // Optional: remove container if empty
            if (container.children.length === 0) {
                // container.remove();
                // notificationContainer = null;
            }
        }, 500); // Wait for fade-out animation
    }, 5000);
}

export function registerWebMCPTools() {
    if (!navigator.modelContext) {
        return;
    }

    navigator.modelContext.registerTool({
        name: "get_dashboard_data",
        description: "Get all dashboard data including sales, revenue, customers, categories, and regional information",
        inputSchema: {
            type: "object",
            properties: {},
        },
        execute: () => {
            showAlert("get_dashboard_data called");
            return dashboardManager.getAllDashboardData();
        }
    });

    navigator.modelContext.registerTool({
        name: "get_sales_data",
        description: "Get sales and revenue data for a specific time period",
        inputSchema: {
            type: "object",
            properties: {
                period: {
                    type: "string",
                    enum: ["monthly", "quarterly", "yearly"],
                    description: "The time period to retrieve sales data for"
                }
            },
            required: ["period"]
        },
        execute: ({ period }: { period: 'monthly' | 'quarterly' | 'yearly' }) => {
            showAlert(`get_sales_data called for ${period} period`);
            return dashboardManager.getFilteredSalesData(period);
        }
    });

    navigator.modelContext.registerTool({
        name: "get_revenue_data",
        description: "Get revenue metrics and statistics",
        inputSchema: {
            type: "object",
            properties: {},
        },
        execute: () => {
            showAlert("get_revenue_data called");
            const metrics = dashboardManager.getDashboardMetrics();
            return {
                totalRevenue: metrics.totalRevenue,
                averageOrderValue: metrics.averageOrderValue,
                growthRate: metrics.growthRate,
            };
        }
    });

    navigator.modelContext.registerTool({
        name: "visualize_data",
        description: "Visualize specific chart on the dashboard by highlighting it",
        inputSchema: {
            type: "object",
            properties: {
                chartName: {
                    type: "string",
                    enum: ["sales", "categories", "regional", "traffic"],
                    description: "The name of the chart to visualize and highlight"
                }
            },
            required: ["chartName"]
        },
        execute: ({ chartName }: { chartName: string }) => {
            showAlert(`visualize_data called for ${chartName} chart`);
            dashboardManager.setSelectedChart(chartName);
            dashboardManager.setModalChart(chartName);
            const data = dashboardManager.getDataByChartName(chartName);
            return {
                message: `${chartName} chart has been highlighted and is now visible in a modal to the user`,
                data: data
            };
        }
    });

    navigator.modelContext.registerTool({
        name: "filter_data_by_period",
        description: "Filter dashboard data by time period (monthly, quarterly, or yearly)",
        inputSchema: {
            type: "object",
            properties: {
                period: {
                    type: "string",
                    enum: ["monthly", "quarterly", "yearly"],
                    description: "The time period to filter by"
                }
            },
            required: ["period"]
        },
        execute: ({ period }: { period: 'monthly' | 'quarterly' | 'yearly' }) => {
            showAlert(`filter_data_by_period called for ${period}`);
            dashboardManager.setSelectedPeriod(period);
            return {
                message: `Dashboard filtered to show ${period} data`,
                filteredData: dashboardManager.getFilteredSalesData(period)
            };
        }
    });

    navigator.modelContext.registerTool({
        name: "highlight_metric",
        description: "Highlight a specific metric card on the dashboard",
        inputSchema: {
            type: "object",
            properties: {
                metric: {
                    type: "string",
                    enum: ["revenue", "sales", "customers", "aov"],
                    description: "The metric to highlight (revenue, sales, customers, or aov for average order value)"
                }
            },
            required: ["metric"]
        },
        execute: ({ metric }: { metric: string }) => {
            showAlert(`highlight_metric called for ${metric}`);
            dashboardManager.setHighlightedMetric(metric);
            dashboardManager.setModalMetric(metric);
            return {
                message: `${metric} metric has been highlighted and is now visible in a modal`,
                metrics: dashboardManager.getDashboardMetrics()
            };
        }
    });
}





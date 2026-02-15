# WebMCP Analytics Dashboard Demo
https://andreinwald.github.io/webmcp-demo

<img src="./preview.png" height="300px">

This demo showcases WebMCP (Web Model Context Protocol) integration with an interactive analytics dashboard built with React and Recharts.

## Features
- 📊 Interactive data visualizations (Line, Bar, Pie, and Area charts)
- 💰 Real-time metrics tracking (Revenue, Sales, Customers, AOV)
- 🔄 Dynamic data filtering (Monthly, Quarterly, Yearly views)
- 🤖 WebMCP tools for AI-powered data retrieval and visualization

## WebMCP Tools
The dashboard exposes the following WebMCP tools for AI agent interaction:
- `get_dashboard_data` - Retrieve all dashboard data
- `get_sales_data` - Get sales data for specific time periods
- `get_revenue_data` - Retrieve revenue metrics
- `visualize_data` - Highlight specific charts
- `filter_data_by_period` - Filter data by time period
- `highlight_metric` - Highlight specific metric cards

## Prerequisites
- Google Chrome version 146 or higher
- Enable "WebMCP" in chrome://flags
- Browser extension to call actions [chromewebstore](https://chromewebstore.google.com/detail/model-context-tool-inspec/gbpdfapgefenggkahomfgkhfehlcenpd)

Actions registered in [WebMCP.ts](./src/WebMCP.ts)

## Development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Read more
- https://developer.chrome.com/blog/webmcp-epp
- https://webmachinelearning.github.io/webmcp

# Frontend-Backend Integration Guide

## Overview
The RevenueFlow application consists of a React + TypeScript frontend and an Express.js backend that are now fully integrated and communicating.

## Current Status
✅ **Backend**: Running on http://localhost:3001
✅ **Frontend**: Running on http://localhost:5173
✅ **Integration**: Fully connected and operational

## Architecture

### Backend (Port 3001)
- **Framework**: Express.js with Node.js
- **API Base**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/health
- **CORS**: Configured to accept requests from frontend

### Frontend (Port 5174)
- **Framework**: React + TypeScript with Vite
- **API Client**: Custom fetch-based client
- **Environment**: Configured via `.env` file

## API Integration

### Configuration Files

1. **Frontend Environment** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:3001/api
VITE_API_BASE=http://localhost:3001
```

2. **Backend Environment** (`backend/.env`):
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5174
```

### API Client

The frontend uses a custom API client located at `frontend/src/config/api.ts`:

```typescript
import { apiClient, API_ENDPOINTS } from './config/api';

// GET request
const data = await apiClient.get(API_ENDPOINTS.analytics.dashboard);

// POST request
const result = await apiClient.post(API_ENDPOINTS.leads.create, leadData);
```

### Available API Endpoints

#### Analytics
- `GET /api/analytics/dashboard` - Main dashboard data
- `GET /api/analytics/revenue` - Revenue metrics
- `GET /api/analytics/forecast` - Revenue forecasts
- `GET /api/analytics/trends` - Trend analysis

#### Leads
- `GET /api/leads` - List all leads
- `POST /api/leads` - Create new lead
- `POST /api/leads/:id/process` - Process a lead
- `POST /api/leads/:id/score` - Score a lead

#### Agents
- `GET /api/agents/status` - Agent orchestrator status
- `GET /api/agents/performance` - Performance metrics
- `GET /api/agents/activity` - Recent agent activities

#### AI
- `POST /api/ai/analyze` - AI analysis
- `GET /api/ai/insights` - AI insights

#### Health
- `GET /health` - Backend health check

## React Hooks for Backend Integration

### useBackendHealth()
Monitors backend connection status in real-time:

```typescript
const { health, loading, error } = useBackendHealth();
```

### useDashboardData()
Fetches analytics dashboard data:

```typescript
const { data, loading, error, refetch } = useDashboardData();
```

### useAgentStatus()
Monitors autonomous agent status:

```typescript
const { status, loading, error, refetch } = useAgentStatus();
```

### useLeadProcessing()
Processes new leads through the backend:

```typescript
const { processLead, loading, error } = useLeadProcessing();
const result = await processLead(leadData);
```

## Visual Integration

### Backend Status Indicator
A live status indicator is displayed in the bottom-right corner of the frontend showing:
- Connection status (Connected/Offline)
- Active agents count
- Total tasks processed
- Success rate
- System uptime

The indicator updates automatically every 30 seconds.

## Running the Application

### Start Backend
```bash
cd backend
npm install
npm run dev
```
Backend will start on http://localhost:3001

### Start Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend will start on http://localhost:5173 (or next available port)

## Testing the Integration

1. **Check Backend Health**:
   - Visit http://localhost:3001/health
   - Should return JSON with status: "healthy"

2. **Check Frontend Connection**:
   - Visit http://localhost:5174
   - Look for the green "Backend Connected" indicator in bottom-right
   - Status shows real-time metrics from backend

3. **Test API Call**:
   - Open browser console on frontend
   - Check for successful API calls to localhost:3001
   - No CORS errors should appear

## CORS Configuration

The backend is configured to accept requests from the frontend:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

## Troubleshooting

### Backend Not Connecting
- Verify backend is running: `curl http://localhost:3001/health`
- Check CORS settings in `backend/src/app.js`
- Verify `.env` file exists in backend folder

### Frontend Can't Reach Backend
- Check `.env` file in frontend folder
- Verify `VITE_API_URL` is set correctly
- Restart Vite dev server after changing `.env`

### Port Conflicts
- Backend: Change `PORT` in `backend/.env`
- Frontend: Vite will automatically use next available port
- Update CORS origin in backend if frontend port changes

## Next Steps

1. **Add Authentication**: Implement JWT-based authentication
2. **Real-time Updates**: Add WebSocket support for live updates
3. **Error Handling**: Implement global error boundary
4. **Loading States**: Add skeleton loaders for better UX
5. **API Caching**: Implement response caching with React Query

## Security Considerations

- API credentials should never be committed to git
- Use environment variables for all sensitive data
- Implement rate limiting (already configured)
- Add authentication middleware for protected routes
- Enable HTTPS in production

## Production Deployment

For production, update:
- `FRONTEND_URL` in backend `.env` to production domain
- `VITE_API_URL` in frontend `.env` to production API
- Enable HTTPS for all connections
- Configure proper CORS origins
- Set `NODE_ENV=production`

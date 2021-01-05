import { createRepository } from '../repository';
import { User } from './UserManager/types/User';
import { Claim } from './ClaimManager/types/Claim';
import { UserClaim } from './ClaimManager/types/UserClaim';
import { RoleClaim } from './ClaimManager/types/RoleClaim';
import { Chart } from './CustomDashboards/types/Chart';
import { Dashboard } from './CustomDashboards/types/Dashboard';

export const userRepository = createRepository<User, string>("http://localhost:5002/api/user");
export const claimRepository = createRepository<Claim, string>("http://localhost:5002/api/claim");
export const userClaimsRepository = createRepository<UserClaim, string>("http://localhost:5002/api/userclaim");
export const roleClaimsRepository = createRepository<RoleClaim, string>("http://localhost:5002/api/roleclaim");
export const chartsRepository = createRepository<Chart, string>("http://localhost:5002/api/chart");
export const dashboardChartsRepository = createRepository<DashboardChart, string>("http://localhost:5002/api/dashboardchart");
export const dashboardRepository = createRepository<Dashboard, string>("http://localhost:5002/api/dashboard");
export const userDashboardRepository = createRepository<UserDashboard, string>("http://localhost:5002/api/userdashboard");
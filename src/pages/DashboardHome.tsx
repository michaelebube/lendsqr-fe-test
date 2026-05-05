import { Link } from 'react-router-dom';
import activeUsersIcon from '../assets/active_users.svg';
import usersIcon from '../assets/users_icon.svg';
import usersWithLoansIcon from '../assets/users_with_loans.svg';
import usersWithSavingsIcon from '../assets/users_with_savings.svg';
import { StatCard } from '../components/StatCard';

export function DashboardHome() {
  return (
    <section className="page">
      <div className="page__header">
        <h1>Dashboard</h1>
      </div>
      <div className="stats-grid">
        <StatCard title="Users" value="2,453" icon={usersIcon} tone="purple" />
        <StatCard title="Active Users" value="1,820" icon={activeUsersIcon} tone="blue" />
        <StatCard title="Users with Loans" value="12,453" icon={usersWithLoansIcon} tone="orange" />
        <StatCard title="Users with Savings" value="102,453" icon={usersWithSavingsIcon} tone="red" />
      </div>
      <div className="empty-state">
        <h2>Welcome to the lender console</h2>
        <p>Review borrowers, inspect account details, and manage customer risk from one workspace.</p>
        <Link className="primary-button" to="/dashboard/users">
          View Users
        </Link>
      </div>
    </section>
  );
}

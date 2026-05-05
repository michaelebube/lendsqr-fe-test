import { ChevronDown, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import auditLogsIcon from '../assets/audit-logs.svg';
import dashboardIcon from '../assets/dashboard.svg';
import decisionModelIcon from '../assets/decision-model.svg';
import feesAndChargesIcon from '../assets/fees_and_charges.svg';
import feesAndPricingIcon from '../assets/fees_and_pricing.svg';
import guarantorsIcon from '../assets/guarantors.svg';
import karmaIcon from '../assets/karma.svg';
import loanProductsIcon from '../assets/loan_products.svg';
import loanRequestsIcon from '../assets/loan_requests.svg';
import loansIcon from '../assets/loans.svg';
import organizationIcon from '../assets/organization.svg';
import preferencesIcon from '../assets/preferences.svg';
import savingsIcon from '../assets/savings.svg';
import savingsProductsIcon from '../assets/savings_products.svg';
import transactionsIcon from '../assets/transactions.svg';
import usersIcon from '../assets/users_icon.svg';
import whitelistIcon from '../assets/whitelist.svg';

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

type SidebarLink = {
  label: string;
  icon: string;
  to: string;
};

const customerLinks = [
  { label: 'Users', icon: usersIcon, to: '/dashboard/users' },
  { label: 'Guarantors', icon: guarantorsIcon, to: '/dashboard/guarantors' },
  { label: 'Loans', icon: loansIcon, to: '/dashboard/loans' },
  { label: 'Decision Models', icon: decisionModelIcon, to: '/dashboard/decision-models' },
  { label: 'Savings', icon: savingsIcon, to: '/dashboard/savings' },
  { label: 'Loan Requests', icon: loanRequestsIcon, to: '/dashboard/loan-requests' },
  { label: 'Whitelist', icon: whitelistIcon, to: '/dashboard/whitelist' },
  { label: 'Karma', icon: karmaIcon, to: '/dashboard/karma' },
] satisfies SidebarLink[];

const businessLinks = [
  { label: 'Organization', icon: organizationIcon, to: '/dashboard/organization' },
  { label: 'Loan Products', icon: loanProductsIcon, to: '/dashboard/loan-products' },
  { label: 'Savings Products', icon: savingsProductsIcon, to: '/dashboard/savings-products' },
  { label: 'Fees and Charges', icon: feesAndChargesIcon, to: '/dashboard/fees' },
  { label: 'Transactions', icon: transactionsIcon, to: '/dashboard/transactions' },
] satisfies SidebarLink[];

const settingsLinks = [
  { label: 'Preferences', icon: preferencesIcon, to: '/dashboard/preferences' },
  { label: 'Fees and Pricing', icon: feesAndPricingIcon, to: '/dashboard/pricing' },
  { label: 'Audit Logs', icon: auditLogsIcon, to: '/dashboard/audit-logs' },
] satisfies SidebarLink[];

function LinkGroup({ title, links }: { title: string; links: SidebarLink[] }) {
  return (
    <div className="sidebar__group">
      <p>{title}</p>
      {links.map(({ label, icon, to }) => (
        <NavLink key={label} to={to} className={({ isActive }) => `sidebar__link ${isActive ? 'active' : ''}`}>
          <img src={icon} alt="" aria-hidden="true" />
          <span>{label}</span>
        </NavLink>
      ))}
    </div>
  );
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      <aside className={`sidebar ${open ? 'sidebar--open' : ''}`}>
        <button className="icon-button sidebar__close" type="button" onClick={onClose} aria-label="Close navigation">
          <X size={20} />
        </button>
        <button className="sidebar__switch" type="button">
          <img src={organizationIcon} alt="" aria-hidden="true" />
          Switch Organization
          <ChevronDown size={16} />
        </button>
        <NavLink to="/dashboard" end className={({ isActive }) => `sidebar__link ${isActive ? 'active' : ''}`}>
          <img src={dashboardIcon} alt="" aria-hidden="true" />
          <span>Dashboard</span>
        </NavLink>
        <LinkGroup title="Customers" links={customerLinks} />
        <LinkGroup title="Businesses" links={businessLinks} />
        <LinkGroup title="Settings" links={settingsLinks} />
      </aside>
      {open && <button className="sidebar__overlay" type="button" aria-label="Close navigation" onClick={onClose} />}
    </>
  );
}

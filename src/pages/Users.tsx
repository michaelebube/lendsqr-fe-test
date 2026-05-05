
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Eye, MoreVertical, UserCheck, UserX } from 'lucide-react';
import activeUsersIcon from '../assets/active_users.svg';
import usersIcon from '../assets/users.svg';
import usersWithLoansIcon from '../assets/users_with_loans.svg';
import usersWithSavingsIcon from '../assets/users_with_savings.svg';
import Filter from '../assets/filter.svg';
import { StatCard } from '../components/StatCard';
import { StatusBadge } from '../components/StatusBadge';
import { getUsers } from '../services/mockApi';
import { saveUserDetails } from '../services/userStorage';
import type { User, UserStatus } from '../types/user';
import { formatDate } from '../utils/format';

const pageSize = 10;
const statuses: Array<UserStatus | 'All'> = ['All', 'Active', 'Inactive', 'Pending', 'Blacklisted'];

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<UserStatus | 'All'>('All');
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeActionId, setActiveActionId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    getUsers().then((records) => {
      if (active) {
        setUsers(records);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const haystack = `${user.organization} ${user.username} ${user.email} ${user.phoneNumber}`.toLowerCase();
      const matchesSearch = haystack.includes(query.toLowerCase());
      const matchesStatus = status === 'All' || user.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [query, status, users]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <section className="page">
      <div className="page__header">
        <h1>Users</h1>
      </div>
      <div className="stats-grid">
        <StatCard title="Users" value={users.length.toLocaleString()} icon={usersIcon} tone="purple" />
        <StatCard title="Active Users" value={users.filter((user) => user.status === 'Active').length.toLocaleString()} icon={activeUsersIcon} tone="blue" />
        <StatCard title="Users with Loans" value="12,453" icon={usersWithLoansIcon} tone="orange" />
        <StatCard title="Users with Savings" value="102,453" icon={usersWithSavingsIcon} tone="red" />
      </div>
      <div className="users-panel">
        {filtersOpen && (
          <form className="filter-card" aria-label="Filter users">
            <label>
              Organization
              <select>
                <option>Lendsqr</option>
                <option>Irorun</option>
                <option>Lendstar</option>
              </select>
            </label>
            <label>
              Username
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="User" />
            </label>
            <label>
              Email
              <input placeholder="Email" />
            </label>
            <label>
              Date
              <input type="date" />
            </label>
            <label>
              Phone Number
              <input placeholder="Phone Number" />
            </label>
            <label>
              Status
              <select
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value as UserStatus | 'All');
                  setPage(1);
                }}
              >
                {statuses.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <div className="filter-card__actions">
              <button
                className="outline-button"
                type="button"
                onClick={() => {
                  setQuery('');
                  setStatus('All');
                  setPage(1);
                }}
              >
                Reset
              </button>
              <button className="primary-button" type="button" onClick={() => setFiltersOpen(false)}>
                Filter
              </button>
            </div>
          </form>
        )}
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>
                  Organization <button type="button" onClick={() => setFiltersOpen((value) => !value)} aria-label="Show filters"><img src={Filter} alt="Filter" /></button>
                </th>
                <th>
                  Username <button type="button" onClick={() => setFiltersOpen((value) => !value)} aria-label="Show filters"><img src={Filter} alt="Filter" /></button>
                </th>
                <th>
                  Email <button type="button" onClick={() => setFiltersOpen((value) => !value)} aria-label="Show filters"><img src={Filter} alt="Filter" /></button>
                </th>
                <th>
                  Phone Number <button type="button" onClick={() => setFiltersOpen((value) => !value)} aria-label="Show filters"><img src={Filter} alt="Filter" /></button>
                </th>
                <th>
                  Date Joined <button type="button" onClick={() => setFiltersOpen((value) => !value)} aria-label="Show filters"><img src={Filter} alt="Filter" /></button>
                </th>
                <th>
                  Status <button type="button" onClick={() => setFiltersOpen((value) => !value)} aria-label="Show filters"><img src={Filter} alt="Filter" /></button>
                </th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7}>Loading users...</td>
                </tr>
              ) : visibleUsers.length ? (
                visibleUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.organization}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{formatDate(user.dateJoined)}</td>
                    <td>
                      <StatusBadge status={user.status} />
                    </td>
                    <td>
                      <div className="row-actions">
                        <button
                          className="table-action"
                          type="button"
                          onClick={() => setActiveActionId((value) => (value === user.id ? null : user.id))}
                          aria-label={`Open actions for ${user.username}`}
                        >
                          <MoreVertical size={18} />
                        </button>
                        {activeActionId === user.id && (
                          <div className="row-actions__menu">
                            <Link to={`/dashboard/users/${user.id}`} onClick={() => saveUserDetails(user)}>
                              <Eye size={15} />
                              View Details
                            </Link>
                            <button type="button">
                              <UserX size={15} />
                              Blacklist User
                            </button>
                            <button type="button">
                              <UserCheck size={15} />
                              Activate User
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>No users match your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <span>
            Showing
            <select aria-label="Rows per page" value={pageSize} disabled>
              <option>{pageSize}</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            out of {filteredUsers.length}
          </span>
          <div>
            <button type="button" disabled={currentPage === 1} onClick={() => setPage((value) => value - 1)} aria-label="Previous page">
              <ChevronLeft size={16} />
            </button>
            {[1, 2, 3].map((pageNumber) => (
              <button
                key={pageNumber}
                className={currentPage === pageNumber ? 'active' : ''}
                type="button"
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
            <span>...</span>
            <button type="button" onClick={() => setPage(Math.max(1, totalPages - 1))}>
              {Math.max(1, totalPages - 1)}
            </button>
            <button type="button" onClick={() => setPage(totalPages)}>
              {totalPages}
            </button>
            <button type="button" disabled={currentPage === totalPages} onClick={() => setPage((value) => value + 1)}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

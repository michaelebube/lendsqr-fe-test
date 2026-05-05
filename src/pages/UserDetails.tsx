import { ArrowLeft, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUserById } from '../services/mockApi';
import { getStoredUserDetails, saveUserDetails } from '../services/userStorage';
import type { User } from '../types/user';

function DetailGrid({ title, items }: { title: string; items: Array<[string, string]> }) {
  return (
    <section className="detail-section">
      <h2>{title}</h2>
      <div className="detail-grid">
        {items.map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export function UserDetails() {
  const { userId = '' } = useParams();
  const [user, setUser] = useState<User | null>(() => getStoredUserDetails(userId));
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    let active = true;

    getUserById(userId).then((record) => {
      if (!active) {
        return;
      }

      if (record) {
        saveUserDetails(record);
        setUser(record);
      }
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [userId]);

  if (loading) {
    return <section className="page">Loading user details...</section>;
  }

  if (!user) {
    return (
      <section className="page empty-state">
        <h1>User not found</h1>
        <p>The user record could not be found in the mock API or local storage.</p>
        <Link className="primary-button" to="/dashboard/users">
          Back to Users
        </Link>
      </section>
    );
  }

  return (
    <section className="page user-detail">
      <Link className="back-link" to="/dashboard/users">
        <ArrowLeft size={18} />
        Back to Users
      </Link>
      <div className="page__header page__header--split">
        <h1>User Details</h1>
        <div className="page__actions">
          <button className="outline-button outline-button--danger" type="button">
            Blacklist User
          </button>
          <button className="outline-button outline-button--success" type="button">
            Activate User
          </button>
        </div>
      </div>
      <article className="profile-summary">
        <div className="profile-summary__heading">
          <div className="profile-summary__identity">
            <img src={user.profile.avatar} alt={user.profile.fullName} />
            <div>
              <h2>{user.profile.fullName}</h2>
              <span>{user.id}</span>
            </div>
          </div>
          <div className="profile-summary__tier">
            <span>User's Tier</span>
            <div>
              {Array.from({ length: 3 }, (_, index) => (
                <Star key={index} size={15} fill={index < user.tier ? 'currentColor' : 'none'} />
              ))}
            </div>
          </div>
          <div className="profile-summary__bank">
            <h2>{user.accountBalance}</h2>
            <span>
              {user.accountNumber}/{user.bank}
            </span>
          </div>
        </div>
        <nav className="profile-tabs" aria-label="User detail tabs">
          <a className="active" href="#general">
            General Details
          </a>
          <a href="#documents">Documents</a>
          <a href="#bank">Bank Details</a>
          <a href="#loans">Loans</a>
          <a href="#savings">Savings</a>
          <a href="#app">App and System</a>
        </nav>
      </article>
      <article id="general" className="detail-card">
        <DetailGrid
          title="Personal Information"
          items={[
            ['Full Name', user.profile.fullName],
            ['Phone Number', user.phoneNumber],
            ['Email Address', user.email],
            ['BVN', user.profile.bvn],
            ['Gender', user.profile.gender],
            ['Marital Status', user.profile.maritalStatus],
            ['Children', user.profile.children],
            ['Type of Residence', user.profile.residenceType],
          ]}
        />
        <DetailGrid
          title="Education and Employment"
          items={[
            ['Level of Education', user.education.level],
            ['Employment Status', user.education.employmentStatus],
            ['Sector of Employment', user.education.sector],
            ['Duration of Employment', user.education.duration],
            ['Office Email', user.education.officeEmail],
            ['Monthly Income', `${user.education.monthlyIncome[0]} - ${user.education.monthlyIncome[1]}`],
            ['Loan Repayment', user.education.loanRepayment],
          ]}
        />
        <DetailGrid
          title="Socials"
          items={[
            ['Twitter', user.socials.twitter],
            ['Facebook', user.socials.facebook],
            ['Instagram', user.socials.instagram],
          ]}
        />
        {user.guarantors.map((guarantor, index) => (
          <DetailGrid
            key={guarantor.email}
            title={index === 0 ? 'Guarantor' : 'Guarantor 2'}
            items={[
              ['Full Name', guarantor.fullName],
              ['Phone Number', guarantor.phoneNumber],
              ['Email Address', guarantor.email],
              ['Relationship', guarantor.relationship],
            ]}
          />
        ))}
      </article>
    </section>
  );
}

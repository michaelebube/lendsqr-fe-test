import type { User, UserStatus } from '../types/user';

const organizations = ['Lendsqr', 'Irorun', 'Lendstar', 'Kredi', 'Carbon', 'Paylater'];
const firstNames = ['Grace', 'Aisha', 'Ifeoma', 'Chinedu', 'Tunde', 'Mariam', 'Ada', 'Michael', 'Kemi', 'Daniel'];
const lastNames = ['Effiom', 'Adedeji', 'Okafor', 'Ibrahim', 'Balogun', 'Nwosu', 'Eze', 'Bello', 'Adeyemi', 'Okoro'];
const statuses: UserStatus[] = ['Active', 'Inactive', 'Pending', 'Blacklisted'];
const sectors = ['FinTech', 'Healthcare', 'Education', 'Logistics', 'Commerce', 'Agriculture'];

const pad = (value: number) => value.toString().padStart(3, '0');
const money = (amount: number) => amount.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });

export const users: User[] = Array.from({ length: 500 }, (_, index) => {
  const idNumber = index + 1;
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[(index * 3) % lastNames.length];
  const fullName = `${firstName} ${lastName}`;
  const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${pad(idNumber)}`;
  const organization = organizations[index % organizations.length];
  const date = new Date(Date.UTC(2020 + (index % 5), index % 12, (index % 27) + 1, 10 + (index % 10), 15));
  const status = statuses[index % statuses.length];
  const incomeBase = 120000 + index * 2300;

  return {
    id: `USR-${pad(idNumber)}`,
    organization,
    username,
    email: `${username}@example.com`,
    phoneNumber: `080${(30000000 + index * 731).toString().slice(0, 8)}`,
    dateJoined: date.toISOString(),
    status,
    tier: ((index % 3) + 1) as 1 | 2 | 3,
    accountBalance: money(200000 + index * 5813),
    accountNumber: `10${(24350000 + index * 43).toString()}`,
    bank: ['Providus Bank', 'Guaranty Trust Bank', 'Access Bank', 'Zenith Bank'][index % 4],
    profile: {
      fullName,
      bvn: `22${(123456789 + index).toString()}`,
      gender: index % 2 === 0 ? 'Female' : 'Male',
      maritalStatus: index % 3 === 0 ? 'Married' : 'Single',
      children: index % 4 === 0 ? '2' : 'None',
      residenceType: index % 2 === 0 ? "Parent's Apartment" : 'Own Apartment',
      avatar: `https://i.pravatar.cc/160?img=${(index % 70) + 1}`,
    },
    education: {
      level: ['B.Sc', 'M.Sc', 'HND', 'OND'][index % 4],
      employmentStatus: index % 5 === 0 ? 'Self Employed' : 'Employed',
      sector: sectors[index % sectors.length],
      duration: `${(index % 8) + 1} years`,
      officeEmail: `${username}@${organization.toLowerCase()}.co`,
      monthlyIncome: [money(incomeBase), money(incomeBase + 85000)],
      loanRepayment: money(35000 + index * 117),
    },
    socials: {
      twitter: `@${username}`,
      facebook: fullName,
      instagram: `@${username}`,
    },
    guarantors: [
      {
        fullName: `${lastNames[index % lastNames.length]} ${firstNames[(index + 2) % firstNames.length]}`,
        phoneNumber: `081${(40000000 + index * 491).toString().slice(0, 8)}`,
        email: `guarantor${idNumber}@example.com`,
        relationship: index % 2 === 0 ? 'Sibling' : 'Friend',
      },
    ],
  };
});

const wait = (ms = 250) => new Promise((resolve) => window.setTimeout(resolve, ms));

export async function getUsers() {
  await wait();
  return users;
}

export async function getUserById(userId: string) {
  await wait(150);
  return users.find((user) => user.id === userId) ?? null;
}

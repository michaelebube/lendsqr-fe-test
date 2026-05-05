export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';

export type User = {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatus;
  tier: 1 | 2 | 3;
  accountBalance: string;
  accountNumber: string;
  bank: string;
  profile: {
    fullName: string;
    bvn: string;
    gender: string;
    maritalStatus: string;
    children: string;
    residenceType: string;
    avatar: string;
  };
  education: {
    level: string;
    employmentStatus: string;
    sector: string;
    duration: string;
    officeEmail: string;
    monthlyIncome: [string, string];
    loanRepayment: string;
  };
  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  guarantors: Array<{
    fullName: string;
    phoneNumber: string;
    email: string;
    relationship: string;
  }>;
};

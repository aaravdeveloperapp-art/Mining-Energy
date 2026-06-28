import fs from 'fs';
import path from 'path';
import { 
  User, InvestmentPlan, Investment, DailyEarning, 
  Transaction, ReferralLog, SupportTicket, Announcement, AppBanner 
} from '../src/types';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

export interface DatabaseState {
  users: User[];
  plans: InvestmentPlan[];
  investments: Investment[];
  earnings: DailyEarning[];
  transactions: Transaction[];
  referrals: ReferralLog[];
  tickets: SupportTicket[];
  announcements: Announcement[];
  banners: AppBanner[];
}

const DEFAULT_PLANS: InvestmentPlan[] = [
  {
    id: 'plan_solar_1',
    name: 'Solar Power Miner S1',
    category: 'normal',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&auto=format&fit=crop&q=60',
    price: 300,
    dailyIncome: 12,
    durationDays: 30,
    totalIncome: 360,
    roiPercentage: 120,
    maxPurchase: 5,
    description: 'High-efficiency silicon photo-voltaic array mining node. Standard entry level miner.',
    isActive: true
  },
  {
    id: 'plan_wind_1',
    name: 'Wind Farm Miner W1',
    category: 'normal',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&auto=format&fit=crop&q=60',
    price: 700,
    dailyIncome: 30,
    durationDays: 45,
    totalIncome: 1350,
    roiPercentage: 192,
    maxPurchase: 3,
    description: 'Dynamic wind-turbine generator feeding high-density ASIC boards. Optimal regular earner.',
    isActive: true
  },
  {
    id: 'plan_geo_1',
    name: 'Geothermal Core Miner G1',
    category: 'normal',
    image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=400&auto=format&fit=crop&q=60',
    price: 1500,
    dailyIncome: 68,
    durationDays: 60,
    totalIncome: 4080,
    roiPercentage: 272,
    maxPurchase: 2,
    description: 'Taps directly into underground geothermal heat vents for steady, uninterrupted mining power.',
    isActive: true
  },
  {
    id: 'plan_hydro_1',
    name: 'Hydro-Electric Miner H1',
    category: 'normal',
    image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=400&auto=format&fit=crop&q=60',
    price: 3000,
    dailyIncome: 145,
    durationDays: 60,
    totalIncome: 8700,
    roiPercentage: 290,
    maxPurchase: 2,
    description: 'Utilizes water-current energy turbines for ultra-high hash rate stability and efficiency.',
    isActive: true
  },
  {
    id: 'plan_vip_fusion',
    name: 'Fusion Nucleus VIP',
    category: 'vip',
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&auto=format&fit=crop&q=60',
    price: 5000,
    dailyIncome: 260,
    durationDays: 45,
    totalIncome: 11700,
    roiPercentage: 234,
    maxPurchase: 1,
    description: 'VIP node tapping simulated plasma fusion core grids. Unprecedented hash power outputs.',
    isActive: true
  },
  {
    id: 'plan_vip_quantum',
    name: 'Quantum Energy Core VIP',
    category: 'vip',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&auto=format&fit=crop&q=60',
    price: 10000,
    dailyIncome: 560,
    durationDays: 45,
    totalIncome: 25200,
    roiPercentage: 252,
    maxPurchase: 1,
    description: 'Quantum entanglement multi-threaded server rigs. Ultimate cryptocurrency yield tier.',
    isActive: true
  }
];

const DEFAULT_BANNERS: AppBanner[] = [
  {
    id: 'banner_1',
    title: 'Double Referral Rewards Weekend',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=80',
    link: '#team'
  },
  {
    id: 'banner_2',
    title: 'New VIP Green Energy Plans Released',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80',
    link: '#shop'
  }
];

const DEFAULT_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann_1',
    title: 'Mining Energy Officially Launches Internationally',
    content: 'We are thrilled to welcome our first 50,000 miners! Recharge options have been expanded to include direct UPI and global credit cards.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'ann_2',
    title: 'Withdrawal Times Reduced to Under 1 Hour',
    content: 'Thanks to our automated bank settlements, withdrawal processing is now faster than ever! Daily withdrawal limits have also been increased.',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  }
];

// Seed initial users: one admin and one regular demo user with pre-loaded active plans & referral rewards
const DEFAULT_USERS: User[] = [
  {
    id: 'user_admin',
    fullName: 'Mining Energy Admin',
    mobile: '9999999999',
    email: 'admin@miningenergy.com',
    passwordHash: 'admin', // Simple cleartext password for easy demo-testing
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'admin',
    referralCode: 'ADMIN77',
    wallet: {
      deposit_balance: 100000,
      profit_balance: 50000,
      bonus_balance: 5000,
      referral_balance: 12000,
      frozen_balance: 0,
      total_balance: 167000
    },
    status: 'active',
    kycStatus: 'verified',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'user_demo',
    fullName: 'Aarav Sharma',
    mobile: '8888888888',
    email: 'demo@miningenergy.com',
    passwordHash: 'password', // Simple password for testing
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'user',
    referralCode: 'MINE888',
    referredBy: 'user_admin',
    wallet: {
      deposit_balance: 1500,
      profit_balance: 230,
      bonus_balance: 100,
      referral_balance: 150,
      frozen_balance: 0,
      total_balance: 1980
    },
    status: 'active',
    kycStatus: 'verified',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'user_aarav',
    fullName: 'AARAV SAHU',
    mobile: '9040845838',
    email: 'aaravdeveloperapp@gmail.com',
    passwordHash: 'admin90409040',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=user_aarav',
    role: 'admin',
    referralCode: 'MINE310003',
    wallet: {
      deposit_balance: 125000,
      profit_balance: 85400,
      bonus_balance: 5000,
      referral_balance: 12500,
      frozen_balance: 0,
      total_balance: 227900
    },
    status: 'active',
    kycStatus: 'verified',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'user_aarav12',
    fullName: 'AARAV SAHU',
    mobile: '9040845839',
    email: 'aaravdeveloperapp12@gmail.com',
    passwordHash: 'admin90409040',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=user_aarav12',
    role: 'admin',
    referralCode: 'MINE310012',
    wallet: {
      deposit_balance: 125000,
      profit_balance: 85400,
      bonus_balance: 5000,
      referral_balance: 12500,
      frozen_balance: 0,
      total_balance: 227900
    },
    status: 'active',
    kycStatus: 'verified',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Preload the demo user with 2 active plans, so there is instantly data to visualize!
const DEFAULT_INVESTMENTS: Investment[] = [
  {
    id: 'inv_demo_1',
    userId: 'user_demo',
    planId: 'plan_solar_1',
    planName: 'Solar Power Miner S1',
    purchaseAmount: 300,
    dailyIncome: 12,
    totalIncome: 360,
    earnedIncome: 48, // 4 days worth already earned
    durationDays: 30,
    startDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 26 * 24 * 60 * 60 * 1000).toISOString(),
    lastClaimDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Claimed 1 day ago
    status: 'active'
  },
  {
    id: 'inv_demo_2',
    userId: 'user_demo',
    planId: 'plan_wind_1',
    planName: 'Wind Farm Miner W1',
    purchaseAmount: 700,
    dailyIncome: 30,
    totalIncome: 1350,
    earnedIncome: 60, // 2 days worth already earned
    durationDays: 45,
    startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 43 * 24 * 60 * 60 * 1000).toISOString(),
    lastClaimDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: 'active'
  }
];

const DEFAULT_EARNINGS: DailyEarning[] = [
  {
    id: 'earn_1',
    userId: 'user_demo',
    investmentId: 'inv_demo_1',
    planName: 'Solar Power Miner S1',
    amount: 12,
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'earn_2',
    userId: 'user_demo',
    investmentId: 'inv_demo_1',
    planName: 'Solar Power Miner S1',
    amount: 12,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'earn_3',
    userId: 'user_demo',
    investmentId: 'inv_demo_1',
    planName: 'Solar Power Miner S1',
    amount: 12,
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'earn_4',
    userId: 'user_demo',
    investmentId: 'inv_demo_2',
    planName: 'Wind Farm Miner W1',
    amount: 30,
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const DEFAULT_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_demo_1',
    userId: 'user_demo',
    type: 'deposit',
    amount: 1000,
    status: 'completed',
    remarks: 'Initial wallet load',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    paymentReference: 'UPI-9871239812-OK'
  },
  {
    id: 'tx_demo_2',
    userId: 'user_demo',
    type: 'investment',
    amount: 300,
    status: 'completed',
    remarks: 'Bought Solar Power Miner S1',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'tx_demo_3',
    userId: 'user_demo',
    type: 'investment',
    amount: 700,
    status: 'completed',
    remarks: 'Bought Wind Farm Miner W1',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'tx_demo_4',
    userId: 'user_demo',
    type: 'signup_bonus',
    amount: 100,
    status: 'completed',
    remarks: 'Welcome bonus',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export function readDb(): DatabaseState {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const initialState: DatabaseState = {
        users: DEFAULT_USERS,
        plans: DEFAULT_PLANS,
        investments: DEFAULT_INVESTMENTS,
        earnings: DEFAULT_EARNINGS,
        transactions: DEFAULT_TRANSACTIONS,
        referrals: [
          {
            id: 'ref_log_1',
            referrerId: 'user_admin',
            referredUserId: 'user_demo',
            referredUserName: 'Aarav Sharma',
            level: 1,
            commissionAmount: 150,
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
          }
        ],
        tickets: [
          {
            id: 'ticket_demo_1',
            userId: 'user_demo',
            userEmail: 'demo@miningenergy.com',
            subject: 'Withdrawal Speed Query',
            category: 'withdraw',
            message: 'What are the usual processing windows for bank transfers?',
            status: 'replied',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            replies: [
              {
                sender: 'user',
                message: 'What are the usual processing windows for bank transfers?',
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
              },
              {
                sender: 'admin',
                message: 'Hello Aarav, transfers take less than 1 hour on weekdays and up to 3 hours on weekends. Standard UPI withdrawal is almost instant!',
                createdAt: new Date(Date.now() - 1.9 * 24 * 60 * 60 * 1000).toISOString()
              }
            ]
          }
        ],
        announcements: DEFAULT_ANNOUNCEMENTS,
        banners: DEFAULT_BANNERS
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialState, null, 2), 'utf-8');
      return initialState;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading JSON database, resetting to default', error);
    return {
      users: DEFAULT_USERS,
      plans: DEFAULT_PLANS,
      investments: DEFAULT_INVESTMENTS,
      earnings: DEFAULT_EARNINGS,
      transactions: DEFAULT_TRANSACTIONS,
      referrals: [],
      tickets: [],
      announcements: DEFAULT_ANNOUNCEMENTS,
      banners: DEFAULT_BANNERS
    };
  }
}

export function writeDb(state: DatabaseState): void {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(state, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to JSON database', error);
  }
}

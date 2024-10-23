import FastfoodIcon from '@mui/icons-material/Fastfood';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddHomeIcon from '@mui/icons-material/AddHome';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SystemSecurityUpdateGoodIcon from '@mui/icons-material/SystemSecurityUpdateGood';
import AssuredWorkloadOutlinedIcon from '@mui/icons-material/AssuredWorkloadOutlined';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import WorkIcon from '@mui/icons-material/Work';
import PaidIcon from '@mui/icons-material/Paid';
import SavingsIcon from '@mui/icons-material/Savings';
import { ExpenseCategory, IncomeCategory } from '../../types';

const IconComponents: Record<IncomeCategory | ExpenseCategory, JSX.Element> = {
  食費: <FastfoodIcon fontSize="small" />,
  日用品: <AlarmIcon fontSize="small" />,
  住宅費: <AddHomeIcon fontSize="small" />,
  交際費: <VolunteerActivismIcon fontSize="small" />,
  娯楽: <SportsEsportsIcon fontSize="small" />,
  自己投資: <CurrencyRubleIcon fontSize="small" />,
  電子決済: <SystemSecurityUpdateGoodIcon fontSize="small" />,
  銀行送金: <AssuredWorkloadOutlinedIcon fontSize="small" />,
  給与: <WorkIcon fontSize="small" />,
  副収入: <PaidIcon fontSize="small" />,
  お小遣い: <SavingsIcon fontSize="small" />,
};

export default IconComponents;

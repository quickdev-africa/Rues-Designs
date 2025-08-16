import { LucideProps } from 'lucide-react';
import { Home, User, Calendar, Camera, Star, CheckCircle, XCircle } from 'lucide-react';
import { CustomPartyIcon } from './icons/CustomPartyIcon';

export const Icons = {
  Home,
  User,
  Calendar,
  Camera,
  Star,
  CheckCircle,
  XCircle,
  CustomParty: CustomPartyIcon,
};

export type IconName = keyof typeof Icons;

export function LucideIcon({ name, ...props }: { name: IconName } & LucideProps) {
  const Icon = Icons[name];
  return <Icon {...props} />;
}

import {
  ArrowRight,
  Bed,
  Binoculars,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FerrisWheel,
  Heart,
  Menu,
  Minus,
  Plus,
  Search,
  Share,
  Star,
  StarHalf,
  Ticket,
  Utensils,
  X,
  type LucideProps,
} from 'lucide-react';

const ICONS = {
  ArrowRight,
  Bed,
  Binoculars,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FerrisWheel,
  Heart,
  Menu,
  Minus,
  Plus,
  Search,
  Share,
  Star,
  StarHalf,
  Ticket,
  Utensils,
  X,
} as const;

export type IconName = keyof typeof ICONS;

interface Props extends LucideProps {
  name: IconName;
}

const Icon: React.FC<Props> = ({ name, ...rest }) => {
  const Component = ICONS[name];
  return <Component {...rest} />;
};

export default Icon;

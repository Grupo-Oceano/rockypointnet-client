import { cn } from '@/src/lib/utils';
import ImageCustom from './ImageCustom';

interface Props {
  className?: string;
}

const Logo: React.FC<Props> = ({ className }) => {
  return (
    <ImageCustom src="/logo.svg" alt="RockyPoint.net logo" width={48} height={120} className={cn(className)} priority />
  );
};

export default Logo;

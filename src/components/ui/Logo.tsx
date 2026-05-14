import { cn } from '@/src/lib/utils';
import ImageCustom from './ImageCustom';

interface Props {
  className?: string;
}

export default function Logo({ className }: Props) {
  return (
    <ImageCustom src="/logo.svg" alt="RockyPoint.net logo" width={48} height={120} className={cn(className)} priority />
  );
}

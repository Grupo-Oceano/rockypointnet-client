import Icon from '../Icon';

interface Props {
  label: string;
  value: number;
  min: number;
  max: number;
  decrementAria: string;
  incrementAria: string;
  onDec: () => void;
  onInc: () => void;
}

const Counter: React.FC<Props> = ({ label, value, min, max, decrementAria, incrementAria, onDec, onInc }) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-emperor-500 text-xs font-medium tracking-wide uppercase">{label}</span>
      <div className="border-sand-300 flex items-center justify-between border-b pb-1.5">
        <button
          type="button"
          aria-label={decrementAria}
          onClick={onDec}
          disabled={value <= min}
          className="border-sand-300 text-emperor-600 hover:border-ocean-600 hover:text-ocean-600 grid size-7 place-items-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Icon name="Minus" className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
        </button>
        <span aria-live="polite" className="text-emperor-800 min-w-6 text-center text-sm font-semibold">
          {value}
        </span>
        <button
          type="button"
          aria-label={incrementAria}
          onClick={onInc}
          disabled={value >= max}
          className="border-sand-300 text-emperor-600 hover:border-ocean-600 hover:text-ocean-600 grid size-7 place-items-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Icon name="Plus" className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default Counter;

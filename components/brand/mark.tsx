const markRatio = 1152 / 836;
const logoRatio = 3648 / 836;

type MarkProps = {
  size?: number;
  className?: string;
};

export function Mark({ size = 16, className }: MarkProps) {
  return (
    <span
      className={`brand-mark${className ? ` ${className}` : ""}`}
      style={{ inlineSize: Math.round(size * markRatio), blockSize: size }}
      aria-hidden="true"
    />
  );
}

type WordmarkProps = {
  height?: number;
};

export function Wordmark({ height = 30 }: WordmarkProps) {
  return (
    <img
      className="wordmark"
      src="/brand/logo.svg"
      alt="Cynorida"
      width={Math.round(height * logoRatio)}
      height={height}
    />
  );
}

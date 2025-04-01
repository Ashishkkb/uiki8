
import { cva, type VariantProps } from "class-variance-authority";

export const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      padding: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        none: "p-0",
      },
    },
    defaultVariants: {
      padding: "default",
    },
  }
);

export type CardVariantProps = VariantProps<typeof cardVariants>;

import { cva, type VariantProps } from "class-variance-authority";
import { Image, ImageProps, View, Text } from "react-native";
import * as Slot from "@rn-primitives/slot";
import type { SlottableViewProps } from "@rn-primitives/types";
import { cn } from "@/lib/utils";
import { createContext } from "react";

const badgeVariants = cva(
  "web:inline-flex items-center border border-border text-xs gap-1 px-3 py-1 web:transition-colors web:focus:outline-none web:focus:ring-2 web:focus:ring-ring web:focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-gray-800 web:hover:opacity-80 active:opacity-80",
        secondary: "border-transparent web:hover:opacity-80 active:opacity-80 bg-gray-700 border-gray-800 rounded",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const badgeTextVariants = cva("web:text-xs font-semibold ", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      destructive: "text-destructive-foreground",
      outline: "text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const TextClassContext = createContext<string | undefined>(undefined);

type BadgeProps = SlottableViewProps &
  VariantProps<typeof badgeVariants> & {
    icon?: ImageProps["source"];
  };

function Badge({ className, variant, asChild, icon, children, ...props }: BadgeProps) {
  const Component = asChild ? Slot.View : View;

  return (
    <TextClassContext.Provider value={badgeTextVariants({ variant })}>
      <Component
        className={cn(badgeVariants({ variant }), className, "flex-row items-center")}
        {...props}
      >
        {icon && <Image source={icon} className="w-4 h-4 mr-1" resizeMode="contain" />}
        {children}
      </Component>
    </TextClassContext.Provider>
  );
}

export { Badge, badgeTextVariants, badgeVariants };
export type { BadgeProps };

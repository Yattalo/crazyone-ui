import type { ComponentPropsWithoutRef, ElementRef } from "react";

export type PropsWithClassName<T = unknown> = T & {
  className?: string;
};

export type ComponentRef<T extends React.ElementType> = ElementRef<T>;
export type ComponentProps<T extends React.ElementType> = ComponentPropsWithoutRef<T>;

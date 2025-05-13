import React, { ReactNode, ButtonHTMLAttributes, forwardRef } from 'react';
import Image from 'next/image';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant (primary or secondary)
   */
  variant?: 'primary' | 'secondary';
  /**
   * Button contents
   */
  children?: ReactNode;
  /**
   * Optional icon to display before text (only used in secondary button by default)
   */
  icon?: ReactNode;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Optional additional className
   */
  className?: string;
  text?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>((
  {
    variant = 'primary',
    children,
    icon,
    className = '',
    text,
    ...props
  },
  ref
) => {
  const baseStyles = 'flex flex-row justify-center items-center px-4 py-3 gap-2 rounded-full font-medium text-sm leading-tight text-center transition-all';
  
  const variantStyles = {
    primary: 'bg-primary border border-primary shadow-[0_11px_12px_rgba(0,0,0,0.1),inset_0_-4px_0_#38E100] text-secondary hover:shadow-[0_15px_15px_rgba(0,0,0,0.15),inset_0_-6px_0_#38E100] hover:-translate-y-0.5',
    secondary: 'bg-white shadow-[0_11px_12px_rgba(0,0,0,0.1)] text-secondary hover:shadow-[0_15px_15px_rgba(0,0,0,0.15)] hover:-translate-y-0.5'
  };

  return (
    <button
      ref={ref}
      type="button"
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {variant === 'secondary' && icon ? icon : null}
      {text ?? children}
    </button>
  );
});

Button.displayName = "Button";

/**
 * Logo button specifically for the "Reserve a card" use case
 */
export const ReserveCardButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant' | 'icon' | 'children'>>((props, ref) => {
  return (
    <Button
      ref={ref}
      variant="secondary"
      icon={
        <Image 
          src="/assets/images/zerologo-black.svg"
          alt="Zero Logo"
          width={18}
          height={18}
        />
      }
      {...props}
    >
      Reserve a card
    </Button>
  );
});
ReserveCardButton.displayName = "ReserveCardButton";

/**
 * Primary action button with default text, can be overridden by `text` prop
 */
export const StartSpendingButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant' | 'children'>>((props, ref) => {
  return (
    <Button
      ref={ref}
      variant="primary"
      {...props}
    >
      {props.text ? null : 'Start spending'}
    </Button>
  );
});
StartSpendingButton.displayName = "StartSpendingButton";

export default Button; 
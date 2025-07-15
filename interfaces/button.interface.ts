// src/interfaces/button.interface.ts
import React from 'react';

export interface ButtonProps {
  /**
   * Button label/text
   */
  label: string;
  
  /**
   * Click handler function
   */
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  
  /**
   * Button type attribute
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
  
  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Icon to display before the label
   */
  icon?: React.ReactNode;
  
  /**
   * Loading state - shows spinner and disables button
   * @default false
   */
  isLoading?: boolean;
  
  /**
   * Button size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Button color variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
  
  /**
   * Full-width button
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string;
}

// Optional: Export common button types separately
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
    {
        variants: {
            variant: {
                primary:
                    'bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)]',
                secondary:
                    'bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary-hover)]',
                ghost: 'bg-transparent text-[var(--primary)] border border-[var(--primary)] hover:bg-[var(--border)] dark:hover:bg-[var(--border)]',
                danger: 'bg-[var(--danger)] text-[var(--danger-foreground)] hover:bg-[var(--danger-hover)]',
                info: 'bg-[var(--info)] text-[var(--info-foreground)]',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 px-3',
                lg: 'h-11 px-8',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'default',
        },
    }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

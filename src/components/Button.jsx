import { Link } from 'react-router-dom'

const VARIANTS = {
  primary:
    'bg-navy text-paper hover:bg-navy-light active:bg-navy-dark border border-navy',
  secondary:
    'bg-transparent text-navy border border-navy/30 hover:border-navy hover:bg-navy/5',
  ghost:
    'bg-transparent text-navy hover:bg-navy/5 border border-transparent',
}

const SIZES = {
  md: 'text-sm px-4 py-2.5 min-h-[44px]',
  lg: 'text-base px-6 py-3 min-h-[48px]',
}

/**
 * Shared button/link component. Renders a <Link> when `to` is provided,
 * otherwise a native <button>.
 */
export default function Button({
  children,
  to,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  className = '',
  ...rest
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xs font-body font-medium
    transition-colors duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-1
    disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon size={18} aria-hidden="true" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={18} aria-hidden="true" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {content}
    </button>
  )
}

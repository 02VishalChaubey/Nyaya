import { Link } from 'react-router-dom'

const VARIANTS = {
  primary:
    'bg-navy text-paper hover:bg-navy-light active:bg-navy-dark border border-navy',
  secondary:
    'bg-transparent text-navy border border-navy/30 hover:border-navy hover:bg-navy/5',
  ghost:
    'bg-transparent text-navy hover:bg-navy/5 border border-transparent',
  enmachi:
    'bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 active:bg-cyan-600 border border-cyan-400 shadow-md shadow-cyan-500/20',
  secondaryDark:
    'bg-slate-900/80 text-slate-100 border border-slate-700/90 hover:border-cyan-400/70 hover:bg-slate-800 backdrop-blur-xs',
}

const SIZES = {
  md: 'text-sm px-4 py-2.5',
  lg: 'text-base px-6 py-3',
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
  const classes = `inline-flex items-center justify-center gap-2 rounded font-body font-medium
    transition-colors duration-150 ${VARIANTS[variant]} ${SIZES[size]} ${className}`

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

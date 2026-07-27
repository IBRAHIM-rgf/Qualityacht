'use client';

// SaltReveal — enveloppe de reveal courte et nette (400-600ms), declenchee une
// seule fois par IntersectionObserver. Les variantes correspondent aux gestes
// de la direction : montee, clip vertical (rideau), balayage lateral (trace de cap).
// prefers-reduced-motion est gere en CSS (SaltStyles), pas ici : la classe reste
// posee, la transition est annulee.

import { cx, useInView } from './useSalt';

export default function SaltReveal({
  as: Tag = 'div',
  variant = 'up',          // up | down | scale | clip | wipe | fade
  delay = 0,
  duration,                // ms, optionnel
  threshold = 0.2,
  className = '',
  style,
  children,
  ...rest
}) {
  const [ref, inView] = useInView({ threshold });
  const variantCls = variant === 'fade' ? '' : `sr--${variant}`;

  return (
    <Tag
      ref={ref}
      className={cx('sr', variantCls, inView && 'is-in', className)}
      style={{
        transitionDelay: `${delay}ms`,
        ...(duration ? { transitionDuration: `${duration}ms` } : null),
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

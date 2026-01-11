import styles from './MenuCard.module.css';

export default function MenuCard({
    title,
    description,
    buttonLabel,
    onClick,
    href,
    disabled = false,
    isFeatured = false,
    tag,
    Icon
}) {
    const containerClass = `
    ${styles.card} 
    ${isFeatured ? styles.featured : ''} 
    ${disabled ? styles.disabled : ''}
  `.trim();

    // If href is provided and not disabled, the button should be an anchor behavior (wrapped or just handled via click).
    // However, for consistency in styling, we might just use a button element or a div that looks like a button.
    // The parent can wrap this in <Link> or pass an onClick handler that navigates.

    const handleButtonClick = (e) => {
        if (disabled) {
            e.preventDefault();
            return;
        }
        if (onClick) {
            onClick(e);
        }
    };

    return (
        <div className={containerClass}>
            {tag && <div className={styles.tag}>{tag}</div>}

            <div className={styles.content}>
                {Icon && (
                    <div style={{ marginBottom: '1rem', color: isFeatured ? '#d96c6c' : '#888' }}>
                        <Icon size={isFeatured ? 48 : 32} />
                    </div>
                )}
                <h2 className={styles.title}>{title}</h2>
                {description && <p className={styles.description}>{description}</p>}
            </div>

            {href && !disabled ? (
                <a
                    href={href}
                    className={styles.button}
                    target={href.startsWith('http') ? '_blank' : '_self'}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : ''}
                >
                    {buttonLabel}
                </a>
            ) : (
                <button
                    className={styles.button}
                    onClick={handleButtonClick}
                    disabled={disabled}
                >
                    {buttonLabel}
                </button>
            )}
        </div>
    );
}

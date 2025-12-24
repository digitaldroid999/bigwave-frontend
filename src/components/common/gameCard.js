export default function GameCard( props ) {
    const handleClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    };

    // Use modulo to repeat delay pattern every 12 cards, preventing long delays for newly loaded cards
    const animationDelay = props.index !== undefined ? (props.index % 12) * 0.03 : 0;

    return(
        <div 
            className="game-card" 
            onClick={handleClick}
            style={{ 
                animationDelay: `${animationDelay}s`,
                '--animation-delay': `${animationDelay}s`
            }}
        >
            <img src={ props.image } alt="game-card" />
            <span> { props.title } </span>
        </div>
    )
}
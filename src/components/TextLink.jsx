function TextLink({ href = '/', btnStyle, text}) {
    const shapeStyle = `text`;
    return (
        <a href={href} className={btnStyle}>
            <span className={shapeStyle}>{text}</span>
        </a>
    )
}

export default TextLink
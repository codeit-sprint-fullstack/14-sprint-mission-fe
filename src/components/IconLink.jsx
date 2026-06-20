function IconLink({ href = '/', classNm, text}) {
    const shapeStyle = `hidden`;
    return (
        <a href={href} className={classNm} target="_blank">
            <span className={shapeStyle}>{text}</span>
        </a>
    )
}

export default IconLink
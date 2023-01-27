const Mainlinks = () => {

    const svg1 = <path d="M12 9c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm0-13.304L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM19 19.5c0 .276-.224.5-.5.5h-13c-.276 0-.5-.224-.5-.5V8.429l7-4.375 7 4.375V19.5z"></path>


    const links = [
        {href: '/', linkText: "Home", svgPath: svg1},
        {href: '/schedules', linkText: "Schedule", svgPath: svg1},
        {href: '/plantings', linkText: "Plantings", svgPath: svg1},
        {href: '/crops', linkText: "Crops", svgPath: svg1},
        {href: '/areas', linkText: "Areas", svgPath: svg1}
                ]

    return (
        links.map((link, i) => {
            let {href, linkText} = link;
            return  (
                <a key={i} href={href} className="main__link">
                    <div className="main__link_content">
                        <div className="main__link_icon">
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="svg__icon">
                                <g>{svg1}</g>
                            </svg>
                        </div>
                        <div className="main__link_text">
                            <span className="main__link_text__span">{linkText}</span>
                        </div>
                    </div>
                </a>
            )}))}
            

export default Mainlinks

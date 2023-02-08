import React from "react";


const FooterItem = ({ paragraph }) => {
    return (<li>paragraph.Point1</li>)
}


const FooterList = ({ footer }) => {
    return (
        <div>
            <ul>
                {footer.map((paragraph) => <FooterItem paragraph={paragraph} />)}
            </ul>
        </div>
    )
}


export default FooterList;
import React from "react";


const FooterItem = ({ footer }) => {
    return (
        <ul>
            <li>{footer.for_users}</li>
            <li>{footer.about}</li>
        </ul>
    )
}


const FooterList = ({ footers }) => {
    return (
        <div>
            {footers.map((footer) => <FooterItem footer={footer} />)}
        </div>
    )
}


export default FooterList;
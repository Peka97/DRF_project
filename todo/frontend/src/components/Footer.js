import React from "react";


const FooterItem = ({ footer }) => {
    return (
        <tr>
            <td>
                {footer.for_users}
            </td>
            <td>
                {footer.about}
            </td>
        </tr>
    )
}


const FooterList = ({ footers }) => {
    return (
        <table>
            {footers.map((footer) => <FooterItem footer={footer} />)}
        </table>
    )
}


export default FooterList;
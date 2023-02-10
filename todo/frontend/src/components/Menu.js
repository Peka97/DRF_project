import React from "react";


const MenuItem = ({ paragraph }) => {
    return (
        <tr>
            <td>
                {paragraph.main}
            </td>
            <td>
                {paragraph.contacts}
            </td>
        </tr>
    )
}


const MenuList = ({ menu }) => {
    return (
        <table>
            {menu.map((paragraph) => <MenuItem paragraph={paragraph} />)}
        </table>
    )
}


export default MenuList;
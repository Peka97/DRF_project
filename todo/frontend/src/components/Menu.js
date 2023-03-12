import React from "react";


const MenuItem = ({ paragraph }) => {
    return (
        <ul className='MenuNav'>
            <li>{paragraph.main}</li>
            <li>{paragraph.contacts}</li>
        </ul>
    )
}


const MenuList = ({ menu }) => {
    return (
        <div>
            {menu.map((paragraph) => <MenuItem paragraph={paragraph} />)}
        </div>
    )
}


export default MenuList;
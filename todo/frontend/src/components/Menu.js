import React from "react";


const MenuItem = ({ paragraph }) => {
    return (<li>paragraph.Point1</li>)
}


const MenuList = ({ menu }) => {
    return (
        <div>
            <ul>
                {menu.map((paragraph) => <MenuItem paragraph={paragraph} />)}
            </ul>
        </div>
    )
}


export default MenuList;
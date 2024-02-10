import React, { useState } from "react";


function DropDown(props) {

    const { optionList, dropDownTitle, selected, selectOption, keyName, titleKeys } = props;

    const [state, setState] = useState({
        show: false
    });

    return (
        <div className="DropDown">

            <div onClick={() => { setState({ ...state, show: !state.show }) }} className="DropDown-select">
                {
                    selected ?
                        <span>{titleKeys.map( title => selected[title]+" ")}</span>
                        :
                        <span>{dropDownTitle}</span>
                }
                {
                    state.show ?
                        <i className="fa fa-angle-up" style={{ fontWeight: "700", fontSize: "1.6em", color: "#4bbcaf" }} aria-hidden="true"></i>
                        :
                        <i className="fa fa-angle-down" style={{ fontWeight: "700", fontSize: "1.6em", color: "#4bbcaf" }} aria-hidden="true"></i>
                }
            </div>

            <ul className={state.show ? "show DropDown-options" : "DropDown-options"}>
                {
                    optionList.map((item, index) => <div className="DropDown-options-item" onClick={() => { selectOption(item, keyName); setState({ show: false }) }} key={index}>
                        {titleKeys.map(title => item[title]+" ")}
                    </div>)
                }
            </ul>

        </div>
    )
}

export default DropDown;
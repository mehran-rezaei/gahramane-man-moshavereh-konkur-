import React from "react";
// import Table from 'react-bootstrap/Table';
// import "bootstrap/dist/css/bootstrap.min.css";

function TableCom(props){

    const { headTitles, tableData } = props;

    return(
        <div className="mt-11 table-container">
            <table className="dashboard-table"> 
                <thead className="dashboard-table-head">
                    <tr>
                    {
                        headTitles.map((title, index) => <th key={index}>{title}</th> )
                    }
                    </tr>
                </thead>

                <tbody className="dashboard-table-body">
                {
                    tableData.map((item, index) =>  <tr key={index}>
                        <td className="txt-prim">{item.WeekTitle}</td>
                        <td>{item.StudentDescriptiveMode}</td>
                        <td>{item.Txt}</td>
                        <td className="txt-prim">{item.Score}</td>
                    </tr>
                    )
                }
                </tbody>

            </table> 
          
        </div>
    )
}

export default TableCom;
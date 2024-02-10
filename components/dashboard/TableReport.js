import React from 'react';

const TableReport = (props) => {
    const { headTitles, StudentTable } = props;
    console.log(props);
    return (
        <div className='mt-11 mb-16 text-sm overflow-x-auto w-[625px] lg:w-auto'>
            <table className='dashboard-table rounded-md shadow-md overflow-hidden'>
            <thead className="dashboard-table-head">
                    <tr>
                    {
                        headTitles.map((title, index) => <th key={index}>{title}</th> )
                    }
                    </tr>
                </thead>
                <tbody className="dashboard-table-body">
                {
                    StudentTable.map((item, index) =>  <tr key={index}>
                        <td>{item.BookID}</td>
                        <td>{item.BookName}</td>
                        <td>{item.Topic}</td>
                        <td>{item.StudyTime}</td>
                        <td>{item.ReViewTime}</td>
                        <td>{item.TestTime}</td>
                        <td>{item.TestNumber}</td>
                        <td>{item.RightTestNumber}</td>
                        <td>{item.WrongTestNumber}</td>
                        <td>{item.BookID}</td>
                    </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    );
};

export default TableReport;
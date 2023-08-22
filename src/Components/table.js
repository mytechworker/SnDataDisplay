import { useEffect } from 'react';
import { useState } from 'react';
import test from '../Json/test.json'

let keys;
let getdata = false;

if (test.Tracking.length !== 0) {
    keys = ["PRN","Channel","State","Source","Locked","Lock_Time_S","SNR_DB","AZ_P_Deg","EL_P_Deg","AZ_M_Deg","EL_M_Deg","AF_F","EL_F","Band","Avg_SNR_DB"]
    getdata = true
}
function Table() {
    let activeId = null;
    const [tableData, setTableData] = useState(test.Tracking)
    const [isActive, setIsActive] = useState()
    const accOrder = (key) => {
        activeId = key
        let myData = []
            .concat(tableData)
            .sort((a, b) => typeof (a[key]) === 'string' ? a[key].localeCompare(b[key]) : (a[key] - b[key]))
        setTableData(myData)
    }

    const decOrder = (key) => {
        let myData = []
            .concat(tableData)
            .sort((a, b) => typeof (a[key]) === 'string' ? b[key].localeCompare(a[key]) : (b[key] - a[key]))
        setTableData(myData)
    }

    const handleClick = (id) => {
        console.log(id)
        setIsActive(id)
    }


    return (
        (getdata === true) ? (
            <div className="App">
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            {
                                keys.map((key) => (
                                    <th>{key.toUpperCase()}
                                        <span className="iconBox">
                                            <a className={isActive === key && 'is-active'} onClick={() => handleClick((key))}> <i onClick={() => accOrder(key)} className="fa fa-caret-up upArrow sortingAsc" aria-hidden="true"></i></a>
                                            <a className={isActive === 'dec' + key && 'is-active'} onClick={() => handleClick('dec' + key)}> <i onClick={() => decOrder(key)} className="fa fa-caret-down downArrow" aria-hidden="true"></i></a>
                                        </span>
                                    </th>
                                ))
                            }
                        </thead>
                        <tbody>
                            {
                                tableData?.map(val => (
                                    <tr>
                                        {keys.map((res) => (
                                            <td>{val[res]}</td>
                                        ))}
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        ) : (<h1 className="text-center">No records Found</h1>)
    );

}
export default Table;
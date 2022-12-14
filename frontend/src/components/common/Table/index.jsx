import React, { useState } from "react";

import useTable from "../../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";

const Table = ({
    data,
    rowsPerPage,
    onEditClick,
    onDetailClick,
    onDeleteClick,
    visibility,
    branch,
}) => {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);

    const editHandlerOnClick = (id) => {
        onEditClick(id);
    };

    const detailHandlerOnClick = (id) => {
        onDetailClick(id);
    };

    const deleteHandlerOnClick = (id) => {
        onDeleteClick(id);
    };

    const findName = (id) => {
        return branch.map((each) => {
            if (each._id === id) {
                return each.branchName;
            } else {
                return null;
            }
        });
    };

    return (
        <>
            <table className={styles.table}>
                <thead className={styles.tableRowHeader}>
                    <tr>
                        <th className={styles.tableHeader}>Employee ID</th>
                        <th className={styles.tableHeader}>FirstName</th>
                        <th className={styles.tableHeader}>LastName</th>
                        <th className={styles.tableHeader}>Job Role</th>
                        <th className={styles.tableHeader}>Phone</th>
                        <th className={styles.tableHeader}>Email</th>
                        <th className={styles.tableHeader}>Citizen NO.</th>
                        <th className={styles.tableHeader}>Stay at Branch</th>
                        <th className={`${styles.tableHeader} text-center `}>
                            Function
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {slice.map((el) => (
                        <tr className={styles.tableRowItems} key={el._id}>
                            <td className={styles.tableCell}>{el._id}</td>
                            <td className={styles.tableCell}>{el.firstname}</td>
                            <td className={styles.tableCell}>{el.lastname}</td>
                            <td className={styles.tableCell}>{el.role}</td>
                            <td className={styles.tableCell}>
                                {"0" + el.phone}
                            </td>
                            <td className={styles.tableCell}>{el.email}</td>
                            <td className={styles.tableCell}>{el.citizen}</td>
                            <td className={styles.tableCell}>
                                {el.branch ? (
                                    <p className="text-center">
                                        {findName(el.branch)}
                                    </p>
                                ) : (
                                    <p className="text-center">NULL</p>
                                )}
                            </td>
                            <td className={styles.tableCell}>
                                {el.citizen !== 9999999999999 ? (
                                    <div className="flex flex-col lg:flex-row lg:space-y-0 lg:space-x-4 justify-center items-center space-y-4">
                                        <div>
                                            <button
                                                className={
                                                    visibility
                                                        ? `text-slate-600 pointer-events-none transition`
                                                        : `text-green-600 hover:text-slate-300 transition`
                                                }
                                                onClick={() =>
                                                    editHandlerOnClick(el._id)
                                                }
                                            >
                                                Edit
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                className={
                                                    visibility
                                                        ? `text-slate-600 pointer-events-none transition`
                                                        : `text-blue-600 hover:text-slate-300 transition`
                                                }
                                                onClick={() =>
                                                    detailHandlerOnClick(el._id)
                                                }
                                            >
                                                Detail
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                className={
                                                    visibility
                                                        ? `text-slate-600 pointer-events-none transition`
                                                        : `text-red-600 hover:text-slate-300 transition`
                                                }
                                                onClick={() =>
                                                    deleteHandlerOnClick(el._id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    "Cannot access..."
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TableFooter
                range={range}
                slice={slice}
                setPage={setPage}
                page={page}
            />
        </>
    );
};

export default Table;

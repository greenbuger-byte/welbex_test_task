import React, { createContext } from 'react';
import PropTypes from 'prop-types';

import TableRow from "./table-row";
import TableTitle from "./table-title";
import { useHumanTime } from "../../hooks/useHumanTime";
import Pagination from "../pagination";
import styles from "./table.module.scss";

export const TableContext = createContext({});

const Table = (props) => {
    const {
        data,
        columns,
        page,
        selectPage,
        onFilter,
        filters,
        count,
        sorts,
        onSort,
        limit,
    } = props;
    const timeFormat = useHumanTime("D.M.Y в h:m");

    const renderTableRow = data && data.map( row => <TableRow
                key={row.id}
                columns={columns}
                format={timeFormat}
                row={row}
            /> );

    const renderPagination = count > limit && <Pagination
        page={page}
        count={count}
        setPage={selectPage}
        perPage={10}
    />;

    const renderTableColumns = columns && columns.map(
        column =>
            <TableTitle
                key={column.id}
                column={column}
            />);

    return (
        <TableContext.Provider value={{ onFilter, filters, onSort, sorts }}>
            <table className={styles.table}>
                <thead className={styles.table__thead}>
                    <tr className={styles.table__row}>
                        {renderTableColumns}
                    </tr>
                </thead>
                <tbody>
                    {renderTableRow}
                </tbody>
            </table>
            {renderPagination}
        </TableContext.Provider>
    )
};

Table.propTypes = {
    // Запрос к базе
    isLoading: PropTypes.bool,
    // Список установленных фильтров
    filter: PropTypes.array,
    // Хэндлер фильтра
    onFilter: PropTypes.func,
    // Список заголовков
    columns: PropTypes.array,
    // Данные таблицы
    data: PropTypes.array,
    // Активная страница
    page: PropTypes.number,
    // Смена активной страницы
    onChangePage: PropTypes.func,
    // Количество элементов
    count: PropTypes.number,
}

export default Table;
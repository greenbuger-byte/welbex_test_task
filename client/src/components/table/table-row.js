import React from "react";
import PropTypes from "prop-types";

import styles from "./table.module.scss";

const TableRow = (props) => {
    const { row, columns, format } = props;
    const renderRow = columns.map( item => <td key={item.id} className={styles.table__cell}>
        {item.dataIndex === 'date' ? format(new Date(row.created_at).getTime()) : row[item.dataIndex]}</td>
    );
    return (
        <tr className={styles.table__row}>
            {renderRow}
        </tr>
    )
}

TableRow.propTypes = {
    // Данные строки таблицы
    row: PropTypes.object,
    // Список загаловков таблицы
    columns: PropTypes.array,
    // Формат времени
    format: PropTypes.func,
}

export default TableRow;
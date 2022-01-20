import React, { useContext, useRef, useState } from 'react';
import PropTypes from "prop-types";
import { BiCaretDown, BiCaretUp, BiFilterAlt } from "react-icons/bi";
import clsx from "clsx";

import FilterPopup from "./filter-popup/filter-popup";
import { useClickOutside } from "../../hooks/useClickOutside";
import { TableContext } from "./table";
import { compares } from "../../utils/compares";

import styles from "./table.module.scss";

const TableTitle = (props) => {
    const sortDirectionList = [null, 'asc', 'desc'];
    const { column } = props;
    const filterRef = useRef();
    const [showPopupMenu, setShowPopupMenu] = useState(false);
    const [sortDirection, changeSortDirection] = useState(sortDirectionList[0]);
    const { filters, onSort, sorts } = useContext(TableContext);
    const popupToggleHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setShowPopupMenu(prev => !prev);
    }
    const popupCloseHandler = () => setShowPopupMenu(false);

    const sortHandler = () => {
        const direction = sortDirectionList[sortDirectionList.indexOf(sortDirection) + 1] || sortDirectionList[0];
        changeSortDirection(direction);
        onSort(column.dataIndex, direction);
    }

    useClickOutside(filterRef, popupCloseHandler);

    const renderFilterInfo =filters[column.dataIndex]
        && <div className={styles.table__titleInfo}>
            {`(${filters[column.dataIndex]?.value} ${compares[filters[column.dataIndex]?.compare]})`}
        </div>;

    return (
        <th className={styles.table__cell}>
            <div className={styles.table__title}>
                {column.title}
                {column.search  && <div className={styles.table__block}>
                    {renderFilterInfo}
                    <button onClick={popupToggleHandler}><BiFilterAlt /></button>
                    <button className={styles.table__sort}  onClick={sortHandler}>
                        <BiCaretUp className={clsx({ [styles.table__sorted]: sorts[column.dataIndex] === 'asc' })} />
                        <BiCaretDown className={clsx({ [styles.table__sorted]: sorts[column.dataIndex] === 'desc' })}/>
                    </button>
                </div>}
            </div>
            {
                 showPopupMenu &&
                <FilterPopup
                    ref={filterRef}
                    column={column.dataIndex}
                    withSearch={column.search}
                    withEquals={column.equals}
                />
            }
        </th>
    );
};

TableTitle.propTypes = {
    // Список колонок
    column: PropTypes.object,
}

export default TableTitle;
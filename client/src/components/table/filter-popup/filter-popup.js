import React, {forwardRef, useContext, useEffect, useState} from 'react';
import PropTypes from "prop-types";

import styles from './filter-popup.module.scss';
import { TableContext } from "../table";
import { compares } from "../../../utils/compares";

const FilterPopup = forwardRef((props, ref) => {
    const { onFilter, filters } = useContext(TableContext);
    const { withSearch, withEquals, column } = props;
    const [value, setValue] = useState(filters[column]?.value || '');
    const [compare, setCompare] = useState(filters[column]?.compare || 'eq');

    useEffect(() => {
        if(value) onFilter({column, effect: { compare, value }}); else onFilter({column, effect: null})
    }, [value, compare]);

    const renderEquals = Object.entries(compares).map(
        ([radio, value], index) =>
            <div key={index}>
                <input id={radio} onChange={setCompare.bind(null, radio)} type="radio" name="filter" value={radio} checked={compare === radio}/>
                <label htmlFor={radio}> {value} </label>
            </div>
        );

    return (
            <div ref={ref} className={styles.filter}>
                <div className={styles.filter__wrapper}>
                    {withSearch && <input
                        value={String(value)}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Фильтровать"
                        />
                    }
                {withEquals && <div className={styles.filter__type}>
                    {renderEquals}
                </div>}
            </div>
        </div>
    );
});

FilterPopup.propTypes = {
    // Возможность текстового поиска
    withSearch: PropTypes.bool,
    // Статус отображения
    isShow: PropTypes.bool,
    // Название поля по которуму будет происходить фильтрация
    column: PropTypes.string,
}

export default FilterPopup;
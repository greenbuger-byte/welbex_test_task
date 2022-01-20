import PropTypes from "prop-types";
import clsx from "clsx";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";

import styles from "./pagination.module.scss";

const Pagination = (props) => {
    const { page, setPage, perPage, count } = props;
    const lastPage = Math.ceil(count / perPage);
    const pageInPagination = (renderCount) => {
        const pagesArray = Array(lastPage).fill(1).map( (_, index) => ++index);
        const currentPage = Number(page);
        if(currentPage === 1) return pagesArray.slice(0, currentPage+renderCount);
        if(currentPage === lastPage) return pagesArray.slice(lastPage-(renderCount+1), lastPage);
        if(currentPage > lastPage-2) return pagesArray.slice(currentPage-renderCount, lastPage);
        return pagesArray.slice(currentPage-2, currentPage+2);
    }
    const renderPaginationList = pageInPagination(3).map((pageInPagination) => (
        <div
            key={pageInPagination}
            onClick={() => setPage(pageInPagination)}
            className={clsx(
                styles.pagination__item,
                { [styles.pagination__item_active]: Number(page) === pageInPagination }
            )}
        >
            {pageInPagination}
        </div>
    ));
    return (
        <div className={styles.pagination}>
            <div className={styles.pagination__wrapper}>
                <div
                    className={styles.pagination__item}
                    onClick={() => setPage(1)}
                >
                    <BiArrowToLeft />
                </div>
                    {renderPaginationList}
                <div
                    className={styles.pagination__item}
                    onClick={() => setPage(lastPage)}
                >
                    <BiArrowToRight />
                </div>
            </div>
        </div>
    );
};

Pagination.propTypes = {
    //Текущая страница
    page: PropTypes.number,
    // хендлер смены страницы
    setPage: PropTypes.func,
    // Лимит на странице
    perPage: PropTypes.number,
    // Количество объектов
    pages: PropTypes.number,
    // Количество объектов
    count: PropTypes.number,
}

export default Pagination;
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Table from "./components/table";
import { columns } from "./mock";
import { fetchInfoRequest, setFilter, setPage, setSort } from "./store/slices/info";
import './styles/app.scss';

function App() {
  const { page, data, limit, filters, count, loading, sorts, errors } = useSelector(state => state.infoSlice);
  const dispatch = useDispatch();
  const filterHandler = async (filterObject) => await dispatch(setFilter(filterObject));
  const onPageChange = (pageSelected) => dispatch(setPage(pageSelected));
  const onSort = (column, sortSelected) => dispatch(setSort({column, sortSelected}));

  useEffect( () => {
      dispatch(fetchInfoRequest({ page, limit, filters, sorts }));
  }, [filters, page, limit, sorts]);

  return (
    <div className="app">
        <div className="app__wrapper">
                <h1>Тестовое задание web-программист (React.js)</h1>
            <div>{errors}</div>
                <Table
                    isLoading={loading}
                    columns={columns}
                    page={page}
                    selectPage={onPageChange}
                    onFilter={filterHandler}
                    filters = {filters}
                    count={count}
                    onSort={onSort}
                    sorts={sorts}
                    data={data}
                    limit={limit}
                />
        </div>
    </div>
  );
}

export default App;

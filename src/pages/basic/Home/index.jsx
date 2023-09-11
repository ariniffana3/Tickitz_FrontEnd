import { useEffect, useState } from "react";
import Card from "../../../components/basic/Card";
import axios from "../../../utils/axios";
import Pagination from "react-paginate";

function Home() {
  const limit = 6;
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    getdataMovie();
  }, []);

  useEffect(() => {
    getdataMovie();
  }, [page]);

  const getdataMovie = async () => {
    try {
      const resultMovie = await axios.get(`movie?page=${page}&limit=${limit}`);
      setData(resultMovie.data.data);
      setPageInfo(resultMovie.data.pagination);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDetailMovie = (id) => {
    console.log(id);
  };

  const handlePagination = (data) => {
    console.log(data.selected + 1);
    setPage(data.selected + 1);
  };

  return (
    <div className="text-center container">
      <h1>Home Page</h1>
      <hr />
      <div className="row">
        {data.map((item) => (
          <div className="col-md-4" key={item.id}>
            <Card data={item} handleDetail={handleDetailMovie} />
          </div>
        ))}
      </div>
      <Pagination
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageInfo.totalPage}
        onPageChange={handlePagination}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default Home;

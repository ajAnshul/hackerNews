import React from 'react';
import PropTypes from 'prop-types';


const Pagination = ({ setPage, page }) => {
    return (
        <div className="pagination-wrapper">
            <a  onClick={() => {
                if(page != 1){
                    setPage(Number(page) - 1)
                }
            } } href="#" className={`previous ${page === 1 ? 'disabled':''}`}>Previous</a>
            <a onClick={() => setPage(Number(page) + 1)} href="#" className="next">Next </a>
        </div>
    )
}

Pagination.propTypes = {
    page: PropTypes.number,
    setPage: PropTypes.func
};

export default Pagination;
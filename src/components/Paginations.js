import React from 'react';
import PropTypes from 'prop-types';


const Pagination = ({ setPage, page }) => {
    return (
        <div className="pagination-wrapper">
            <a  onClick={() => setPage(page - 1) } href="#" class="previous">Previous</a>
            <a onClick={() => setPage(page + 1)} href="#" class="next">Next </a>
        </div>
    )
}

Pagination.propTypes = {
    page: PropTypes.number,
    setPage: PropTypes.func
};

export default Pagination;
import React from 'react';
import PropTypes from 'prop-types';


const Pagination = ({ setPage, page }) => {
    return (
        <>
            <ul class="pager">
                <li onClick={() => setPage(page - 1) }>Previous</li>
                <li onClick={() => setPage(page + 1)} >Next</li>
            </ul>
        </>
    )
}

Pagination.propTypes = {
    page: PropTypes.number,
    setPage: PropTypes.func
};

export default Pagination;
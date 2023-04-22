import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Context } from '../Context';
import { useAlert } from 'react-alert';
import { Link, withRouter } from 'react-router-dom';
import ArchiveInputForm from './ArchiveInputForm';
import Delete from '../Delete';

import DocumentTitle from 'react-document-title';
import Null from '../loading/Null';

const matchEntry = (entry, search) => {
  if (!search) return true;
  const check = [entry.show, entry.host, entry.genre];
  return check.some((item) => item.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
}

function ArchiveList(props) {
  const context = useContext(Context);

  const [checkedIDs, setCheckedIDs] = useState([]);
  const [archiveData, setArchiveData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isActive, setIsActive] = useState(3);
  const [lastSort, setLastSort] = useState(3);
  const [loading, setLoading] = useState(false);
  const alert = useAlert();

  useEffect(() => {
    setLoading(true);
    fetch('/archive')
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setArchiveData(
          data.archive.sort((showA, showB) =>
            showA.date > showB.date ? -1 : 1,
          ),
        );
      })
      .catch((err) => {
        setLoading(false);
        alert.error(
          'Failed to fetch archive from the server. Please contact the admin.',
        );
      });
  }, [alert]);

  const sortData = (i) => {
    switch (i) {
      case 0:
        setIsActive(0);
        if (lastSort !== isActive) {
          setArchiveData(
            [...archiveData].sort((showA, showB) =>
              showA.show > showB.show ? -1 : 1,
            ),
          );
          setLastSort(0);
        } else {
          setArchiveData(
            [...archiveData].sort((showA, showB) =>
              showA.show < showB.show ? -1 : 1,
            ),
          );
          setLastSort(-1);
        }
        break;
      case 1:
        setIsActive(1);
        if (lastSort !== isActive) {
          setArchiveData(
            [...archiveData].sort((showA, showB) =>
              showA.host > showB.host ? -1 : 1,
            ),
          );
          setLastSort(1);
        } else {
          setArchiveData(
            [...archiveData].sort((showA, showB) =>
              showA.host < showB.host ? -1 : 1,
            ),
          );
          setLastSort(-1);
        }
        break;
      case 2:
        setIsActive(2);
        if (lastSort !== isActive) {
          setArchiveData(
            [...archiveData].sort((showA, showB) =>
              showA.genre > showB.genre ? -1 : 1,
            ),
          );
          setLastSort(2);
        } else {
          setArchiveData(
            [...archiveData].sort((showA, showB) =>
              showA.genre < showB.genre ? -1 : 1,
            ),
          );
          setLastSort(-1);
        }
        break;
      case 3:
        setIsActive(3);
        if (lastSort !== isActive) {
          setArchiveData(
            [...archiveData].sort((showA, showB) =>
              showA.date > showB.date ? -1 : 1,
            ),
          );
          setLastSort(3);
        } else {
          setArchiveData(
            [...archiveData].sort((showA, showB) =>
              showA.date < showB.date ? -1 : 1,
            ),
          );
          setLastSort(-1);
        }
        break;
      default:
        console.log('Sort Switch ran without any effect');
    }
  };

  ////////////////////////////
  //  Filter Section Start
  ////////////////////////////
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const epName = new URLSearchParams(props.location.search).get('ep');
    if (epName) {
      setFilter(epName);
    }
  }, [props.location.search]);

  const handleFilterInput = (event) => {
    setFilter(event.target.value);
  };
  const filtered = archiveData.filter((entry) => matchEntry(entry, filter));

  ////////////////////////////
  //   Filter Section End
  ////////////////////////////

  const handleIDs = (event) => {
    const checked = event.target.checked;
    const id = event.target.name;
    if (checked) {
      setCheckedIDs([...checkedIDs, id]);
    }
    if (!checked) {
      const filteredIDs = checkedIDs.filter((el) => el !== id);
      setCheckedIDs(filteredIDs);
    }
  };

  //Delete the deleted Item from archiveData to make it disappear without refreshing the page
  const handleDelete = (checkedIDs) => {
    //prevent error when nothing is selected
    if (checkedIDs.length === 0) {
      return;
    }

    //filter copy of archive data based on checkedID and set the new state

    let filteredArchiveData = [...archiveData];
    for (let i = 0; i < checkedIDs.length; i++) {
      filteredArchiveData = filteredArchiveData.filter(
        (el) => el._id !== checkedIDs[i],
      );
    }
    setArchiveData(filteredArchiveData);
    //delete from db
    Delete(checkedIDs, 'archive').then((output) => {
      output
        ? alert.success('Item(s) successfully deleted.', { timeout: 3000 })
        : alert.error('Something went wrong...');
    });
  };
  //list item construction
  const renderLi = () => {
    if (archiveData.status === 404)
      return <h2>Error 404, something went wrong</h2>;
    if (archiveData.length === 0) return null; //Because first time the code is running, archiveData will be an empty array
    return filtered.map((el, i) => (
      <Fragment key={i}>
        <li>
          <ul className="all-data archive-list-grid">
            <li className="img-container">
              <img
                src={el.img}
                alt={`Small version of the artwork of ${el.show}`}
                width="50"
                height="50"
              />
            </li>
            <li>
              <Link
                className="link-component hosts-list-archive"
                to={`archive/${el._id}`}>
                {el.show}
              </Link>
            </li>
            <li>
              <Link className="link-component" to={`shows/${el.hostID}`}>
                {el.host}
              </Link>
            </li>
            <li>{el.genre}</li>
            <li>{el.date.substring(0, 10)}</li>
            {props.cookies.user &&
            props.cookies.user.role === 'Admin' &&
            'Host' ? (
              <li>
                <input
                  className="check-delete"
                  name={el._id}
                  type="checkbox"
                  onChange={handleIDs}></input>
              </li>
            ) : null}
          </ul>
        </li>
      </Fragment>
    ));
  };

  const renderLiHeader = () => {
    const listHeader = ['episode.', 'show.', 'genre.', 'date.'];

    return listHeader.map((el, i) => (
      <Fragment key={i}>
        <li className="sort-list">
          <span
            onClick={() => sortData(i)}
            className={`sort ${i === isActive ? 'active' : ''} `}>
            {el}
          </span>
        </li>
      </Fragment>
    ));
  };

  if (loading) return <Null />;

  return (
    <DocumentTitle title="Archive">
      <Context.Provider
        value={{
          showForm,
          setShowForm,
          archiveData,
          setArchiveData,
        }}>
        <div className={`${context.gapClass} all-list`}>
          <div>
            <h1 id="main">archive.</h1>

            {props.cookies.user && props.cookies.user.role === 'Host' ? (
              <div className="button-container controls archive-add-delete-buttons">
                {showForm ? (
                  <button type="button" onClick={() => setShowForm(false)}>
                    cancel
                  </button>
                ) : (
                  <button type="button" onClick={() => setShowForm(true)}>
                    add to archive
                  </button>
                )}
              </div>
            ) : null}
            {props.cookies.user && props.cookies.user.role === 'Admin' ? (
              <div className="button-container controls archive-add-delete-buttons">
                {showForm ? (
                  <button type="button" onClick={() => setShowForm(false)}>
                    cancel
                  </button>
                ) : (
                  <button type="button" onClick={() => setShowForm(true)}>
                    add to archive
                  </button>
                )}

                <button type="button" onClick={() => handleDelete(checkedIDs)}>
                  delete checked
                </button>
              </div>
            ) : null}
            {showForm ? <ArchiveInputForm /> : null}
            <form className="archive-filter">
              <div className="filter-input-container">
                <label htmlFor="filter-input">
                  <input
                    type="text"
                    id="filter-input"
                    placeholder="filter"
                    value={filter}
                    onChange={handleFilterInput}
                  />
                </label>
              </div>
            </form>
            <ul className="list-header archive-list-grid sort-by-box">
              <li className="sort-list">sort by:</li>
              {renderLiHeader()}
            </ul>
            <ul className="all-details-sorted">{renderLi()}</ul>
          </div>
        </div>
      </Context.Provider>
    </DocumentTitle>
  );
}

export default withRouter(ArchiveList);

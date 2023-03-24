import React, { useState, useEffect, Fragment, useContext } from 'react';
import { useAlert } from 'react-alert';
import { Context } from '../Context';
import PostData from '../PostData';
import PutData from '../PutData';
import GetData from '../GetData';

export default function ArchiveInputForm(props) {
  const [exist, setExist] = useState(false);
  const { setShowEdit, archiveData, setArchiveData, setShowForm } =
    useContext(Context);
  const [hostData, setHostData] = useState([]);
  const [host, setHost] = useState('');
  let hostID = '';
  const [filter, setFilter] = useState('');
  const [show, setShow] = useState('');
  const [genre, setGenre] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [link, setLink] = useState('');
  const [img, setImg] = useState('');
  const [description, setDescription] = useState('');
  const [disabled, setDisabled] = useState(false);
  const alert = useAlert();

  const archive = archiveData;
  const id = props.data && props.data._id;

  useEffect(() => {
    GetData('/host').then((data) => {
      setHostData(
        data.host.sort((hostA, hostB) =>
          hostA.hostName < hostB.hostName ? -1 : 1,
        ),
      );
      if (id) {
        setExist(true);
        setHost(archive.host);
        setFilter(archive.host);
        setShow(archive.show);
        setGenre(archive.genre);
        setDate(archive.date.toString().substring(0, 10));
        setLink(archive.link);
        setImg(archive.img);
        setDescription(archive.description);
      }
    });
  }, [
    id,
    archive.host,
    archive.show,
    archive.genre,
    archive.date,
    archive.link,
    archive.img,
    archive.description,
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setDisabled(true);

    const chosenHost = hostData.filter((host) =>
      host.hostName.toLocaleLowerCase().startsWith(filter.toLocaleLowerCase()),
    )[0];

    if (chosenHost.hostName === host) {
      hostID = chosenHost._id;
    } else {
      alert.error("Can't find the host");
      return;
    }

    const body = {
      host: host,
      hostID: hostID,
      show: show,
      genre: genre,
      date: date,
      link: link,
      img: img,
      description: description,
    };

    if (!exist) {
      PostData('/archive/post', body).then((data) => {
        if (data.success) {
          alert.success('Show archived!', { timeout: 3000 });
          setArchiveData([data.archive, ...archiveData]);
          setShowForm(false);
        } else {
          alert.error(data.err);
        }
      });
    } else {
      PutData(`/archive/${id}`, body).then((data) => {
        if (!data.success) {
          alert.error('Server is not responding... Please try again later.');
        } else {
          setArchiveData(data.archive);
          setShowEdit(false);
          alert.success('Your changes have been saved!', { timeout: 3000 });
        }
      });
    }
  };
  const filtered = () => {
    if (hostData.length !== 0 && filter !== '') {
      return hostData.filter((host) =>
        host.hostName.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
      );
    } else {
      return hostData;
    }
  };
  const renderHostOptions = () => {
    return filtered().map((el, i) => (
      <Fragment key={i}>
        <option
          onClick={() => {
            setFilter(el.hostName);
            if (img === '') {
              setImg(el.hostImg);
            }
            setHost(el.hostName);
          }}>
          {el.hostName}
        </option>
      </Fragment>
    ));
  };

  const handleFormInput = (event) => {
    const id = event.target.id;
    const input = event.target.value;
    switch (id) {
      case 'host':
        setHost(input);
        break;
      case 'filter':
        setHost(input);
        setFilter(input);
        break;
      case 'show':
        setShow(input);
        break;
      case 'genre':
        setGenre(input);
        break;
      case 'date':
        setDate(input);
        break;
      case 'link':
        setLink(input);
        break;
      case 'img':
        setImg(input);
        break;
      case 'description':
        setDescription(input);
        break;
      default:
        console.log('Archive Input HandleFormInput ran through without effect');
    }
  };

  return (
    <div className="post-archive">
      <h2>archive a show.</h2>
      <form className="input-form" onSubmit={handleSubmit}>
        <div className="grid-container">
          <div className="archive-input-left">
            <label htmlFor="filter">
              <span className="required">*</span>host
              <input
                type="text"
                id="filter"
                placeholder="filter"
                value={filter}
                onChange={handleFormInput}
              />
            </label>
            <label className="archive-select-container" htmlFor="host">
              <select
                id="host"
                value={host}
                size="19"
                onChange={handleFormInput}>
                {renderHostOptions()}
              </select>
            </label>
          </div>
          <div className="archive-input-right">
            <label htmlFor="show">
              <span className="required">*</span>show
              <input
                type="text"
                id="show"
                placeholder="show"
                value={show}
                onChange={handleFormInput}
              />
            </label>
            <label htmlFor="genre">
              <span className="required">*</span>genre
              <input
                type="text"
                id="genre"
                placeholder="please divide multiple genres only with space"
                value={genre}
                onChange={handleFormInput}
              />
            </label>
            <label htmlFor="date">
              <span className="required">*</span>date
              <input
                type="date"
                id="date"
                placeholder="yyyy-mm-dd"
                value={date}
                onChange={handleFormInput}
              />
            </label>
            <label htmlFor="link">
              <span className="required">*</span>soundcloud/mixcloud
              <input
                type="url"
                id="link"
                placeholder="link"
                value={link}
                onChange={handleFormInput}
              />
            </label>
            <label htmlFor="img">
              <span className="required">*</span>artwork
              <input
                type="url"
                id="img"
                placeholder="link"
                value={img}
                onChange={handleFormInput}
              />
            </label>
            <label className="describe" htmlFor="description">
              description
              <textarea
                type="text"
                id="description"
                placeholder="Describe the show (e.g. discussed topics, featured artists, track list etc.)"
                onChange={handleFormInput}
                defaultValue={description}
              />
            </label>
          </div>
          <div className="submit-button describe">
            <input type="submit" disabled={disabled} value="save" />
            <span className="required">* required</span>
          </div>
        </div>
      </form>
    </div>
  );
}

import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../Context';
import moment from 'moment';
import GetData from '../GetData';
import { useAlert } from 'react-alert';

export default function InfoBar() {
  const context = useContext(Context);
  const alert = useAlert();

  /**
   * TODO:
   * All the fudge about the track id is not working due to limited access to what we used to extract the meta data of the stream
   * The clock looked awkward without the sing information so I commented it out, too
   * So the acutal TODO is: Get the meta data shit up and running again!
   */

  const [songName, setSongName] = useState(null);
  const [time, setTime] = useState(moment().format('h:mm:ss a'));
  const timer = () => setTime(moment().format('H:mm:ss'));

  const renderCurrentSongName = () => {
    return <div>Now playing: {songName}</div>;
  };

  useEffect(() => {
    let mounted = true;

    GetData('/infobar')
      .then((data) => {
        if (!data.success)
          alert.error('Failed to fetch data, please contact the admin.');
        if (data.status === 403) {
          alert.error('Status 403: Forbidden');
          return;
        }
        if (!data.success) {
          alert.error('Failed to fetch data, please contact the admin');
          return;
        }
        context.setInfoBarMessage(data.infoBar[0].message);
        // context.setInfoID(data.infoBar[0]._id)
      })
      .catch((err) => {
        alert.error('Failed to fetch info. Please contact the admin.');
      });

    const getSongName = () => {
      fetch('https://s9.myradiostream.com/44782/stats?json=1')
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          let titleWords = [];
          let sanitizedTitle = '';

          // Separate words
          if (data.songtitle.includes('_')) {
            titleWords = data.songtitle.split('_');
          }
          if (data.songtitle.includes(' ')) {
            titleWords = data.songtitle.split(' ');
          }

          // Sanitize word
          titleWords.forEach((word) => {
            let sanitizedWord =
              word[0].toLocaleUpperCase() +
              word.substring(1).toLocaleLowerCase();
            sanitizedTitle += sanitizedWord + ' ';
          });

          // Set title
          if (mounted) {
            if (sanitizedTitle === '') {
              setSongName('Etikett Radio Archive');
            } else {
              setSongName(sanitizedTitle);
            }
          }
        })
        .catch((err, data) => {
          setSongName('');
        });
    };
    getSongName();
    const everyFifteenSeconds = setInterval(getSongName, 1000 * 15);
    const everySecond = setInterval(timer, 1000);
    return () => {
      clearInterval(everyFifteenSeconds);
      clearInterval(everySecond);
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert]);

  return (
    <div className="message">
      <span className="moving-text">
        <div className="current-time">{time}</div>
        {renderCurrentSongName()}
        <div>{context.infoBarMessage}</div>
      </span>
    </div>
  );
}

import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../Context';
import moment from 'moment';
import GetData from '../GetData';
import { useAlert } from 'react-alert';

export default function InfoBar() {
  const context = useContext(Context);
  const alert = useAlert();
  const [songName, setSongName] = useState(null);
  const [time, setTime] = useState(moment().format('h:mm:ss a'));
  const timer = () => setTime(moment().format('H:mm:ss'));

  return null;


}

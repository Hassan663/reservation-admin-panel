// import { ORIGIN } from 'constants/config/config.dev';

// import { pick, map, result } from 'lodash';**
import { ORIGIN } from 'constants/config/config.dev';
import { react, useState, useEffect } from 'react';
import { getOnlineUsersUsingRedux } from '../../components/commonActions/FirebaseActions';
export const getIds = members => {
  //   const Ids = () => map(members, member => pick(member, ['id']));**
  const Ids1 = [
    ...new Set(
      members.map((_, i) => {
        return _.id;
      })
    ),
  ];

  const index = Ids1.indexOf(JSON.parse(localStorage.getItem(`${ORIGIN}_uid`)));

  if (index > -1) {
    Ids1.splice(index, 1);
  }
  // console.log('Ids...', Ids1);
  return Ids1 ?? [];
};

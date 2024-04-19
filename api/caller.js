export const getCall = async url => {
  const results = await fetch(url)
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(e => {
      console.warn('error : ' + e);
      return null;
    });
  return results;
};

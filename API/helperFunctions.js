export const logErrorWithLocation = (location, errorMessage) => {
  console.error("location", errorMessage);
};

export const isUrlValidFormat = (url) => {
  return url.match(
    /((?:(?:http?|ftp)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/gi
  );
};

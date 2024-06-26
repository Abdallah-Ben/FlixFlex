const apiKey = '912bb85d29d206b305ce2c6e76fb4a2f';
const url = 'https://api.themoviedb.org/3';
export const topRatedMoviesEP = `${url}/movie/top_rated?api_key=${apiKey}`;
export const topRatedSeriesEP = `${url}/tv/top_rated?api_key=${apiKey}`;
export const searchMoviesEP = query =>
  `${url}/search/movie?api_key=${apiKey}&query=${query}&include_adult=false&language=en-US&page=1`;
export const searchSeriesEP = query =>
  `${url}/search/tv?api_key=${apiKey}&query=${query}&include_adult=false&language=en-US&page=1`;
export const moviesListEP = page =>
  `${url}/movie/popular?language=en-US&page=${page}&api_key=${apiKey}`;
export const seriesListEP = page =>
  `${url}/tv/popular?language=en-US&page=${page}&api_key=${apiKey}`;
export const movieDetailEP = id => `${url}/movie/${id}?api_key=${apiKey}`;
export const serieDetailEP = id => `${url}/tv/${id}?api_key=${apiKey}`;
export const movieCreditsEP = id =>
  `${url}/movie/${id}/credits?api_key=${apiKey}`;
export const serieCreditsEP = id => `${url}/tv/${id}/credits?api_key=${apiKey}`;
export const movieVideosEP = id =>
  `${url}/movie/${id}/videos?api_key=${apiKey}&language=en-US`;

export const serieVideosEP = id =>
  `${url}/tv/${id}/videos?api_key=${apiKey}&language=en-US`;

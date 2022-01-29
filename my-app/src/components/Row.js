import React, { useState, useEffect } from "react";
import "../css/Row.css";
import axios from "../axios";
import Modal from "@material-ui/core/Modal";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [modalBanner, setModalBanner] = useState("");
  const [modalTtle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [movieName, setMovieName] = useState();
  const [playVideo, setPlayVideo] = useState(false);
  const [videoCutOption, setVideoCutOption] = useState(false);

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  const handleOpen = (movie) => {
    setOpen(true);
    setModalBanner(
      `${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`
    );
    setModalTitle(movie.name || movie.title);
    setModalDescription(movie?.overview);
    console.log(movie.name);
    // setMovieName(
    //   (movie?.name || "").then((url) => {
    //     const urlParams
    //   }).catch((error) => console.log(error))
    // );

    // console.log(movie.name);
    // movieTrailer(movie?.name || "")
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie.name || movie.title)
        // movieTrailer("Arcane")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
          // console.log("THis is the respomnse", url);
          // // console.log(url);
          // console.log(trailerUrl);
        })
        .catch((err) => console.log("this is the error", err));
    }
  };

  const opts = {
    height: "449",
    width: "82%",
    playerVars: {
      autoplay: 1,
    },
  };

  // const playVideo = () => {
  //   if (trailerUrl) {
  //     setTrailerUrl("");
  //   } else {
  //     movieTrailer(movieName);
  //   }
  // };

  const handleClose = () => {
    setOpen(false);
    setPlayVideo(false);
  };

  return (
    <div className="row">
      <h2> {title} </h2>

      <div className="row__posters">
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                onClick={() => handleOpen(movie)}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                key={movie.id}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            )
        )}
        <Modal className="row__modal" open={open} onClose={handleClose}>
          {playVideo ? (
            <div style={{ marginLeft: "15%" }}>
              <YouTube
                onPause={() => setVideoCutOption(true)}
                videoId={trailerUrl}
                onEnd={() => setPlayVideo(false)}
                opts={opts}
              />
            </div>
          ) : (
            <header
              className="row__modalHeader"
              style={{
                backgroundSize: "cover",
                backgroundImage: `url(${modalBanner})`,
                backgroundPosition: "center center",
              }}
            >
              <div className="row__modalHeaderContents">
                <h1 className="row__modalHeaderTitle"> {modalTtle} </h1>
                <div className="banner__buttons">
                  <button
                    onClick={() => setPlayVideo(true)}
                    className="banner__button"
                  >
                    Play
                  </button>
                  <AddCircleOutlineOutlinedIcon className="row__modalMuiButton" />
                  <ThumbUpAltOutlinedIcon className="row__modalMuiButton" />
                  <ThumbDownAltOutlinedIcon className="row__modalMuiButton" />
                </div>
                <h1 className="row__modalDescription">
                  {truncate(modalDescription, 120)}
                </h1>
              </div>
              <div className="modal--fadeButton" />
            </header>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default Row;

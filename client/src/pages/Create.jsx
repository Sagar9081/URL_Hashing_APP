import { useContext, useState, useCallback, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useNavigate } from "react-router-dom";
import { LinksList } from "../components/LinksList";
import { Loader } from "../components/Loader";
import Links from "./Links";

import style from "./styles/Create/Create.module.css";

export const Create = () => {
  const history = useNavigate();
  const [links, setLinks] = useState("");
  const [flag, setFlag] = useState(true);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);
  //const auth = useContext(AuthContext);

  const [link, setLink] = useState("");

  const pressHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          { from: link },
          {
            Authorization: `Bearer ${token}`,
          }
        );
        setFlag(false);
        //window.location.reload();
        history(`/detail/${data.link._id}`);
      } catch (e) {}
    }
  };

  const handleSubmit = async () => {
    try {
      const data = await request(
        "/api/link/generate",
        "POST",
        { from: link },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      //window.location.reload();
      setFlag(false);
      history(`/detail/${data.link._id}`);
    } catch (e) {}
  };
  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request("/api/link", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLinks(fetched);
      //console.log(links[0].clicks);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="column">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginTop: 50,
          marginBottom: 50,
        }}
      >
        <input
          placeholder="Insert link:"
          id="link"
          type="text"
          value={link}
          onKeyPress={pressHandler}
          onChange={(e) => {
            setLink(e.target.value);
          }}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button
          style={{
            height: "3rem",
            width: "6rem",
            border: "1px solid black",
            borderRadius: "10px",
          }}
          onClick={handleSubmit}
        >
          Shorten
        </button>
      </div>
      <div>{flag && <LinksList links={links} />}</div>
    </div>
  );
};

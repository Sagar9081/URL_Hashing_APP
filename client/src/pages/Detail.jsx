import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LinkCard } from "../components/LinkCard";
import { Loader } from "../components/Loader";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";

export const Detail = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [link, setLink] = useState(null);
  const linkId = useParams().id;

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLink(fetched);
    } catch (e) {}
  }, [token, linkId, request]);

  const deleteLink = useCallback(async () => {
    try {
      //   const fetched = await request(`/api/link/${linkId}`, "GET", null, {
      //     Authorization: `Bearer ${token}`,
      //   });

      //console.log(fetched.clicks);
      await request(`/api/link/${linkId}`, "DELETE", null);
      setLink(null);

      //   if (fetched.clicks >= 1) {
      //     await request(`/api/link/${linkId}`, "DELETE", null);
      //     setLink(null);
      //   }
    } catch (e) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />;
  }

  //   if (link.clicks === 2) {
  //     deleteLink();
  //   }

  return (
    <>{!loading && link && <LinkCard link={link} deleteLink={deleteLink} />}</>
  );
};

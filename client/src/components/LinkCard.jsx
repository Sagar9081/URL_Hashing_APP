export const LinkCard = ({ link, deleteLink }) => {
  return (
    <>
      <h2>Link</h2>
      <h5>
        Your link:{" "}
        <a
          onClick={deleteLink}
          href={link.to}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.to}
        </a>
      </h5>
      <h5>
        From:{" "}
        <a href={link.from} target="_blank" rel="noopener noreferrer">
          {link.from}
        </a>
      </h5>
      <h5>
        Number of clicks on a link: <strong>{link.clicks}</strong>
      </h5>
      <h5>
        Creation date: <strong>{new Date(link.data).toDateString()}</strong>
      </h5>
    </>
  );
};

const Vlog = () => {
  return (
    <>
      <div className="elementTitle">Vlog</div>
      <div className="video">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/B9krT5Lq-1U?list=PLBn82aS9YRQJ3Apw0cLYCBfC-vOCU5BkG"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </>
  )
}

export default Vlog

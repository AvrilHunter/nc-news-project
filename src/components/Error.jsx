function Error({ errMsg, errStatus }) {

  return (
    <>
      <p>
        {errStatus}: {errMsg}
      </p>
    </>
  );
}

export default Error;

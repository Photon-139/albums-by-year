const Navigation = ({ data, toShowYears }) => {
  return (
    <>
      {toShowYears ? (
        <div>
          <ui>
            {Object.keys(data).map((year) => (
              <></>
            ))}
          </ui>
        </div>
      ) : (
        <div></div>
      )}
    </>
  )
}

export default Navigation
